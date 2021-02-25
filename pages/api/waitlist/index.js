import jwt from "jsonwebtoken";

import {
  fetchEmailWaitlist,
  insertUnconfirmedWaitlist,
  deleteExistingInsertNewWaitlist,
  sendEmail,
} from "utils-server";

export default async function waitlist(req, res) {
  if (req.method === "POST") {
    // expected body:
    // {
    //   "email": "jedd@thestoryengine.co.uk",
    //   "lists": ["launch"],
    //   "donation": {
    //       "amount": 20,
    //       "currency": "GBP"
    //   }
    // };

    const { email, lists, donation } = req.body;

    // add new record
    let emailId;
    let confirmedEmail = false;
    const { errors, data } = await insertUnconfirmedWaitlist(email, lists, [
      donation,
    ]);
    if (
      errors?.length &&
      errors.some((error) => error.message.includes("waitlist_email_key"))
    ) {
      // email record exists
      const { errors, data } = await fetchEmailWaitlist(email);
      if (errors?.length) {
        return res.status(500).json(errors);
      }
      if (data.waitlist[0].confirmed) {
        // add unfulfilled donation if present in body
        confirmedEmail = true;
        emailId = data.waitlist[0].id;
      } else {
        // overwrite record, continue
        const {
          errors,
          data: dataDel,
          ...rest
        } = await deleteExistingInsertNewWaitlist({
          existingId: data.waitlist[0].id,
          email,
          lists,
          donations: [donation],
        });
        if (errors?.length) {
          return res.status(500).json(errors);
        }
        emailId = dataDel.insert_waitlist_one.id;
      }
    } else if (errors?.length) {
      return res.status(500).json(errors);
    }

    emailId = emailId || data.insert_waitlist_one.id;

    if (!emailId) {
      return res
        .status(500)
        .json({ error: new Error("Something went wrong!") });
    }

    // Sign JWT with claims
    const jwtClaims = {
      sub: emailId,
      aud: process.env.HASURA_JWT_AUDIENCE,
      iat: Date.now() / 1000,
      exp: Math.floor(Date.now() / 1000) + 0.5 * 60 * 60, // 30 mins
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-email-id": emailId,
      },
    };
    const encodedToken = jwt.sign(jwtClaims, process.env.HASURA_JWT_SECRET, {
      algorithm: "HS256",
    });

    if (donation && donation.amount) {
      if (email.confirmed) {
        // TODO: append unpaid donation to existing waitlist record
        console.log(
          `email manage with donate template to ${email} for ${emailId}`
        );
        sendEmail(
          "manage existing waitlist with pending donate",
          email,
          encodedToken,
          req.headers.host
        );
      } else {
        console.log(
          `email verify with donate template to ${email} for ${emailId}`
        );
        sendEmail(
          "email verify with pending donate",
          email,
          encodedToken,
          req.headers.host
        );
      }
    } else {
      console.log(`email verify to ${email} for ${emailId}`);
      sendEmail("email verify", email, encodedToken, req.headers.host);
      // send verify email
    }

    res.statusCode = 200;
    res.end(JSON.stringify({ token: encodedToken }));
    return;
  }

  res.statusCode = 404;
  res.end();
  return;
}

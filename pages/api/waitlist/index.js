import jwt from "jsonwebtoken";

import {
  fetchEmailWaitlist,
  insertUnconfirmedWaitlist,
  deleteExistingInsertNewWaitlist,
  sendEmail,
  sendTemplateEmail,
} from "utils-server";

export default async function waitlist(req, res) {
  if (req.method === "POST") {
    const { email, lists, donation } = req.body;

    // add new record
    let emailId;
    let confirmedEmail = false;
    const { errors, data } = await insertUnconfirmedWaitlist(
      email,
      lists,
      donation && [donation]
    );
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
          donations: donation && [donation],
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
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hrs
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-email-id": emailId,
      },
    };
    const encodedToken = jwt.sign(jwtClaims, process.env.HASURA_JWT_SECRET, {
      algorithm: "HS256",
    });

    let emailResult;

    if (email.confirmed) {
      console.log(`email login to ${email} for ${emailId}`);
      emailResult = await sendTemplateEmail(
        "returning-user",
        email,
        encodedToken,
        req.headers.host,
        {
          action_url: link,
          product_name: "The Story Engine",
          email: email,
          support_mail: "hello@tseventures.com",
          sender_name: "TSE Team",
        }
      );
    } else {
      console.log(`email verify to ${email} for ${emailId}`);
      emailResult = await sendTemplateEmail(
        "email-verify",
        email,
        encodedToken,
        req.headers.host,
        {
          action_url: link,
          product_name: "The Story Engine",
          email: email,
          support_mail: "hello@tseventures.com",
          sender_name: "TSE Team",
        }
      );
    }

    // send verify email

    res.statusCode = 200;
    res.json(emailResult);
    return;
  }

  res.statusCode = 404;
  res.end();
  return;
}

import { fetchEmailWaitlist, appendWaitlistDonation } from "utils-server";

export default async function handler(req, res) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  if (req.method === "POST") {
    console.dir({ body: req.body });
    const { amount, email, waitlistId } = req.body;

    const { errors, data } = await fetchEmailWaitlist(email?.toLowerCase());

    if (errors?.length) {
      return res.status(500).json(errors);
    }

    if (data.waitlist[0]?.id !== waitlistId) {
      console.error(
        `/donate: waitlistId / email mismatch. Request: ${waitlistId}, Database: ${data.waitlist[0]?.id}`
      );
      return res.status(400).send();
    }

    if (!data.waitlist[0]?.confirmed) {
      return res
        .status(400)
        .json({
          error: {
            message: "Email address must be confirmed on waitlist to donate.",
          },
        });
    }

    // TODO Validate amount & email!

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // in pennies
      currency: "gbp",
      receipt_email: email,
    });

    const { errors: appendErrors } = await appendWaitlistDonation({
      id: waitlistId,
      donation: paymentIntent.id,
    });
    if (appendErrors?.length) {
      console.error("donation append error");
      console.error(appendErrors);
      return res.status(500);
    }

    res.json({ email, amount, intentSecret: paymentIntent.client_secret });
    return;
  }

  res.statusCode = 404;
  res.end();
  return;
}

export default async function handler(req, res) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  if (req.method === "POST") {
    const domainURL = process.env.DOMAIN;
    const amount = req.body.amount;

    const { quantity, locale } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // In cents
      currency: "gbp",
      receipt_email: email,
    });

    res.statusCode = 200;
    res.end(); // do stuff
    return;
  }

  res.statusCode = 404;
  res.end();
  return;
}

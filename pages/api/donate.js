export default async function handler(req, res) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  if (req.method === "POST") {
    console.dir({ body: req.body });
    const { amount, email } = req.body;

    // TODO Validate amount & email!

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // in pennies
      currency: "gbp",
      receipt_email: email,
    });

    res.json({ email, amount, intentSecret: paymentIntent.client_secret });
    return;
  }

  res.statusCode = 404;
  res.end();
  return;
}

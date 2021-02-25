export default async function handler(req, res) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  if (req.method === "POST") {
    const domainURL = process.env.DOMAIN;
    const amount = req.body.amount;

    const { quantity, locale } = req.body;

    const pmTypes = (process.env.PAYMENT_METHOD_TYPES || "card")
      .split(",")
      .map((m) => m.trim());

    const session = await stripe.checkout.sessions.create({
      payment_method_types: pmTypes,
      mode: "payment",
      locale: locale,
      line_items: [
        {
          price: amount,
          quantity: 1,
        },
      ],
      success_url: `${domainURL}/payment_success/${session.id}`,
      cancel_url: `${domainURL}/payment_cancelled`,
    });

    res.statusCode = 200;
    res.end(); // do stuff
    return;
  }

  res.statusCode = 404;
  res.end();
  return;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    let data;
    let eventType;
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log("Webhook signature verification failed.");
        res.statusCode = 400;
        res.end();
        return;
      }
      data = event.data;
      eventType = event.type;
    } else {
      data = req.body.data;
      eventType = req.body.type;
    }

    if (eventType === "checkout.session.completed") {
      console.log("Payment received...");
      // TODO: stuff to assign package to user!
    }

    res.setStatus(200);
    res.end();
    return;
  }

  res.statusCode = 404;
  res.end();
  return;
}

import { fetchEmailWaitlist, updateWaitlistDonations } from "utils-server";

export default async function handler(req, res) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  if (req.method === "POST") {
    console.dir({ body: req.body });
    const { intentId, email, waitlistId } = req.body;

    const { errors, data } = await fetchEmailWaitlist(email?.toLowerCase());

    if (errors?.length) {
      console.error(errors);
      return res.status(500).send();
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

    if (!data.waitlist[0]?.donations?.includes(intentId)) {
      console.error(
        `Payment intent ${intentId} not found on waitlistId, ${waitlistId}`
      );
      return res.status(400).send();
    }

    const updatedIntent = await stripe.paymentIntents.retrieve(intentId);

    if (!["succeeded", "processing"].includes(updatedIntent.status)) {
      console.error(
        `Payment intent not succeeded or processing status, intent ${intentId}, waitlist ${waitlistId}`
      );
      return res
        .status(400)
        .send({ error: { message: `Payment ${intentId} failed.` } });
    }

    const updatedDonations = [
      // clear any unfulfilled payment intents
      ...(data.waitlist[0]?.donations?.filter(
        (donation) => typeof donation !== "string"
      ) || []),
      {
        status: updatedIntent.status,
        id: updatedIntent.id,
        amount: updatedIntent.amount,
        amountReceived: updatedIntent.amount_received,
        currency: updatedIntent.currency,
        livemode: updatedIntent.livemode,
        receiptEmail: updatedIntent.receipt_email,
        created: updatedIntent.created,
        receiptUrls: updatedIntent.charges?.data?.map(
          (charge) => charge.receipt_url
        ),
      },
    ];
    const {
      data: updateData,
      errors: updateErrors,
    } = await updateWaitlistDonations({
      id: waitlistId,
      donations: updatedDonations,
    });

    if (updateErrors?.length) {
      console.error(
        `Waitlist donations update failed: intent ${intentId}, waitlist ${waitlistId}`
      );
      console.error(updateErrors);
      res.status(500).json(updateErrors);
      return;
    }
    res.status(200).json(updateData.update_waitlist_by_pk);
    return;
  }

  res.statusCode = 404;
  res.end();
  return;
}

import { confirmUserWaitlist, fetchUserWaitlist } from "utils-server";

export default async function waitlistConfirm(req, res) {
  const jwt = req.query.token;
  console.log("confirming");
  const {
    errors: waitlistErrors,
    data: waitlistData,
  } = await fetchUserWaitlist(jwt);
  if (waitlistErrors?.length) {
    return res.status(500).json(waitlistErrors);
  }
  // flip confirmed flag true on record
  const { errors, data } = await confirmUserWaitlist(
    jwt,
    waitlistData.waitlist[0].id
  );
  if (errors?.length) {
    return res.status(500).json(errors);
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ waitlist: data.update_waitlist_by_pk }));
  // TODO: prep any pending donations with stripeId?
}

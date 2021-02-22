import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function getIdToken(req, res) {
  const ses = await getSession(req, res);
  const resBody = {
    idToken: ses?.idToken ?? null,
  };
  res.status(200).json(resBody);
});

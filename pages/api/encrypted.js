import dbConnect from "../../lib/connect";
import { downloadFileEncrypted, _testing } from "../../utils/encryptedFile";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      _testing();
      res.status(200).send({ success: true });
      break;
    case "POST":
      try {
        const { ipfspath } = req.body;
        const content = await downloadFileEncrypted(ipfspath);
        res.status(200).send(content);
      } catch (err) {
        res.status(400).send("error: " + err);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

import dbConnect from "../../../../lib/connect";
import Report from "../../../../models/report";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const reports = await Report.find({}).populate("user_id");
        return res.status(200).json({ success: true, reports });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

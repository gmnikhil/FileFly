import dbConnect from "../../lib/connect";
import Report from "../../models/report";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { user_id, post_id } = req.body;
        if (!user_id || !post_id) throw new Error("Invalid parameters");
        const report = await Report.findOne({ user_id, post_id });
        if (report)
          return res.status(200).json({ success: true, exists: true });

        await Report.create(req.body);
        res.status(201).json({ success: true, created: true });
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

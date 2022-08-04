import dbConnect from "../../lib/connect";
import Comment from "../../models/comment";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const comments = await Comment.find(req.query)
          .populate("user_id")
          .lean()
          .exec();
        console.log(comments);
        res.status(200).json({ success: true, comments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const comment = await Comment.create(req.body);
        res.status(201).json({ success: true, comment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

import dbConnect from "../../lib/connect";
import Post from "../../models/post";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const post = await Post.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const { post_id: _id, user_id } = req.body;
        console.log(req.body);
        const post = await Post.findOneAndUpdate(
          { _id, user_id },
          { deleted: true },
          { new: true }
        );
        if (!post) throw "No such post";
        else console.log(post);
        res.status(201).json({ success: true, post });
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

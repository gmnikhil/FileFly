import dbConnect from "../../lib/connect";
import User from "../../models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const user = await User.findOne(req.query);
        const found = user ? true : false;
        res.status(200).json({ success: true, found, user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user });
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

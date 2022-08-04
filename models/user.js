import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_addr: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "1",
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);

import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Like || mongoose.model("Like", likeSchema);

import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
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
    reason: {
      type: String,
      required: true,
    },
    post_index: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Report || mongoose.model("Report", reportSchema);

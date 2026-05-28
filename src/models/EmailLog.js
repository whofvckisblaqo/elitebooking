import mongoose from "mongoose";

const EmailLogSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    message: { type: String, required: true },
    recipients: { type: String, enum: ["all", "approved", "specific"], required: true },
    recipientCount: { type: Number, default: 0 },
    sentCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    sentBy: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.EmailLog || mongoose.model("EmailLog", EmailLogSchema);

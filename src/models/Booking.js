import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    celebrityId: { type: mongoose.Schema.Types.ObjectId, ref: "Celebrity", required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING" },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
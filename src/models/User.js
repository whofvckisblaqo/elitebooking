import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    country: { type: String, default: "" },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
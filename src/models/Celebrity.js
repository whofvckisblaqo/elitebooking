import mongoose from "mongoose";

const CelebritySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    bio: { type: String, required: true },
    fee: { type: Number, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    nationality: { type: String, default: "" },
    available: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    packages: [{ type: String }],
    packageFees: { type: Map, of: Number, default: {} },
    languages: [{ type: String }],
    socialMedia: {
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      youtube: { type: String, default: "" },
      tiktok: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Celebrity ||
  mongoose.model("Celebrity", CelebritySchema);
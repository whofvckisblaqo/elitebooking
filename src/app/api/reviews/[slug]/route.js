import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";
import Celebrity from "@/models/Celebrity";

export async function GET(req, context) {
  try {
    await connectDB();
    const { slug } = await context.params;

    const celebrity = await Celebrity.findOne({ slug });
    if (!celebrity) {
      return NextResponse.json({ reviews: [] });
    }

    const reviews = await Review.find({ celebrityId: celebrity._id })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    const formatted = reviews.map((r) => ({
      _id: r._id,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt,
      user: r.userId,
    }));

    return NextResponse.json({ reviews: formatted });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
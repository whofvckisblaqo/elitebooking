import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Celebrity from "@/models/Celebrity";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const excludeSlug = searchParams.get("exclude");

    const celebrities = await Celebrity.find({
      category,
      slug: { $ne: excludeSlug },
      available: true,
    })
      .limit(4)
      .sort({ createdAt: -1 });

    return NextResponse.json({ celebrities });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
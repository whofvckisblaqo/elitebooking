import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Celebrity from "@/models/Celebrity";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let query = {};

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const celebrities = await Celebrity.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ celebrities });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
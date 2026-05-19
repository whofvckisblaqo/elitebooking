import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Celebrity from "@/models/Celebrity";

export async function GET() {
  try {
    await connectDB();
    const celebrities = await Celebrity.find({ featured: true, available: true })
      .sort({ createdAt: -1 })
      .limit(8);
    return NextResponse.json({ celebrities });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
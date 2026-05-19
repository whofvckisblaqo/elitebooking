import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Celebrity from "@/models/Celebrity";

export async function GET(req, context) {
  try {
    await connectDB();
    const { slug } = await context.params;
    const celebrity = await Celebrity.findOne({ slug });
    if (!celebrity) {
      return NextResponse.json({ error: "Celebrity not found" }, { status: 404 });
    }
    return NextResponse.json({ celebrity });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
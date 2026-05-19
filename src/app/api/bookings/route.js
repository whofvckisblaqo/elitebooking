import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { celebrityId, eventType, eventDate, message } = await req.json();

    if (!celebrityId || !eventType || !eventDate || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const booking = await Booking.create({
      userId: session.user.id,
      celebrityId,
      eventType,
      eventDate,
      message,
    });

    return NextResponse.json({ message: "Booking request sent", booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
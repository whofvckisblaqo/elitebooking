import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("celebrityId", "name image category")
      .sort({ createdAt: -1 });

    const formatted = bookings.map((b) => ({
      _id: b._id,
      eventType: b.eventType,
      eventDate: b.eventDate,
      message: b.message,
      status: b.status,
      createdAt: b.createdAt,
      user: b.userId,
      celebrity: b.celebrityId,
    }));

    return NextResponse.json({ bookings: formatted });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Celebrity from "@/models/Celebrity";
import Booking from "@/models/Booking";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [totalCelebrities, totalBookings, pendingBookings, totalUsers, recentBookings] =
      await Promise.all([
        Celebrity.countDocuments(),
        Booking.countDocuments(),
        Booking.countDocuments({ status: "PENDING" }),
        User.countDocuments({ role: "USER" }),
        Booking.find()
          .populate("userId", "name email")
          .populate("celebrityId", "name")
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

    const formatted = recentBookings.map((b) => ({
      _id: b._id,
      eventType: b.eventType,
      eventDate: b.eventDate,
      status: b.status,
      createdAt: b.createdAt,
      user: b.userId,
      celebrity: b.celebrityId,
    }));

    return NextResponse.json({
      stats: { totalCelebrities, totalBookings, pendingBookings, totalUsers },
      recentBookings: formatted,
    });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const users = await User.find({ role: "USER" })
      .select("-password")
      .sort({ createdAt: -1 });

    // Get booking count for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const bookingCount = await Booking.countDocuments({ userId: user._id });
        const approvedCount = await Booking.countDocuments({ userId: user._id, status: "APPROVED" });
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          country: user.country,
          createdAt: user.createdAt,
          bookingCount,
          approvedCount,
        };
      })
    );

    return NextResponse.json({ users: usersWithStats });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
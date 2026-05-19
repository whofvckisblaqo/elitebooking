import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // Delete existing admin if any
    await User.deleteOne({ email: "elitebookingsuport@outlook.com" });

    const hashed = await bcrypt.hash("Admin@123456", 10);
    await User.create({
      name: "EliteBooking Admin",
      email: "elitebookingsuport@outlook.com",
      password: hashed,
      phone: "0000000000",
      country: "United States",
      role: "ADMIN",
    });

    return NextResponse.json({ message: "Admin created successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const existing = await User.findOne({ email: "elitebookingsuport@gmail.com" });
    if (existing) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash("Admin@123456", 10);
    await User.create({
      name: "EliteBooking Admin",
      email: "elitebookingsuport@gmail.com",
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
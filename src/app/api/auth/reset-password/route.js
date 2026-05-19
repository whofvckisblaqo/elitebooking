import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { token, email, password } = await req.json();

    if (!token || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired reset link. Please request a new one." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(user._id, {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
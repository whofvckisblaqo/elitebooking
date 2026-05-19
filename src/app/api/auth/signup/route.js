import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, phone, country } = await req.json();

    if (!name || !email || !password || !phone || !country) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, phone, country });

    await resend.emails.send({
      from: "EliteBooking <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to EliteBooking",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
          <h1 style="font-size:28px;font-weight:800;margin-bottom:8px;">Welcome, ${name}!</h1>
          <p style="color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7;margin-bottom:32px;">
            Your EliteBooking account has been created successfully. You can now browse and book world-class celebrities for your events.
          </p>
          <a href="${process.env.NEXTAUTH_URL}/celebrities" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;">
            Browse Celebrities
          </a>
          <p style="color:rgba(255,255,255,0.3);font-size:12px;margin-top:48px;">
            © ${new Date().getFullYear()} EliteBooking. All rights reserved.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
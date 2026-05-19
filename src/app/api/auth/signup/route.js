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

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email: normalizedEmail, password: hashed, phone, country });

    // Welcome email to user
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: normalizedEmail,
      replyTo: process.env.SUPPORT_EMAIL,
      subject: "Welcome to EliteBooking! 🎉",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
          <h1 style="font-size:28px;font-weight:800;margin-bottom:8px;">Welcome, ${name}! 🎉</h1>
          <p style="color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7;margin-bottom:24px;">
            Your EliteBooking account has been created successfully. You can now browse and book world-class celebrities for your events.
          </p>
          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:28px;">
            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Your Account</p>
            <p style="font-size:16px;font-weight:700;color:#fff;margin:0 0 8px;">${name}</p>
            <p style="font-size:14px;color:rgba(255,255,255,0.5);margin:0;">${normalizedEmail}</p>
          </div>
          <a href="${process.env.NEXTAUTH_URL}/celebrities" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;margin-bottom:32px;">
            Browse Celebrities
          </a>
          <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
            <p style="font-size:12px;color:rgba(255,255,255,0.25);margin:0;">© ${new Date().getFullYear()} EliteBooking. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    // Notify admin of new registration
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.SUPPORT_EMAIL,
      subject: `New User Registration — ${name}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
          <h1 style="font-size:22px;font-weight:800;margin-bottom:20px;">New User Registered 👤</h1>
          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:24px;">
            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Name</p>
            <p style="font-size:16px;font-weight:700;color:#fff;margin:0 0 16px;">${name}</p>
            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Email</p>
            <p style="font-size:16px;font-weight:700;color:#fff;margin:0 0 16px;">${normalizedEmail}</p>
            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Phone</p>
            <p style="font-size:16px;font-weight:700;color:#fff;margin:0 0 16px;">${phone}</p>
            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Country</p>
            <p style="font-size:16px;font-weight:700;color:#fff;margin:0;">${country}</p>
          </div>
          <a href="${process.env.NEXTAUTH_URL}/admin/users" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;">
            View Users
          </a>
        </div>
      `,
    });

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Celebrity from "@/models/Celebrity";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const celebrity = await Celebrity.findById(celebrityId);
    const user = await User.findById(session.user.id);

    // Email to user — booking received
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: user.email,
      replyTo: process.env.SUPPORT_EMAIL,
      subject: `Booking Request Received — ${celebrity.name}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.1);display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
              <span style="font-size:32px;">📋</span>
            </div>
            <h1 style="font-size:24px;font-weight:800;color:#fff;margin:0 0 8px;">Booking Request Received!</h1>
            <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0;">We will review your request shortly</p>
          </div>

          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:28px;">
            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Celebrity</p>
            <p style="font-size:18px;font-weight:700;color:#fff;margin:0 0 16px;">${celebrity.name}</p>

            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Package</p>
            <p style="font-size:16px;font-weight:600;color:#fff;margin:0 0 16px;">${eventType}</p>

            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Event Date</p>
            <p style="font-size:16px;font-weight:600;color:#fff;margin:0 0 16px;">${new Date(eventDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Status</p>
            <p style="font-size:16px;font-weight:700;color:#f59e0b;margin:0;">⏳ Pending Review</p>
          </div>

          <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:28px;">
            Hi ${user.name}, your booking request for <strong style="color:#fff;">${celebrity.name}</strong> has been received. 
            Our team will review it and notify you within 24 hours.
          </p>

          <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;margin-bottom:32px;">
            View My Bookings
          </a>

          <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
            <p style="font-size:12px;color:rgba(255,255,255,0.25);margin:0;">© ${new Date().getFullYear()} EliteBooking. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    // Email to admin — new booking
    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.SUPPORT_EMAIL,
      subject: `New Booking Request — ${celebrity.name} by ${user.name}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
          <h1 style="font-size:22px;font-weight:800;margin-bottom:20px;">New Booking Request 📋</h1>

          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:24px;">
            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">User</p>
            <p style="font-size:16px;font-weight:700;color:#fff;margin:0 0 4px;">${user.name}</p>
            <p style="font-size:14px;color:rgba(255,255,255,0.5);margin:0 0 16px;">${user.email}</p>

            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Celebrity</p>
            <p style="font-size:16px;font-weight:700;color:#fff;margin:0 0 16px;">${celebrity.name}</p>

            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Package</p>
            <p style="font-size:16px;font-weight:600;color:#fff;margin:0 0 16px;">${eventType}</p>

            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Event Date</p>
            <p style="font-size:16px;font-weight:600;color:#fff;margin:0 0 16px;">${new Date(eventDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>

            <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
            <p style="font-size:14px;color:rgba(255,255,255,0.7);line-height:1.7;margin:0;">${message}</p>
          </div>

          <a href="${process.env.NEXTAUTH_URL}/admin/bookings" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;">
            Review Booking
          </a>
        </div>
      `,
    });

    return NextResponse.json({ message: "Booking request sent", booking }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
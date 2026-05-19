import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import User from "@/models/User";
import Celebrity from "@/models/Celebrity";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PUT(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await context.params;
    const { status } = await req.json();

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const user = await User.findById(booking.userId);
    const celebrity = await Celebrity.findById(booking.celebrityId);

    if (user && celebrity) {
      const isApproved = status === "APPROVED";

      // Email to user
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: user.email,
        replyTo: process.env.SUPPORT_EMAIL,
        subject: isApproved
          ? `🎉 Your booking for ${celebrity.name} is Approved!`
          : `Update on your booking for ${celebrity.name}`,
        html: isApproved
          ? `
            <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
              <div style="text-align:center;margin-bottom:32px;">
                <div style="width:72px;height:72px;border-radius:50%;background:#fff;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                  <span style="font-size:32px;">✅</span>
                </div>
                <h1 style="font-size:26px;font-weight:800;color:#fff;margin:0 0 8px;">Booking Approved!</h1>
                <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0;">Great news — your request has been confirmed</p>
              </div>

              <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:28px;">
                <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Celebrity</p>
                <p style="font-size:18px;font-weight:700;color:#fff;margin:0 0 16px;">${celebrity.name}</p>

                <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Package</p>
                <p style="font-size:16px;font-weight:600;color:#fff;margin:0 0 16px;">${booking.eventType}</p>

                <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Event Date</p>
                <p style="font-size:16px;font-weight:600;color:#fff;margin:0;">${new Date(booking.eventDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              </div>

              <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:28px;">
                Hi ${user.name}, your booking for <strong style="color:#fff;">${celebrity.name}</strong> has been approved! 
                Our team will be in touch with further details shortly. Get ready for an amazing experience!
              </p>

              <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;margin-bottom:32px;">
                View My Bookings
              </a>

              <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
                <p style="font-size:12px;color:rgba(255,255,255,0.25);margin:0;">
                  Questions? Contact us at <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color:rgba(255,255,255,0.5);text-decoration:none;">${process.env.SUPPORT_EMAIL}</a>
                </p>
                <p style="font-size:12px;color:rgba(255,255,255,0.2);margin:8px 0 0;">© ${new Date().getFullYear()} EliteBooking. All rights reserved.</p>
              </div>
            </div>
          `
          : `
            <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
              <div style="text-align:center;margin-bottom:32px;">
                <div style="width:72px;height:72px;border-radius:50%;background:rgba(255,59,48,0.15);border:1px solid rgba(255,59,48,0.3);display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
                  <span style="font-size:32px;">❌</span>
                </div>
                <h1 style="font-size:26px;font-weight:800;color:#fff;margin:0 0 8px;">Booking Not Approved</h1>
                <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0;">Unfortunately your request was not approved</p>
              </div>

              <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:28px;">
                <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Celebrity</p>
                <p style="font-size:18px;font-weight:700;color:#fff;margin:0 0 16px;">${celebrity.name}</p>

                <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Package</p>
                <p style="font-size:16px;font-weight:600;color:#fff;margin:0 0 16px;">${booking.eventType}</p>

                <p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Event Date</p>
                <p style="font-size:16px;font-weight:600;color:#fff;margin:0;">${new Date(booking.eventDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              </div>

              <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:28px;">
                Hi ${user.name}, unfortunately your booking request for <strong style="color:#fff;">${celebrity.name}</strong> was not approved at this time. 
                This may be due to availability or scheduling conflicts. Feel free to explore other celebrities or try a different date.
              </p>

              <a href="${process.env.NEXTAUTH_URL}/celebrities" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;margin-bottom:32px;">
                Browse More Celebrities
              </a>

              <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
                <p style="font-size:12px;color:rgba(255,255,255,0.25);margin:0;">
                  Questions? Contact us at <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color:rgba(255,255,255,0.5);text-decoration:none;">${process.env.SUPPORT_EMAIL}</a>
                </p>
                <p style="font-size:12px;color:rgba(255,255,255,0.2);margin:8px 0 0;">© ${new Date().getFullYear()} EliteBooking. All rights reserved.</p>
              </div>
            </div>
          `,
      });
    }

    return NextResponse.json({ message: "Booking updated", booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
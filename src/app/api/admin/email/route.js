import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Booking from "@/models/Booking";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { recipients, userIds, subject, message } = await req.json();

    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
    }

    let users = [];

    if (recipients === "all") {
      users = await User.find({ role: "USER" }).select("name email");
    } else if (recipients === "approved") {
      const approvedBookings = await Booking.find({ status: "APPROVED" }).distinct("userId");
      users = await User.find({ _id: { $in: approvedBookings }, role: "USER" }).select("name email");
    } else if (recipients === "specific") {
      if (!userIds || userIds.length === 0) {
        return NextResponse.json({ error: "No users selected" }, { status: 400 });
      }
      users = await User.find({ _id: { $in: userIds } }).select("name email");
    } else {
      return NextResponse.json({ error: "Invalid recipient type" }, { status: 400 });
    }

    if (users.length === 0) {
      return NextResponse.json({ error: "No users found for the selected recipients" }, { status: 400 });
    }

    const plainText = message.replace(/<[^>]*>/g, "").replace(/\n/g, " ").trim();

    const buildHtml = (userName) => `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
        <div style="margin-bottom:32px;">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin:0 0 8px;">EliteBooking</p>
          <h1 style="font-size:24px;font-weight:800;color:#fff;margin:0;line-height:1.2;">${subject}</h1>
        </div>

        <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:28px;margin-bottom:28px;">
          <p style="font-size:15px;color:rgba(255,255,255,0.85);line-height:1.8;margin:0;white-space:pre-wrap;">${message.replace(/\n/g, "<br/>")}</p>
        </div>

        <p style="font-size:13px;color:rgba(255,255,255,0.35);line-height:1.7;margin-bottom:28px;">
          Hi ${userName}, this message was sent to you by the EliteBooking team.
          If you have any questions, reply to this email or contact us at
          <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color:rgba(255,255,255,0.5);text-decoration:none;">${process.env.SUPPORT_EMAIL}</a>.
        </p>

        <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;margin-bottom:32px;">
          View My Dashboard
        </a>

        <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
          <p style="font-size:12px;color:rgba(255,255,255,0.2);margin:0;">
            You received this email because you are registered on EliteBooking.
            Questions? <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color:rgba(255,255,255,0.35);text-decoration:none;">Contact support</a>
          </p>
          <p style="font-size:12px;color:rgba(255,255,255,0.15);margin:8px 0 0;">© ${new Date().getFullYear()} EliteBooking. All rights reserved.</p>
        </div>
      </div>
    `;

    // Send in batches of 100 (Resend batch limit)
    const BATCH_SIZE = 100;
    let sent = 0;
    let failed = 0;

    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE);
      const emails = batch.map((user) => ({
        from: process.env.FROM_EMAIL,
        to: user.email,
        replyTo: process.env.SUPPORT_EMAIL,
        subject,
        html: buildHtml(user.name || "there"),
        text: `${subject}\n\n${plainText}\n\nQuestions? Contact us at ${process.env.SUPPORT_EMAIL}`,
      }));

      try {
        await resend.batch.send(emails);
        sent += batch.length;
      } catch {
        failed += batch.length;
      }
    }

    return NextResponse.json({ message: `Emails sent successfully`, sent, failed });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

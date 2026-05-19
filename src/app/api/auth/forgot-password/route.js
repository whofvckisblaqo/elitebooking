import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Always return success even if user not found (security)
    if (!user) {
      return NextResponse.json({ message: "If an account exists, a reset link has been sent" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await User.findByIdAndUpdate(user._id, {
      resetToken,
      resetTokenExpiry,
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}&email=${email}`;

    await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: email,
      replyTo: process.env.SUPPORT_EMAIL,
      subject: "Reset Your EliteBooking Password",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
          <div style="text-align:center;margin-bottom:32px;">
            <div style="width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.1);display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
              <span style="font-size:32px;">🔐</span>
            </div>
            <h1 style="font-size:24px;font-weight:800;color:#fff;margin:0 0 8px;">Reset Your Password</h1>
            <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0;">You requested a password reset</p>
          </div>

          <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:28px;">
            Hi ${user.name}, we received a request to reset your EliteBooking password. Click the button below to set a new password. This link expires in <strong style="color:#fff;">1 hour</strong>.
          </p>

          <div style="text-align:center;margin-bottom:28px;">
            <a href="${resetUrl}" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:16px 40px;border-radius:999px;text-decoration:none;">
              Reset Password
            </a>
          </div>

          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px 20px;margin-bottom:28px;">
            <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0 0 6px;">Or copy this link:</p>
            <p style="font-size:12px;color:rgba(255,255,255,0.6);word-break:break-all;margin:0;">${resetUrl}</p>
          </div>

          <p style="font-size:13px;color:rgba(255,255,255,0.4);line-height:1.7;margin-bottom:28px;">
            If you did not request a password reset, please ignore this email. Your password will remain unchanged.
          </p>

          <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
            <p style="font-size:12px;color:rgba(255,255,255,0.25);margin:0;">© ${new Date().getFullYear()} EliteBooking. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "If an account exists, a reset link has been sent" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
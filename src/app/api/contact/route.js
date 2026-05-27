import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Send to admin
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "EliteBooking <onboarding@resend.dev>",
      to: process.env.SUPPORT_EMAIL || "elitebookingsuport@outlook.com",
      replyTo: email,
      subject: `[EliteBooking Contact] ${subject} — from ${name}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
          <h1 style="font-size:22px;font-weight:800;color:#fff;margin:0 0 24px;">New Contact Message</h1>

          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:24px;">
            <p style="font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">From</p>
            <p style="font-size:16px;font-weight:700;color:#fff;margin:0 0 16px;">${name} &lt;${email}&gt;</p>

            <p style="font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Subject</p>
            <p style="font-size:16px;font-weight:700;color:#fff;margin:0 0 16px;">${subject}</p>

            <p style="font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Message</p>
            <p style="font-size:15px;color:rgba(255,255,255,0.8);line-height:1.7;margin:0;">${message}</p>
          </div>

          <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:0;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "EliteBooking <onboarding@resend.dev>",
      to: email,
      replyTo: process.env.SUPPORT_EMAIL || "elitebookingsuport@outlook.com",
      subject: "We received your message — EliteBooking",
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#000;color:#fff;padding:48px 32px;border-radius:16px;">
          <h1 style="font-size:24px;font-weight:800;color:#fff;margin:0 0 12px;">Thanks for reaching out, ${name}!</h1>
          <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.7;margin:0 0 28px;">
            We have received your message and will get back to you within 24 hours.
          </p>

          <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:28px;">
            <p style="font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Subject</p>
            <p style="font-size:15px;font-weight:600;color:#fff;margin:0 0 16px;">${subject}</p>

            <p style="font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 4px;">Your Message</p>
            <p style="font-size:14px;color:rgba(255,255,255,0.7);line-height:1.7;margin:0;">${message}</p>
          </div>

          <a href="${process.env.NEXTAUTH_URL}/celebrities" style="display:inline-block;background:#fff;color:#000;font-weight:700;font-size:14px;padding:14px 32px;border-radius:999px;text-decoration:none;margin-bottom:32px;">
            Browse Celebrities
          </a>

          <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
            <p style="font-size:12px;color:rgba(255,255,255,0.25);margin:0;">
              © ${new Date().getFullYear()} EliteBooking. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
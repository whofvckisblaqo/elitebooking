import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.SUPPORT_EMAIL,
      subject: "EliteBooking Email Test",
      html: `<p>Email is working! Sent at ${new Date().toISOString()}</p>`,
    });

    return NextResponse.json({ 
      success: true, 
      result,
      from: process.env.FROM_EMAIL,
      to: process.env.SUPPORT_EMAIL,
      key: process.env.RESEND_API_KEY ? "Key exists" : "Key missing",
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      from: process.env.FROM_EMAIL,
      to: process.env.SUPPORT_EMAIL,
      key: process.env.RESEND_API_KEY ? "Key exists" : "Key missing",
    }, { status: 500 });
  }
}
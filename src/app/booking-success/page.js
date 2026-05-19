"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function BookingSuccessPage() {
  const { data: session } = useSession();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 48px",
      }}
    >
      <div style={{ maxWidth: "560px", width: "100%", textAlign: "center" }}>

        {/* Checkmark */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            animation: "popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
          }}
        >
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#000">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
              style={{
                animation: "drawCheck 0.4s ease 0.3s forwards",
                strokeDasharray: 30,
                strokeDashoffset: 30,
              }}
            />
          </svg>
        </div>

        {/* Label */}
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "16px",
          }}
        >
          Request Submitted
        </p>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          Booking Request Sent!
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            maxWidth: "400px",
            margin: "0 auto 40px",
          }}
        >
          Your booking request has been submitted successfully.
          {session?.user?.name && ` Thank you, ${session.user.name.split(" ")[0]}!`}
          {" "}We will review it and notify you once it is approved.
        </p>

        {/* Info Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          {[
            { icon: "📋", title: "Under Review", desc: "Our team is reviewing your request" },
            { icon: "📧", title: "Email Notice", desc: "You will be notified by email" },
            { icon: "✅", title: "Confirmation", desc: "Booking confirmed once approved" },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                padding: "20px 16px",
              }}
            >
              <span style={{ fontSize: "28px", display: "block", marginBottom: "10px" }}>
                {item.icon}
              </span>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                {item.title}
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: "block",
              background: "#fff",
              color: "#000",
              fontWeight: 700,
              fontSize: "15px",
              padding: "18px 48px",
              borderRadius: "999px",
              textDecoration: "none",
              width: "100%",
              maxWidth: "320px",
              textAlign: "center",
            }}
          >
            View My Bookings
          </Link>
          <Link
            href="/celebrities"
            style={{
              display: "block",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 600,
              fontSize: "14px",
              padding: "16px 48px",
              borderRadius: "999px",
              textDecoration: "none",
              width: "100%",
              maxWidth: "320px",
              textAlign: "center",
            }}
          >
            Browse More Celebrities
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
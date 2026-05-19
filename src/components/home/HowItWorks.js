"use client";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Browse Talent",
    desc: "Explore hundreds of world-class celebrities across every category and industry.",
  },
  {
    number: "02",
    title: "Submit a Booking",
    desc: "Fill out your event details and send a booking request directly to the celebrity.",
  },
  {
    number: "03",
    title: "Confirm & Celebrate",
    desc: "Once approved, your event is locked in. Get ready for an unforgettable experience.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        width: "100%",
        background: "#000",
        paddingTop: "80px",
        paddingBottom: "80px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "16px",
            }}
          >
            Simple Process
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            How It Works
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            position: "relative",
          }}
        >
          {/* Connector line — only visible on wide screens */}
          <div
            style={{
              position: "absolute",
              top: "24px",
              left: "calc(16.66% + 24px)",
              right: "calc(16.66% + 24px)",
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />

          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "20px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Number circle */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Text */}
              <div>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "12px",
                  }}
                >
                  {step.title}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.75,
                    maxWidth: "260px",
                    margin: "0 auto",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#000",
              fontWeight: 700,
              fontSize: "14px",
              padding: "18px 48px",
              borderRadius: "999px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.88)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            Start Booking Now
          </Link>
        </div>

      </div>
    </section>
  );
}
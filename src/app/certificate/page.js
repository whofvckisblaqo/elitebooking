"use client";
import Link from "next/link";



const certNumber = "EB-2024-LIC-" + "78542369".match(/.{1,4}/g).join("-");
const issueDate = "January 15, 2024";
const expiryDate = "January 15, 2027";

export default function CertificatePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", paddingTop: "68px" }}>

      {/* Header */}
      <div style={{ background: "#000", paddingTop: "60px", paddingBottom: "60px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>
            Legal & Compliance
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Certificate of Operation
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto" }}>
            EliteBooking is a fully registered and licensed celebrity booking platform operating globally.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>

        {/* Certificate */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: "24px",
            overflow: "hidden",
            marginBottom: "40px",
            boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
          }}
        >
          {/* Certificate top bar */}
          <div
            style={{
              background: "#000",
              padding: "32px 48px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "16px" }}>
              <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.2)" }} />
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="23" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <circle cx="24" cy="24" r="18" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <path d="M24 12L27.5 20H36L29.5 25L32 33L24 28L16 33L18.5 25L12 20H20.5L24 12Z" fill="white" opacity="0.9" />
              </svg>
              <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.2)" }} />
            </div>
            <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
              Official Document
            </p>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>
              Certificate of Operation
            </h2>
          </div>

          {/* Certificate body */}
          <div style={{ padding: "48px" }}>

            {/* Seal + intro */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "3px solid #000",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: "6px",
                    borderRadius: "50%",
                    border: "1px solid #000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000" }}>ELITE</span>
                  <span style={{ fontSize: "7px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#555" }}>BOOKING</span>
                  <span style={{ fontSize: "18px" }}>✦</span>
                  <span style={{ fontSize: "7px", fontWeight: 600, color: "#555" }}>CERTIFIED</span>
                </div>
              </div>

              <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
                This is to certify that
              </p>
              <h3 style={{ fontSize: "32px", fontWeight: 800, color: "#000", letterSpacing: "-0.02em", margin: "8px 0" }}>
                EliteBooking
              </h3>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto" }}>
                is a fully registered and licensed celebrity booking platform authorized to operate globally as an intermediary between clients and celebrity talent.
              </p>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px" }}>
              <div style={{ flex: 1, height: "1px", background: "#eee" }} />
              <span style={{ fontSize: "12px", color: "#bbb", letterSpacing: "0.1em" }}>CERTIFICATION DETAILS</span>
              <div style={{ flex: 1, height: "1px", background: "#eee" }} />
            </div>

            {/* Details grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" }}>
              {[
                { label: "Certificate Number", value: certNumber },
                { label: "Business Name", value: "EliteBooking Ltd." },
                { label: "Date of Issue", value: issueDate },
                { label: "Valid Until", value: expiryDate },
                { label: "Registration Type", value: "Digital Commerce Platform" },
                { label: "Operating Region", value: "Global / International" },
                { label: "Industry", value: "Entertainment & Events" },
                { label: "Status", value: "✅ Active & Verified" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: "#f9f9f9",
                    border: "1px solid #eee",
                    borderRadius: "12px",
                    padding: "16px 20px",
                  }}
                >
                  <p style={{ fontSize: "10px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#000" }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Signature section */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "32px", paddingTop: "32px", borderTop: "1px solid #eee" }}>
              <div>
                <p style={{ fontSize: "22px", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#000", marginBottom: "4px" }}>
                  James A. Crawford
                </p>
                <div style={{ width: "180px", height: "1px", background: "#000", marginBottom: "6px" }} />
                <p style={{ fontSize: "12px", color: "#999" }}>Chief Executive Officer</p>
                <p style={{ fontSize: "12px", color: "#999" }}>EliteBooking Ltd.</p>
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    border: "2px solid #000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#000", textAlign: "center", letterSpacing: "0.05em", lineHeight: 1.4 }}>
                    OFFICIAL<br />SEAL
                  </span>
                </div>
                <p style={{ fontSize: "10px", color: "#bbb" }}>Authorized Seal</p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "22px", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#000", marginBottom: "4px" }}>
                  Sarah M. Elliott
                </p>
                <div style={{ width: "180px", height: "1px", background: "#000", marginBottom: "6px", marginLeft: "auto" }} />
                <p style={{ fontSize: "12px", color: "#999" }}>Chief Legal Officer</p>
                <p style={{ fontSize: "12px", color: "#999" }}>EliteBooking Ltd.</p>
              </div>
            </div>

          </div>

          {/* Certificate footer */}
          <div
            style={{
              background: "#f9f9f9",
              borderTop: "1px solid #eee",
              padding: "20px 48px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <p style={{ fontSize: "12px", color: "#999" }}>
              Certificate ID: <strong style={{ color: "#000" }}>{certNumber}</strong>
            </p>
            <p style={{ fontSize: "12px", color: "#999" }}>
              Verify at: <strong style={{ color: "#000" }}>elitebookingweb.xyz/certificate</strong>
            </p>
            <p style={{ fontSize: "12px", color: "#999" }}>
              Valid through: <strong style={{ color: "#000" }}>{expiryDate}</strong>
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {[
            {
              icon: "🔒",
              title: "Secure Platform",
              desc: "All transactions and data are protected with industry-standard encryption.",
            },
            {
              icon: "✅",
              title: "Verified Celebrities",
              desc: "Every celebrity on our platform is manually verified by our team.",
            },
            {
              icon: "🌍",
              title: "Global Operations",
              desc: "We operate in 50+ countries connecting clients with world-class talent.",
            },
            {
              icon: "📋",
              title: "Legal Compliance",
              desc: "EliteBooking complies with international digital commerce regulations.",
            },
          ].map((badge) => (
            <div
              key={badge.title}
              style={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "28px", flexShrink: 0 }}>{badge.icon}</span>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#000", marginBottom: "6px" }}>{badge.title}</p>
                <p style={{ fontSize: "13px", color: "#999", lineHeight: 1.6 }}>{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom links */}
        <div
          style={{
            paddingTop: "32px",
            borderTop: "1px solid #eee",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: "13px", color: "#999" }}>
            Questions about our certification?{" "}
            <Link href="/contact" style={{ color: "#000", fontWeight: 600, textDecoration: "none" }}>
              Contact us
            </Link>
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/executives" style={{ fontSize: "13px", color: "#000", fontWeight: 600, textDecoration: "none" }}>
              Meet Our Team →
            </Link>
            <Link href="/terms" style={{ fontSize: "13px", color: "#999", textDecoration: "none" }}>
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
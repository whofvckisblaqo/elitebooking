"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setSuccess(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", paddingTop: "68px" }}>

      {/* Header */}
      <div style={{ background: "#000", paddingTop: "60px", paddingBottom: "60px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px" }}>
            Get In Touch
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "16px" }}>
            Contact Us
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Have a question about booking a celebrity? We are here to help.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }} className="contact-grid">

          {/* Left — Contact Info */}
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#000", marginBottom: "8px", letterSpacing: "-0.01em" }}>
              Let's Talk
            </h2>
            <p style={{ fontSize: "14px", color: "#999", lineHeight: 1.7, marginBottom: "40px" }}>
              Whether you need help booking a celebrity, have a question about our platform, or want to list a celebrity — our team is ready to assist you.
            </p>

            {/* Contact cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", background: "#f9f9f9", border: "1px solid #eee", borderRadius: "14px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Email Us</p>
                  <a href="mailto:elitebookingsuport@outlook.com" style={{ fontSize: "14px", fontWeight: 700, color: "#000", textDecoration: "none" }}>
                    elitebookingsuport@outlook.com
                  </a>
                </div>
              </div>

              {/* Response time */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", background: "#f9f9f9", border: "1px solid #eee", borderRadius: "14px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Response Time</p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#000" }}>Within 24 hours</p>
                </div>
              </div>

              {/* Live support */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", background: "#000", border: "1px solid #000", borderRadius: "14px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Live Support</p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>Chat with us in real time</p>
                  {/* Smartsupp link placeholder */}
                  <button
                    onClick={() => {
                      if (window.smartsupp) {
                        window.smartsupp("chat:open");
                      }
                    }}
                    style={{ fontSize: "12px", fontWeight: 700, color: "#000", background: "#fff", border: "none", padding: "8px 18px", borderRadius: "999px", cursor: "pointer" }}
                  >
                    Start Live Chat
                  </button>
                </div>
              </div>

            </div>

            {/* FAQ links */}
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#000", marginBottom: "16px" }}>Quick Links</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "How does booking work?", href: "/#how-it-works" },
                  { label: "Browse all celebrities", href: "/celebrities" },
                  { label: "View my bookings", href: "/dashboard" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Privacy Policy", href: "/privacy" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{ fontSize: "14px", color: "#555", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div>
            <div style={{ background: "#000", borderRadius: "20px", padding: "36px 32px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>Send a Message</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "28px" }}>
                Fill out the form and we will get back to you shortly.
              </p>

              {success ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#000">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>Message Sent!</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "24px" }}>
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    style={{ background: "#fff", color: "#000", fontWeight: 700, fontSize: "14px", padding: "14px 32px", borderRadius: "999px", border: "none", cursor: "pointer" }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div style={{ background: "rgba(255,59,48,0.1)", border: "1px solid rgba(255,59,48,0.25)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", fontSize: "13px", color: "#ff6b6b" }}>
                      {error}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={labelStyle}>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.4)")}
                          onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.1)")}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.4)")}
                          onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.1)")}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Subject</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        style={{ ...inputStyle, cursor: "pointer" }}
                        onFocus={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.4)")}
                        onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.1)")}
                      >
                        <option value="">Select a subject</option>
                        <option value="Booking Inquiry" style={{ background: "#111" }}>Booking Inquiry</option>
                        <option value="Celebrity Listing" style={{ background: "#111" }}>List a Celebrity</option>
                        <option value="Payment Issue" style={{ background: "#111" }}>Payment Issue</option>
                        <option value="Technical Support" style={{ background: "#111" }}>Technical Support</option>
                        <option value="Partnership" style={{ background: "#111" }}>Partnership</option>
                        <option value="Other" style={{ background: "#111" }}>Other</option>
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                        onFocus={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.4)")}
                        onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.1)")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ width: "100%", background: loading ? "rgba(255,255,255,0.5)" : "#fff", color: "#000", fontWeight: 700, fontSize: "15px", padding: "18px", borderRadius: "999px", border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>

                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.5)",
  marginBottom: "8px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "14px 16px",
  fontSize: "14px",
  color: "#fff",
  outline: "none",
  transition: "border 0.2s ease",
};
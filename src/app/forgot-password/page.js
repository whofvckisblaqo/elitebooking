"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 48px" }}>
      <div style={{ width: "100%", maxWidth: "460px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>
            Account Recovery
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            Forgot Password
          </h1>
        </div>

        <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "40px 32px" }}>

          {success ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <span style={{ fontSize: "28px" }}>📧</span>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>Check Your Email</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "28px" }}>
                If an account exists for <strong style={{ color: "#fff" }}>{email}</strong>, we've sent a password reset link. Check your inbox and spam folder.
              </p>
              <Link
                href="/login"
                style={{ display: "inline-block", background: "#fff", color: "#000", fontWeight: 700, fontSize: "14px", padding: "14px 32px", borderRadius: "999px", textDecoration: "none" }}
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "28px" }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {error && (
                <div style={{ background: "rgba(255,59,48,0.1)", border: "1px solid rgba(255,59,48,0.25)", borderRadius: "10px", padding: "14px 16px", marginBottom: "24px", fontSize: "13px", color: "#ff6b6b" }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px 16px", fontSize: "14px", color: "#fff", outline: "none" }}
                    onFocus={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.4)")}
                    onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.1)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: "100%", background: loading ? "rgba(255,255,255,0.5)" : "#fff", color: "#000", fontWeight: 700, fontSize: "15px", padding: "18px", borderRadius: "999px", border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "24px" }}>
                Remember your password?{" "}
                <Link href="/login" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
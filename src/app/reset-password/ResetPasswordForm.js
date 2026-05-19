"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      setError("Invalid reset link. Please request a new one.");
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters");
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
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

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>
            Account Recovery
          </p>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            Reset Password
          </h1>
        </div>

        <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "40px 32px" }}>

          {success ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#000">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>Password Reset!</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "8px" }}>
                Your password has been reset successfully.
              </p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>Redirecting to login...</p>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ background: "rgba(255,59,48,0.1)", border: "1px solid rgba(255,59,48,0.25)", borderRadius: "10px", padding: "14px 16px", marginBottom: "24px", fontSize: "13px", color: "#ff6b6b" }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                      placeholder="Min. 8 characters"
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px 16px", fontSize: "14px", color: "#fff", outline: "none" }}
                      onFocus={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.4)")}
                      onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      required
                      placeholder="Repeat password"
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px 16px", fontSize: "14px", color: "#fff", outline: "none" }}
                      onFocus={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.4)")}
                      onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !token || !email}
                    style={{ width: "100%", background: loading ? "rgba(255,255,255,0.5)" : "#fff", color: "#000", fontWeight: 700, fontSize: "15px", padding: "18px", borderRadius: "999px", border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </form>

              <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "24px" }}>
                <Link href="/forgot-password" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>
                  Request a new link
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
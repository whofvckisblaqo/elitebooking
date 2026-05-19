"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/");
    }
  };

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
      <div style={{ width: "100%", maxWidth: "460px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "12px",
            }}
          >
            Welcome Back
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Sign In
          </h1>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "40px 32px",
          }}
        >
          {error && (
            <div
              style={{
                background: "rgba(255,59,48,0.1)",
                border: "1px solid rgba(255,59,48,0.25)",
                borderRadius: "10px",
                padding: "14px 16px",
                marginBottom: "24px",
                fontSize: "13px",
                color: "#ff6b6b",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address</label>
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

              {/* Password */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                  <Link
                    href="/forgot-password"
                    style={{
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.4)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.4)")}
                  onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,0.1)")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  background: loading ? "rgba(255,255,255,0.5)" : "#fff",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "18px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  marginTop: "8px",
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.background = "rgba(255,255,255,0.88)";
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.background = "#fff";
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </div>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              margin: "28px 0",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Sign up link */}
          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Don't have an account?{" "}
            <Link
              href="/signup"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Create one free
            </Link>
          </p>

        </div>

        {/* Footer note */}
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "rgba(255,255,255,0.2)",
            marginTop: "24px",
          }}
        >
          By signing in you agree to our{" "}
          <Link href="/terms" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
            Terms
          </Link>{" "}
          &{" "}
          <Link href="/privacy" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
            Privacy Policy
          </Link>
        </p>

      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "rgba(255,255,255,0.5)",
  marginBottom: "8px",
  letterSpacing: "0.05em",
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
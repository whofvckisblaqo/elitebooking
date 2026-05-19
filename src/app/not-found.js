import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      {/* 404 number */}
      <p
        style={{
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontWeight: 800,
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1,
          marginBottom: "0",
          letterSpacing: "-0.04em",
          userSelect: "none",
        }}
      >
        404
      </p>

      {/* Content */}
      <div style={{ marginTop: "-20px", maxWidth: "480px" }}>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "16px",
          }}
        >
          Page Not Found
        </p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          This page doesn't exist
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}
        >
          The page you're looking for has been moved, deleted or never existed.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#000",
              fontWeight: 700,
              fontSize: "14px",
              padding: "16px 40px",
              borderRadius: "999px",
              textDecoration: "none",
              width: "100%",
              maxWidth: "280px",
              textAlign: "center",
            }}
          >
            Back to Home
          </Link>
          <Link
            href="/celebrities"
            style={{
              display: "inline-block",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 600,
              fontSize: "14px",
              padding: "16px 40px",
              borderRadius: "999px",
              textDecoration: "none",
              width: "100%",
              maxWidth: "280px",
              textAlign: "center",
            }}
          >
            Browse Celebrities
          </Link>
        </div>
      </div>
    </div>
  );
}
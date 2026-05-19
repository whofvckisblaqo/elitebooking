"use client";
import Link from "next/link";
import Image from "next/image";

export default function FooterCTA() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        paddingTop: "120px",
        paddingBottom: "120px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1800&q=80"
          alt="CTA Background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.82)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "20px",
          }}
        >
          Ready?
        </p>

        <h2
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Make Your Event<br />Unforgettable
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.75,
            maxWidth: "500px",
            margin: "0 auto 48px",
          }}
        >
          Join thousands of event organizers who trust EliteBooking
          to connect them with world-class talent.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <Link
            href="/celebrities"
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
            Browse Celebrities
          </Link>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              padding: "18px 48px",
              borderRadius: "999px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.7)";
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.3)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Create Free Account
          </Link>
        </div>

      </div>
    </section>
  );
}
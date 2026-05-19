"use client";
import Link from "next/link";

const links = [
  { label: "Celebrities", href: "/celebrities" },
  { label: "Categories", href: "/#categories" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact", href: "/contact" },
  { label: "Sign In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        paddingTop: "48px",
        paddingBottom: "48px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Top row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 800,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              EliteBooking
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em",
              }}
            >
              Book the world's finest talent
            </span>
          </div>

          {/* Nav Links */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
            }}
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            marginBottom: "32px",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            © {new Date().getFullYear()} EliteBooking. All rights reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link
              href="/privacy"
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.2)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
              }
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.2)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.2)")
              }
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
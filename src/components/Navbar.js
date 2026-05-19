"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const solid = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navLinks = [
    { label: "Celebrities", href: "/celebrities" },
    { label: "Categories", href: "/#categories" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        transition: "all 0.4s ease",
        background: solid ? "rgba(0,0,0,0.97)" : "transparent",
        backdropFilter: solid ? "blur(12px)" : "none",
        borderBottom: solid
          ? "1px solid rgba(255,255,255,0.07)"
          : "none",
      }}
    >
      {/* Main bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          <Image
            src="/logo.svg"
            alt="EliteBooking"
            width={130}
            height={40}
            priority
            style={{ width: "110px", height: "auto" }}
          />
        </Link>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "13px",
                  color:
                    pathname === link.href
                      ? "#fff"
                      : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontWeight: pathname === link.href ? 600 : 400,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    pathname === link.href
                      ? "#fff"
                      : "rgba(255,255,255,0.6)")
                }
              >
                {link.label}
              </Link>
            ))}
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                }
              >
                Admin
              </Link>
            )}
          </div>
        )}

        {/* Desktop Auth */}
        {!isMobile && (
          <div
            style={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                  }
                >
                  My Bookings
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#000",
                    background: "#fff",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.88)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                  }
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#000",
                    background: "#fff",
                    padding: "10px 22px",
                    borderRadius: "999px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.88)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "8px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "#fff",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "rotate(45deg) translateY(7px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "#fff",
                transition: "all 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "#fff",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-7px)"
                  : "none",
              }}
            />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          style={{
            overflow: "hidden",
            transition: "max-height 0.4s ease",
            maxHeight: menuOpen ? "600px" : "0",
            background: "rgba(0,0,0,0.97)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              padding: "24px 24px 32px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "15px",
                  color:
                    pathname === link.href
                      ? "#fff"
                      : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  fontWeight: pathname === link.href ? 600 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}

            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                }}
              >
                Admin
              </Link>
            )}

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                    }}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#000",
                      background: "#fff",
                      padding: "16px 24px",
                      borderRadius: "999px",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#000",
                      background: "#fff",
                      padding: "16px 24px",
                      borderRadius: "999px",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
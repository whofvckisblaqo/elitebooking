"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "zh-CN", label: "中文 (简体)" },
  { code: "zh-TW", label: "中文 (繁體)" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "tr", label: "Türkçe" },
  { code: "pl", label: "Polski" },
  { code: "nl", label: "Nederlands" },
  { code: "sv", label: "Svenska" },
  { code: "da", label: "Dansk" },
  { code: "no", label: "Norsk" },
  { code: "fi", label: "Suomi" },
  { code: "el", label: "Ελληνικά" },
  { code: "he", label: "עברית" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "th", label: "ภาษาไทย" },
  { code: "fa", label: "فارسی" },
  { code: "uk", label: "Українська" },
  { code: "ms", label: "Bahasa Melayu" },
  { code: "sw", label: "Kiswahili" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const langRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (code, label) => {
    const tryChange = (attempts = 0) => {
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event("change"));
        setCurrentLang(code === "en" ? "EN" : label.substring(0, 3).toUpperCase());
        setLangOpen(false);
        setMobileLangOpen(false);
      } else if (attempts < 10) {
        setTimeout(() => tryChange(attempts + 1), 300);
      }
    };
    tryChange();
  };

  const navLinks = [
    { label: "Celebrities", href: "/celebrities" },
    { label: "Categories", href: "/#categories" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Contact", href: "/contact" },
  ];

  const GlobeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );

  const ChevronIcon = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

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
        borderBottom: solid ? "1px solid rgba(255,255,255,0.07)" : "none",
      }}
    >
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
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
          <Image src="/logo.svg" alt="EliteBooking" width={130} height={40} priority style={{ width: "110px", height: "auto" }} />
        </Link>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{ fontSize: "13px", color: pathname === link.href ? "#fff" : "rgba(255,255,255,0.6)", textDecoration: "none", fontWeight: pathname === link.href ? 600 : 400, transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = pathname === link.href ? "#fff" : "rgba(255,255,255,0.6)")}
              >
                {link.label}
              </Link>
            ))}
            {session?.user?.role === "ADMIN" && (
              <Link href="/admin" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                Admin
              </Link>
            )}
          </div>
        )}

        {/* Desktop Right */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

            {/* Language Selector */}
            <div ref={langRef} style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
                }}
              >
                <GlobeIcon />
                {currentLang}
                <ChevronIcon />
              </button>

              {langOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 10px)",
                    width: "200px",
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    zIndex: 100,
                    maxHeight: "300px",
                    overflowY: "auto",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code, lang.label)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "11px 18px",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.7)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        display: "block",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            {session ? (
              <>
                <Link href="/profile" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  My Profile
                </Link>
                <Link href="/dashboard" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  My Bookings
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  style={{ fontSize: "13px", fontWeight: 700, color: "#000", background: "#fff", padding: "10px 22px", borderRadius: "999px", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.88)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  Sign In
                </Link>
                <Link href="/signup" style={{ fontSize: "13px", fontWeight: 700, color: "#000", background: "#fff", padding: "10px 22px", borderRadius: "999px", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.88)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
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
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", padding: "8px" }}
          >
            <span style={{ display: "block", width: "24px", height: "2px", background: "#fff", transition: "all 0.3s ease", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ display: "block", width: "24px", height: "2px", background: "#fff", transition: "all 0.3s ease", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "24px", height: "2px", background: "#fff", transition: "all 0.3s ease", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          style={{
            overflow: "hidden",
            transition: "max-height 0.4s ease",
            maxHeight: menuOpen ? "800px" : "0",
            background: "rgba(0,0,0,0.97)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "24px 24px 32px" }}>

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: "15px", color: pathname === link.href ? "#fff" : "rgba(255,255,255,0.6)", textDecoration: "none", fontWeight: pathname === link.href ? 600 : 400 }}
              >
                {link.label}
              </Link>
            ))}

            {session?.user?.role === "ADMIN" && (
              <Link href="/admin" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
                Admin
              </Link>
            )}

            {/* Mobile Language */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px" }}>
              <button
                onClick={() => setMobileLangOpen(!mobileLangOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "12px 18px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <GlobeIcon />
                {currentLang} — Change Language
                <ChevronIcon />
              </button>

              {mobileLangOpen && (
                <div
                  style={{
                    marginTop: "12px",
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    maxHeight: "220px",
                    overflowY: "auto",
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code, lang.label);
                        setMobileLangOpen(false);
                        setMenuOpen(false);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "13px 18px",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.7)",
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        cursor: "pointer",
                        display: "block",
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {session ? (
                <>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>My Profile</Link>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>My Bookings</Link>
                  <button
                    onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                    style={{ fontSize: "15px", fontWeight: 700, color: "#000", background: "#fff", padding: "16px 24px", borderRadius: "999px", border: "none", cursor: "pointer", textAlign: "center" }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Sign In</Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", fontWeight: 700, color: "#000", background: "#fff", padding: "16px 24px", borderRadius: "999px", textDecoration: "none", textAlign: "center" }}>
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
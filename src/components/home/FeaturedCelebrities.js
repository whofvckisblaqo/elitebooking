"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCelebrities() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/celebrities/featured")
      .then((res) => res.json())
      .then((data) => setCelebrities(data.celebrities || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && celebrities.length === 0) return null;

  return (
    <section
      style={{
        width: "100%",
        background: "#000",
        paddingTop: "80px",
        paddingBottom: "80px",
        paddingLeft: "24px",
        paddingRight: "24px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>
              Top Talent
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Featured Celebrities
            </h2>
          </div>
          <Link
            href="/celebrities"
            style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ borderRadius: "16px", overflow: "hidden", background: "rgba(255,255,255,0.05)", aspectRatio: "3/4", animation: "pulse 1.5s infinite" }} />
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
            {celebrities.map((celeb) => (
              <Link
                key={celeb._id}
                href={`/celebrities/${celeb.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{ borderRadius: "16px", overflow: "hidden", position: "relative", aspectRatio: "3/4", background: "#111", cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector("img").style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector("img").style.transform = "scale(1)";
                  }}
                >
                  <Image
                    src={celeb.image}
                    alt={celeb.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.6s ease" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />

                  {/* Verified badge */}
                  {celeb.verified && (
                    <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <circle cx="11" cy="11" r="11" fill="#1D9BF0" />
                        <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}

                  {/* Info */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>{celeb.name}</p>
                      {celeb.verified && (
                        <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                          <circle cx="11" cy="11" r="11" fill="#1D9BF0" />
                          <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>{celeb.category}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>From</span>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>${celeb.fee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
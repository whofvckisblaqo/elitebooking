"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  "All",
  "Music",
  "Sports",
  "Comedy",
  "Acting",
  "Tech",
  "Fashion",
];

export default function CelebritiesPage() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchCelebrities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (activeCategory !== "All") params.set("category", activeCategory);

      const res = await fetch(`/api/celebrities?${params.toString()}`);
      const data = await res.json();
      setCelebrities(data.celebrities || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCelebrities();
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCelebrities();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        paddingTop: "100px",
        overflowX: "hidden",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          background: "#000",
          paddingTop: "60px",
          paddingBottom: "60px",
          paddingLeft: "24px",
          paddingRight: "24px",
          marginBottom: "0",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Discover
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Browse Celebrities
          </h1>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "999px",
                padding: "0 20px",
                gap: "12px",
              }}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name, category or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  fontSize: "14px",
                  padding: "16px 0",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                background: "#fff",
                color: "#000",
                fontWeight: 700,
                fontSize: "14px",
                padding: "16px 28px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* ── CATEGORY FILTERS ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #eee",
          paddingTop: "24px",
          paddingBottom: "24px",
          paddingLeft: "24px",
          paddingRight: "24px",
          position: "sticky",
          top: "64px",
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "4px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                padding: "10px 22px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: activeCategory === cat ? "none" : "1px solid #e8e8e8",
                background: activeCategory === cat ? "#000" : "#fff",
                color: activeCategory === cat ? "#fff" : "#555",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── CELEBRITIES GRID ── */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 24px",
        }}
      >
        {loading ? (
          // Loading skeleton
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#f5f5f5",
                  border: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    height: "300px",
                    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
                <div style={{ padding: "20px" }}>
                  <div style={{ height: "16px", background: "#e8e8e8", borderRadius: "8px", marginBottom: "10px" }} />
                  <div style={{ height: "12px", background: "#e8e8e8", borderRadius: "8px", width: "60%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : celebrities.length === 0 ? (
          // Empty state
          <div
            style={{
              textAlign: "center",
              paddingTop: "80px",
              paddingBottom: "80px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#ccc" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#000",
                marginBottom: "10px",
              }}
            >
              No celebrities found
            </p>
            <p style={{ fontSize: "14px", color: "#999" }}>
              Try a different search or category
            </p>
          </div>
        ) : (
          // Celebrity cards
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {celebrities.map((celeb) => (
              <Link
                key={celeb._id}
                href={`/celebrities/${celeb.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#fff",
                    border: "1px solid #eee",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.12)";
                    e.currentTarget.style.border = "1px solid #ddd";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.border = "1px solid #eee";
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      height: "300px",
                      overflow: "hidden",
                      background: "#f5f5f5",
                    }}
                  >
                    <Image
                      src={celeb.image}
                      alt={celeb.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                    {/* Available badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        right: "14px",
                        background: celeb.available ? "#000" : "#999",
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "5px 12px",
                        borderRadius: "999px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {celeb.available ? "Available" : "Unavailable"}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "20px 22px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      <div>
                       <p
  style={{
    fontSize: "17px",
    fontWeight: 700,
    color: "#000",
    marginBottom: "4px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  }}
>
  {celeb.name}
  {celeb.verified && (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="11" fill="#1D9BF0" />
      <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )}
</p>
                        <p style={{ fontSize: "13px", color: "#999" }}>
                          {celeb.location}
                        </p>
                      </div>
                      <span
                        style={{
                          background: "#f5f5f5",
                          color: "#000",
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "5px 12px",
                          borderRadius: "999px",
                          flexShrink: 0,
                          border: "1px solid #eee",
                        }}
                      >
                        {celeb.category}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "14px",
                        borderTop: "1px solid #f0f0f0",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: "11px", color: "#bbb", marginBottom: "2px" }}>
                          Booking fee from
                        </p>
                        <p
                          style={{
                            fontSize: "17px",
                            fontWeight: 800,
                            color: "#000",
                          }}
                        >
                          ${celeb.fee.toLocaleString()}
                        </p>
                      </div>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "#000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </main>
  );
}
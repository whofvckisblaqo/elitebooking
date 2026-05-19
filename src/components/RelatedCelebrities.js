"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RelatedCelebrities({ category, currentSlug }) {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category || !currentSlug) return;
    fetch(`/api/celebrities/related?category=${category}&exclude=${currentSlug}`)
      .then((res) => res.json())
      .then((data) => setCelebrities(data.celebrities || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, currentSlug]);

  if (!loading && celebrities.length === 0) return null;

  return (
    <section
      style={{
        width: "100%",
        background: "#f9f9f9",
        borderTop: "1px solid #eee",
        paddingTop: "60px",
        paddingBottom: "60px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#999",
                marginBottom: "8px",
              }}
            >
              Similar Talent
            </p>
            <h2
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 800,
                color: "#000",
                letterSpacing: "-0.02em",
              }}
            >
              Related Celebrities
            </h2>
          </div>
          <Link
            href={`/celebrities?category=${category}`}
            style={{
              fontSize: "13px",
              color: "#999",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
          >
            View all in {category} →
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#eee",
                  aspectRatio: "3/4",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))}
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {celebrities.map((celeb) => (
              <Link
                key={celeb._id}
                href={`/celebrities/${celeb.slug}`}
                style={{ textDecoration: "none", display: "block" }}
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
                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.1)";
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
                      aspectRatio: "3/4",
                      background: "#f5f5f5",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={celeb.image}
                      alt={celeb.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "top",
                        transition: "transform 0.5s ease",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                      }}
                    />

                    {/* Verified badge */}
                    {celeb.verified && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                          <circle cx="11" cy="11" r="11" fill="#1D9BF0" />
                          <path
                            d="M6.5 11.5L9.5 14.5L15.5 8.5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Name overlay */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          marginBottom: "2px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {celeb.name}
                        </p>
                        {celeb.verified && (
                          <svg width="14" height="14" viewBox="0 0 22 22" fill="none">
                            <circle cx="11" cy="11" r="11" fill="#1D9BF0" />
                            <path
                              d="M6.5 11.5L9.5 14.5L15.5 8.5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {celeb.category}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div
                    style={{
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#bbb",
                          marginBottom: "2px",
                        }}
                      >
                        From
                      </p>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: 800,
                          color: "#000",
                        }}
                      >
                        ${celeb.fee.toLocaleString()}
                      </p>
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
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
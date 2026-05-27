"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import RelatedCelebrities from "@/components/RelatedCelebrities";

const standardPackages = [
  "Meet & Greet", "VIP Meet & Greet", "Private Concert", "Public Concert",
  "Corporate Event", "Wedding Appearance", "Birthday Appearance",
  "Brand Ambassador", "Product Launch", "Social Media Shoutout",
  "Video Message", "Live Stream Appearance", "Charity Event", "Award Show",
  "Speaking Engagement", "Panel Discussion", "Autograph Session",
  "Photo Session", "Membership Card", "Fan Experience Package",
  "Backstage Pass", "Private Dinner", "Sports Clinic", "Masterclass",
  "Podcast/Interview", "Film/TV Appearance", "Music Collaboration",
  "Festival Performance", "Private Party", "Club Appearance",
  "Golf Outing", "lunch/Dinner Date",
];

export default function CelebrityProfilePage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [celebrity, setCelebrity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("about");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [bookingForm, setBookingForm] = useState({ eventDate: "", message: "" });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCelebrity();
  }, [slug]);

  const fetchCelebrity = async () => {
    try {
      const res = await fetch(`/api/celebrities/${slug}`);
      const data = await res.json();
      setCelebrity(data.celebrity);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!session) return router.push("/login");
    if (!selectedPackage) return setError("Please select a booking package");
    setBookingLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          celebrityId: celebrity._id,
          eventType: selectedPackage,
          eventDate: bookingForm.eventDate,
          message: bookingForm.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        router.push("/booking-success");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const getPackageFee = (pkg) => {
    if (!celebrity?.packageFees) return null;
    const fee = celebrity.packageFees[pkg];
    return fee ? `$${Number(fee).toLocaleString()}` : null;
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "68px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #eee", borderTop: "2px solid #000", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!celebrity) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "68px" }}>
        <p style={{ fontSize: "20px", fontWeight: 700, color: "#000", marginBottom: "12px" }}>Celebrity not found</p>
        <Link href="/celebrities" style={{ fontSize: "14px", color: "#fff", background: "#000", padding: "14px 28px", borderRadius: "999px", textDecoration: "none" }}>
          Back to Celebrities
        </Link>
      </div>
    );
  }

  const sm = celebrity.socialMedia || {};

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    background: "#f5f5f5",
    border: "1px solid #eee",
    borderRadius: "999px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 600,
    color: "#000",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", paddingTop: "68px" }}>

      {/* HERO */}
      <div style={{ position: "relative", width: "100%", height: "clamp(320px, 50vw, 520px)", background: "#000", overflow: "hidden" }}>
        <Image
          src={celebrity.image}
          alt={celebrity.name}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.6 }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
            <div>
              {/* Badges */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#000", background: "#fff", padding: "4px 14px", borderRadius: "999px" }}>
                  {celebrity.category}
                </span>
                {celebrity.verified && (
                  <span title="Verified Celebrity" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="11" fill="#1D9BF0" />
                      <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
                {celebrity.featured && (
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 14px", borderRadius: "999px", background: "rgba(234,179,8,0.2)", color: "#fbbf24", border: "1px solid rgba(234,179,8,0.3)" }}>
                    ⭐ Featured
                  </span>
                )}
                <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 14px", borderRadius: "999px", background: celebrity.available ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.1)", color: celebrity.available ? "#22c55e" : "rgba(255,255,255,0.5)", border: celebrity.available ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.1)" }}>
                  {celebrity.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "10px" }}>
                {celebrity.name}
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>📍 {celebrity.location}</span>
                {celebrity.nationality && (
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>🌍 {celebrity.nationality}</span>
                )}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>Booking fee from</p>
              <p style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                ${celebrity.fee.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <div className="profile-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 380px", gap: "32px", alignItems: "start" }}>

          {/* LEFT */}
          <div>
            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #eee", marginBottom: "32px" }}>
              {["about", "packages"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{ padding: "12px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", background: "none", color: tab === t ? "#000" : "#999", borderBottom: tab === t ? "2px solid #000" : "2px solid transparent", marginBottom: "-1px", textTransform: "capitalize", transition: "all 0.2s ease" }}
                >
                  {t === "packages" ? `Packages (${celebrity.packages?.length || 0})` : "About"}
                </button>
              ))}
            </div>

            {/* ABOUT */}
            {tab === "about" && (
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#000", marginBottom: "16px" }}>About {celebrity.name}</h2>
                <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.8, marginBottom: "32px" }}>{celebrity.bio}</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "32px" }}>
                  {[
                    { label: "Category", value: celebrity.category },
                    { label: "Location", value: celebrity.location },
                    { label: "Nationality", value: celebrity.nationality || "N/A" },
                    { label: "Base Fee", value: `$${celebrity.fee.toLocaleString()}` },
                    { label: "Status", value: celebrity.available ? "Available" : "Unavailable" },
                    { label: "Languages", value: celebrity.languages?.length > 0 ? celebrity.languages.join(", ") : "N/A" },
                  ].map((item) => (
                    <div key={item.label} style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "12px", padding: "16px 20px" }}>
                      <p style={{ fontSize: "11px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>{item.label}</p>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#000" }}>{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Social Media */}
                {(sm.instagram || sm.twitter || sm.youtube || sm.tiktok) && (
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#000", marginBottom: "16px" }}>Social Media</h3>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      {sm.instagram && (
                        <a href={`https://instagram.com/${sm.instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                          📸 Instagram
                        </a>
                      )}
                      {sm.twitter && (
                        <a href={`https://twitter.com/${sm.twitter.replace("@", "")}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                          🐦 Twitter
                        </a>
                      )}
                      {sm.youtube && (
                        <a href={sm.youtube.startsWith("http") ? sm.youtube : `https://youtube.com/${sm.youtube}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                          ▶️ YouTube
                        </a>
                      )}
                      {sm.tiktok && (
                        <a href={`https://tiktok.com/${sm.tiktok.replace("@", "")}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                          🎵 TikTok
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PACKAGES */}
            {tab === "packages" && (
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>Available Booking Packages</h2>
                <p style={{ fontSize: "14px", color: "#999", marginBottom: "24px" }}>Select a package from the booking form to get started.</p>

                {!celebrity.packages || celebrity.packages.length === 0 ? (
                  <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "16px", padding: "48px 24px", textAlign: "center" }}>
                    <p style={{ fontSize: "16px", color: "#999" }}>No packages listed yet.</p>
                  </div>
                ) : (() => {
                  const standard = celebrity.packages.filter((p) => standardPackages.includes(p));
                  const special = celebrity.packages.filter((p) => !standardPackages.includes(p));
                  const PackageRow = ({ pkg }) => {
                    const fee = getPackageFee(pkg);
                    const isSelected = selectedPackage === pkg;
                    return (
                      <div
                        onClick={() => setSelectedPackage(pkg)}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: isSelected ? "#000" : "#f9f9f9", border: `1px solid ${isSelected ? "#000" : "#eee"}`, borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease", gap: "12px" }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: isSelected ? "none" : "2px solid #ddd", background: isSelected ? "#fff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "11px", fontWeight: 700, color: "#000" }}>
                            {isSelected ? "✓" : ""}
                          </div>
                          <span style={{ fontSize: "14px", fontWeight: 600, color: isSelected ? "#fff" : "#000" }}>{pkg}</span>
                        </div>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: isSelected ? "#fff" : "#000", flexShrink: 0 }}>
                          {fee || `$${celebrity.fee.toLocaleString()}`}
                        </span>
                      </div>
                    );
                  };
                  return (
                    <div>
                      {standard.length > 0 && (
                        <div style={{ marginBottom: special.length > 0 ? "28px" : "0" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {standard.map((pkg) => <PackageRow key={pkg} pkg={pkg} />)}
                          </div>
                        </div>
                      )}
                      {special.length > 0 && (
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: "#fff", background: "#000", padding: "4px 12px", borderRadius: "999px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                              Special Bookings
                            </span>
                            <div style={{ flex: 1, height: "1px", background: "#eee" }} />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {special.map((pkg) => <PackageRow key={pkg} pkg={pkg} />)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* RIGHT — Booking Form */}
          <div style={{ position: "sticky", top: "88px" }}>
            <div style={{ background: "#000", borderRadius: "20px", padding: "28px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>Book {celebrity.name}</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "24px" }}>Fill in the details to send a booking request.</p>

              {!celebrity.available ? (
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>Currently unavailable for bookings.</p>
                </div>
              ) : bookingSuccess ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#000">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>Booking Request Sent!</p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginBottom: "20px" }}>We will notify you once approved.</p>
                  <Link href="/dashboard" style={{ display: "inline-block", background: "#fff", color: "#000", fontWeight: 700, fontSize: "13px", padding: "12px 24px", borderRadius: "999px", textDecoration: "none" }}>
                    View My Bookings
                  </Link>
                </div>
              ) : !session ? (
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>Sign in to book this celebrity.</p>
                  <Link href="/login" style={{ display: "block", background: "#fff", color: "#000", fontWeight: 700, fontSize: "14px", padding: "16px", borderRadius: "999px", textDecoration: "none", textAlign: "center" }}>
                    Sign In to Book
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleBooking}>
                  {error && (
                    <div style={{ background: "rgba(255,59,48,0.1)", border: "1px solid rgba(255,59,48,0.25)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", fontSize: "13px", color: "#ff6b6b" }}>
                      {error}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Select Package
                      </label>
                      <select
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        required
                        style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px 16px", fontSize: "14px", color: "#fff", outline: "none", cursor: "pointer" }}
                      >
                        <option value="">Choose a package...</option>
                        {(() => {
                          const standard = celebrity.packages?.filter((p) => standardPackages.includes(p)) || [];
                          const special = celebrity.packages?.filter((p) => !standardPackages.includes(p)) || [];
                          return (
                            <>
                              {standard.map((pkg) => {
                                const fee = getPackageFee(pkg);
                                return (
                                  <option key={pkg} value={pkg} style={{ background: "#111" }}>
                                    {pkg}{fee ? ` — ${fee}` : ""}
                                  </option>
                                );
                              })}
                              {special.length > 0 && (
                                <optgroup label="— Special Bookings —" style={{ background: "#111", color: "rgba(255,255,255,0.5)" }}>
                                  {special.map((pkg) => {
                                    const fee = getPackageFee(pkg);
                                    return (
                                      <option key={pkg} value={pkg} style={{ background: "#111" }}>
                                        {pkg}{fee ? ` — ${fee}` : ""}
                                      </option>
                                    );
                                  })}
                                </optgroup>
                              )}
                            </>
                          );
                        })()}
                      </select>
                    </div>

                    {selectedPackage && (
                      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{selectedPackage}</span>
                        <span style={{ fontSize: "15px", fontWeight: 800, color: "#fff" }}>
                          {getPackageFee(selectedPackage) || `$${celebrity.fee.toLocaleString()}`}
                        </span>
                      </div>
                    )}

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Event Date
                      </label>
                      <input
                        type="date"
                        value={bookingForm.eventDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px 16px", fontSize: "14px", color: "#fff", outline: "none", colorScheme: "dark" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Additional Details
                      </label>
                      <textarea
                        value={bookingForm.message}
                        onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                        required
                        rows={4}
                        placeholder="Tell us about your event and any special requirements..."
                        style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "14px 16px", fontSize: "14px", color: "#fff", outline: "none", resize: "vertical", minHeight: "100px" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      style={{ width: "100%", background: bookingLoading ? "rgba(255,255,255,0.5)" : "#fff", color: "#000", fontWeight: 700, fontSize: "15px", padding: "18px", borderRadius: "999px", border: "none", cursor: bookingLoading ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
                    >
                      {bookingLoading ? "Sending Request..." : "Send Booking Request"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Related Celebrities */}
      <RelatedCelebrities
        category={celebrity.category}
        currentSlug={celebrity.slug}
      />

      <style>{`
        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
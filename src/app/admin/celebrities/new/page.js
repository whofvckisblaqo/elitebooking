"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categories = [
  "Music", "Sports", "Comedy", "Acting", "Tech",
  "Fashion", "Politics", "Business", "Social Media", "Gaming",
];

const bookingPackages = [
  "Meet & Greet",
  "VIP Meet & Greet",
  "Private Concert",
  "Public Concert",
  "Corporate Event",
  "Wedding Appearance",
  "Birthday Appearance",
  "Brand Ambassador",
  "Product Launch",
  "Social Media Shoutout",
  "Video Message",
  "Live Stream Appearance",
  "Charity Event",
  "Award Show",
  "Speaking Engagement",
  "Panel Discussion",
  "Autograph Session",
  "Photo Session",
  "Membership Card",
  "Fan Experience Package",
  "Backstage Pass",
  "Private Dinner",
  "Sports Clinic",
  "Masterclass",
  "Podcast/Interview",
  "Film/TV Appearance",
  "Music Collaboration",
  "Festival Performance",
  "Private Party",
  "Club Appearance",
  "Golf Outing",
  "lunch/Dinner Date",
];

const allLanguages = [
  "English", "Spanish", "French", "Portuguese", "Arabic",
  "Mandarin", "Hindi", "Swahili", "German", "Italian",
  "Japanese", "Korean", "Russian", "Dutch", "Turkish",
];

export default function AddCelebrityPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    category: "",
    bio: "",
    fee: "",
    location: "",
    nationality: "",
    available: true,
    verified: false,
    featured: false,
    image: "",
    packages: [],
    packageFees: {},
    languages: [],
    socialMedia: {
      instagram: "",
      twitter: "",
      youtube: "",
      tiktok: "",
    },
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSocialMedia = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [name]: value },
    }));
  };

  const togglePackage = (pkg) => {
    setForm((prev) => {
      const exists = prev.packages.includes(pkg);
      const newPackages = exists
        ? prev.packages.filter((p) => p !== pkg)
        : [...prev.packages, pkg];
      const newFees = { ...prev.packageFees };
      if (exists) delete newFees[pkg];
      return { ...prev, packages: newPackages, packageFees: newFees };
    });
  };

  const handlePackageFee = (pkg, value) => {
    setForm((prev) => ({
      ...prev,
      packageFees: { ...prev.packageFees, [pkg]: value },
    }));
  };

  const toggleLanguage = (lang) => {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return form.image;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.url;
    } catch (err) {
      throw new Error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let imageUrl = form.image;
      if (imageFile) imageUrl = await uploadImage();
      if (!imageUrl) {
        setError("Please provide an image");
        setLoading(false);
        return;
      }
      if (form.packages.length === 0) {
        setError("Please select at least one booking package");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/admin/celebrities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: imageUrl,
          fee: Number(form.fee),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        router.push("/admin/celebrities");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return null;
  if (session?.user?.role !== "ADMIN") { router.push("/"); return null; }

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", paddingTop: "68px" }}>

      {/* Header */}
      <div style={{ background: "#000", paddingTop: "40px", paddingBottom: "40px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Admin Panel</p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Add Celebrity</h1>
          </div>
          <Link href="/admin/celebrities" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>← Back</Link>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>
        <form onSubmit={handleSubmit}>

          {error && (
            <div style={{ background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)", borderRadius: "10px", padding: "14px 16px", marginBottom: "24px", fontSize: "13px", color: "#ff3b30" }}>
              {error}
            </div>
          )}

          {/* ── STATUS BADGES ── */}
          <div style={cardStyle}>
            <h2 style={sectionTitle}>Profile Status</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Verified */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background: form.verified ? "#000" : "#f9f9f9",
                  border: `1px solid ${form.verified ? "#000" : "#eee"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setForm((prev) => ({ ...prev, verified: !prev.verified }))}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>✅</span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: form.verified ? "#fff" : "#000" }}>
                      Verified Celebrity
                    </p>
                    <p style={{ fontSize: "12px", color: form.verified ? "rgba(255,255,255,0.5)" : "#999", marginTop: "2px" }}>
                      Show a verification badge on their profile
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    width: "44px",
                    height: "24px",
                    borderRadius: "999px",
                    background: form.verified ? "#fff" : "#ddd",
                    position: "relative",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: form.verified ? "23px" : "3px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: form.verified ? "#000" : "#fff",
                      transition: "all 0.2s ease",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>
              </div>

              {/* Featured */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background: form.featured ? "#000" : "#f9f9f9",
                  border: `1px solid ${form.featured ? "#000" : "#eee"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setForm((prev) => ({ ...prev, featured: !prev.featured }))}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>⭐</span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: form.featured ? "#fff" : "#000" }}>
                      Featured on Homepage
                    </p>
                    <p style={{ fontSize: "12px", color: form.featured ? "rgba(255,255,255,0.5)" : "#999", marginTop: "2px" }}>
                      Show this celebrity in the homepage featured section
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    width: "44px",
                    height: "24px",
                    borderRadius: "999px",
                    background: form.featured ? "#fff" : "#ddd",
                    position: "relative",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: form.featured ? "23px" : "3px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: form.featured ? "#000" : "#fff",
                      transition: "all 0.2s ease",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>
              </div>

              {/* Available */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background: form.available ? "#000" : "#f9f9f9",
                  border: `1px solid ${form.available ? "#000" : "#eee"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setForm((prev) => ({ ...prev, available: !prev.available }))}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>📅</span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: form.available ? "#fff" : "#000" }}>
                      Available for Bookings
                    </p>
                    <p style={{ fontSize: "12px", color: form.available ? "rgba(255,255,255,0.5)" : "#999", marginTop: "2px" }}>
                      Allow users to send booking requests
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    width: "44px",
                    height: "24px",
                    borderRadius: "999px",
                    background: form.available ? "#fff" : "#ddd",
                    position: "relative",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: form.available ? "23px" : "3px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: form.available ? "#000" : "#fff",
                      transition: "all 0.2s ease",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ── BASIC INFO ── */}
          <div style={cardStyle}>
            <h2 style={sectionTitle}>Basic Information</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Full Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Beyoncé" style={inputStyle} onFocus={(e) => (e.target.style.border = "1px solid #000")} onBlur={(e) => (e.target.style.border = "1px solid #eee")} />
              </div>

              <div>
                <label style={labelStyle}>Category *</label>
                <select name="category" value={form.category} onChange={handleChange} required style={{ ...inputStyle, cursor: "pointer" }} onFocus={(e) => (e.target.style.border = "1px solid #000")} onBlur={(e) => (e.target.style.border = "1px solid #eee")}>
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Nationality</label>
                <input type="text" name="nationality" value={form.nationality} onChange={handleChange} placeholder="e.g. American" style={inputStyle} onFocus={(e) => (e.target.style.border = "1px solid #000")} onBlur={(e) => (e.target.style.border = "1px solid #eee")} />
              </div>

              <div>
                <label style={labelStyle}>Location *</label>
                <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Los Angeles, USA" style={inputStyle} onFocus={(e) => (e.target.style.border = "1px solid #000")} onBlur={(e) => (e.target.style.border = "1px solid #eee")} />
              </div>

              <div>
                <label style={labelStyle}>Base Booking Fee (USD) *</label>
                <input type="number" name="fee" value={form.fee} onChange={handleChange} required placeholder="e.g. 50000" min="0" style={inputStyle} onFocus={(e) => (e.target.style.border = "1px solid #000")} onBlur={(e) => (e.target.style.border = "1px solid #eee")} />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Bio *</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} required rows={5} placeholder="Write a detailed bio about this celebrity..." style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }} onFocus={(e) => (e.target.style.border = "1px solid #000")} onBlur={(e) => (e.target.style.border = "1px solid #eee")} />
              </div>

            </div>
          </div>

          {/* ── IMAGE ── */}
          <div style={cardStyle}>
            <h2 style={sectionTitle}>Celebrity Image</h2>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap" }}>
              <label htmlFor="imageUpload" style={{ width: "140px", height: "140px", borderRadius: "12px", border: "2px dashed #e0e0e0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", background: "#f9f9f9", flexShrink: 0 }}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <>
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#ccc"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span style={{ fontSize: "11px", color: "#ccc", marginTop: "8px" }}>Upload Photo</span>
                  </>
                )}
                <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              </label>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <p style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>Or paste an image URL</p>
                <input type="url" name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/image.jpg" style={inputStyle} onFocus={(e) => (e.target.style.border = "1px solid #000")} onBlur={(e) => (e.target.style.border = "1px solid #eee")} />
              </div>
            </div>
          </div>

          {/* ── BOOKING PACKAGES WITH FEES ── */}
          <div style={cardStyle}>
            <h2 style={sectionTitle}>Booking Packages & Fees *</h2>
            <p style={{ fontSize: "13px", color: "#999", marginBottom: "20px" }}>
              Select packages and set individual fees for each. Leave fee empty to use base booking fee.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {bookingPackages.map((pkg) => {
                const selected = form.packages.includes(pkg);
                return (
                  <div
                    key={pkg}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 18px",
                      borderRadius: "12px",
                      border: `1px solid ${selected ? "#000" : "#eee"}`,
                      background: selected ? "#000" : "#f9f9f9",
                      transition: "all 0.2s ease",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Toggle */}
                    <button
                      type="button"
                      onClick={() => togglePackage(pkg)}
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "6px",
                        border: selected ? "none" : "2px solid #ddd",
                        background: selected ? "#fff" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#000",
                        padding: 0,
                      }}
                    >
                      {selected ? "✓" : ""}
                    </button>

                    {/* Package name */}
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: selected ? "#fff" : "#000",
                        flex: 1,
                        cursor: "pointer",
                      }}
                      onClick={() => togglePackage(pkg)}
                    >
                      {pkg}
                    </span>

                    {/* Fee input — only when selected */}
                    {selected && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>$</span>
                        <input
                          type="number"
                          placeholder="Fee"
                          min="0"
                          value={form.packageFees[pkg] || ""}
                          onChange={(e) => handlePackageFee(pkg, e.target.value)}
                          style={{
                            width: "110px",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                            padding: "8px 12px",
                            fontSize: "13px",
                            color: "#fff",
                            outline: "none",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {form.packages.length > 0 && (
              <p style={{ fontSize: "12px", color: "#999", marginTop: "16px" }}>
                {form.packages.length} package{form.packages.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {/* ── LANGUAGES ── */}
          <div style={cardStyle}>
            <h2 style={sectionTitle}>Languages Spoken</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {allLanguages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: form.languages.includes(lang) ? "none" : "1px solid #e8e8e8",
                    background: form.languages.includes(lang) ? "#000" : "#fff",
                    color: form.languages.includes(lang) ? "#fff" : "#555",
                  }}
                >
                  {form.languages.includes(lang) ? "✓ " : ""}{lang}
                </button>
              ))}
            </div>
          </div>

          {/* ── SOCIAL MEDIA ── */}
          <div style={cardStyle}>
            <h2 style={sectionTitle}>Social Media</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {[
                { name: "instagram", placeholder: "@username", icon: "📸" },
                { name: "twitter", placeholder: "@username", icon: "🐦" },
                { name: "youtube", placeholder: "Channel URL", icon: "▶️" },
                { name: "tiktok", placeholder: "@username", icon: "🎵" },
              ].map((social) => (
                <div key={social.name}>
                  <label style={labelStyle}>
                    {social.icon} {social.name.charAt(0).toUpperCase() + social.name.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={social.name}
                    value={form.socialMedia[social.name]}
                    onChange={handleSocialMedia}
                    placeholder={social.placeholder}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.border = "1px solid #000")}
                    onBlur={(e) => (e.target.style.border = "1px solid #eee")}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── SUBMIT ── */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="submit"
              disabled={loading || uploading}
              style={{
                flex: 1,
                background: loading || uploading ? "#ccc" : "#000",
                color: "#fff",
                fontWeight: 700,
                fontSize: "15px",
                padding: "18px",
                borderRadius: "999px",
                border: "none",
                cursor: loading || uploading ? "not-allowed" : "pointer",
                minWidth: "160px",
                transition: "all 0.2s ease",
              }}
            >
              {uploading ? "Uploading Image..." : loading ? "Adding Celebrity..." : "Add Celebrity"}
            </button>
            <Link
              href="/admin/celebrities"
              style={{ flex: 1, background: "#f5f5f5", color: "#000", fontWeight: 600, fontSize: "15px", padding: "18px", borderRadius: "999px", textDecoration: "none", textAlign: "center", minWidth: "160px", border: "1px solid #eee" }}
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "20px",
  padding: "32px",
  marginBottom: "24px",
};

const sectionTitle = {
  fontSize: "16px",
  fontWeight: 800,
  color: "#000",
  marginBottom: "20px",
  letterSpacing: "-0.01em",
};

const labelStyle = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "#555",
  marginBottom: "8px",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const inputStyle = {
  width: "100%",
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: "10px",
  padding: "14px 16px",
  fontSize: "14px",
  color: "#000",
  outline: "none",
  transition: "border 0.2s ease",
};
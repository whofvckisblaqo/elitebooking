"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) fetchBookings();
  }, [session]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings/user");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = bookings.filter((b) => {
    if (activeTab === "all") return true;
    return b.status.toLowerCase() === activeTab;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    approved: bookings.filter((b) => b.status === "APPROVED").length,
    rejected: bookings.filter((b) => b.status === "REJECTED").length,
  };

  const statusColor = (status) => {
    if (status === "APPROVED") return { bg: "rgba(34,197,94,0.1)", color: "#22c55e", border: "rgba(34,197,94,0.2)" };
    if (status === "REJECTED") return { bg: "rgba(255,59,48,0.1)", color: "#ff6b6b", border: "rgba(255,59,48,0.2)" };
    return { bg: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "rgba(255,255,255,0.1)" };
  };

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTop: "2px solid #fff", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", paddingTop: "68px" }}>

      {/* Top Header */}
      <div style={{ background: "#000", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>
                My Account
              </p>
              <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
                Welcome back, {session?.user?.name?.split(" ")[0]} 👋
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>
                {session?.user?.email}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link
                href="/celebrities"
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#000",
                  background: "#fff",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  textDecoration: "none",
                }}
              >
                Browse Celebrities
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "12px 24px",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", paddingTop: "32px", paddingBottom: "32px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
            {[
              { label: "Total Bookings", value: stats.total, icon: "📋" },
              { label: "Pending", value: stats.pending, icon: "⏳" },
              { label: "Approved", value: stats.approved, icon: "✅" },
              { label: "Rejected", value: stats.rejected, icon: "❌" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "#f9f9f9",
                  border: "1px solid #eee",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "24px" }}>{stat.icon}</span>
                <div>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: "#000", lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {["all", "pending", "approved", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                border: activeTab === tab ? "none" : "1px solid #e8e8e8",
                background: activeTab === tab ? "#000" : "#fff",
                color: activeTab === tab ? "#fff" : "#555",
                textTransform: "capitalize",
                transition: "all 0.2s ease",
              }}
            >
              {tab === "all" ? `All (${stats.total})` : `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${stats[tab]})`}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ height: "100px", background: "#f0f0f0", borderRadius: "14px", animation: "pulse 1.5s infinite" }} />
            ))}
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              background: "#fff",
              borderRadius: "20px",
              border: "1px solid #eee",
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
                margin: "0 auto 20px",
              }}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#ccc">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>
              No bookings yet
            </p>
            <p style={{ fontSize: "14px", color: "#999", marginBottom: "28px" }}>
              Start by browsing our world-class celebrities
            </p>
            <Link
              href="/celebrities"
              style={{
                display: "inline-block",
                background: "#000",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                padding: "16px 36px",
                borderRadius: "999px",
                textDecoration: "none",
              }}
            >
              Browse Celebrities
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filtered.map((booking) => {
              const sc = statusColor(booking.status);
              return (
                <div
                  key={booking._id}
                  style={{
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  {/* Celebrity info */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        background: "#f5f5f5",
                        border: "1px solid #eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0,
                      }}
                    >
                      🎤
                    </div>
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#000", marginBottom: "4px" }}>
                        {booking.celebrity?.name || "Celebrity"}
                      </p>
                      <p style={{ fontSize: "13px", color: "#999" }}>
                        {booking.eventType} · {new Date(booking.eventDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                  </div>

                  {/* Right side */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <p style={{ fontSize: "12px", color: "#bbb" }}>
                      Booked {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        padding: "6px 16px",
                        borderRadius: "999px",
                        background: sc.bg,
                        color: sc.color,
                        border: `1px solid ${sc.border}`,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
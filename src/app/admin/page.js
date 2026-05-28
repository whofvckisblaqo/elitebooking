"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session?.user?.role !== "ADMIN") router.push("/");
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") fetchStats();
  }, [session]);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data.stats);
      setRecentBookings(data.recentBookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statusStyle = (s) => {
    if (s === "APPROVED") return { bg: "rgba(34,197,94,0.1)", color: "#22c55e" };
    if (s === "REJECTED") return { bg: "rgba(255,59,48,0.1)", color: "#ff6b6b" };
    return { bg: "rgba(0,0,0,0.05)", color: "#999" };
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #eee", borderTop: "2px solid #000", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", paddingTop: "68px" }}>

      {/* Header */}
      <div style={{ background: "#000", paddingTop: "40px", paddingBottom: "40px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Admin Panel</p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Dashboard</h1>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/admin/celebrities/new" style={{ fontSize: "13px", fontWeight: 700, color: "#000", background: "#fff", padding: "12px 24px", borderRadius: "999px", textDecoration: "none" }}>
              + Add Celebrity
            </Link>
            <Link href="/admin/bookings" style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px 24px", borderRadius: "999px", textDecoration: "none" }}>
              Manage Bookings
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Main Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {[
            { label: "Total Users", value: stats?.totalUsers ?? 0, icon: "👥", href: "/admin/users" },
            { label: "Total Celebrities", value: stats?.totalCelebrities ?? 0, icon: "🌟", href: "/admin/celebrities" },
            { label: "Total Bookings", value: stats?.totalBookings ?? 0, icon: "📋", href: "/admin/bookings" },
            { label: "Total Reviews", value: stats?.totalReviews ?? 0, icon: "⭐", href: "#" },
          ].map((stat) => (
            <Link key={stat.label} href={stat.href} style={{ textDecoration: "none" }}>
              <div
                style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", gap: "16px", transition: "all 0.2s ease", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid #000"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid #eee"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ fontSize: "28px" }}>{stat.icon}</span>
                <div>
                  <p style={{ fontSize: "28px", fontWeight: 800, color: "#000", lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>{stat.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Booking Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {[
            { label: "Pending Bookings", value: stats?.pendingBookings ?? 0, icon: "⏳", color: "#f59e0b", href: "/admin/bookings" },
            { label: "Approved Bookings", value: stats?.approvedBookings ?? 0, icon: "✅", color: "#22c55e", href: "/admin/bookings" },
            { label: "Rejected Bookings", value: stats?.rejectedBookings ?? 0, icon: "❌", color: "#ff6b6b", href: "/admin/bookings" },
            { label: "Featured Celebs", value: stats?.featuredCelebrities ?? 0, icon: "💫", color: "#a855f7", href: "/admin/celebrities" },
            { label: "Available Celebs", value: stats?.availableCelebrities ?? 0, icon: "📅", color: "#3b82f6", href: "/admin/celebrities" },
          ].map((stat) => (
            <Link key={stat.label} href={stat.href} style={{ textDecoration: "none" }}>
              <div
                style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "20px 24px", display: "flex", alignItems: "center", gap: "14px", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid #000"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid #eee"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ fontSize: "24px" }}>{stat.icon}</span>
                <div>
                  <p style={{ fontSize: "24px", fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>{stat.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {[
            { label: "Manage Celebrities", desc: "Add, edit or remove celebrities", href: "/admin/celebrities", icon: "🌟" },
            { label: "Manage Bookings", desc: "Approve or reject booking requests", href: "/admin/bookings", icon: "📋" },
            { label: "Manage Users", desc: "View all registered users", href: "/admin/users", icon: "👥" },
            { label: "Send Email", desc: "Email users or approved clients", href: "/admin/email", icon: "✉️" },
          ].map((action) => (
            <Link key={action.label} href={action.href} style={{ textDecoration: "none" }}>
              <div
                style={{ background: "#000", borderRadius: "16px", padding: "28px", display: "flex", alignItems: "center", gap: "20px", cursor: "pointer", transition: "all 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#000")}
              >
                <span style={{ fontSize: "32px" }}>{action.icon}</span>
                <div>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{action.label}</p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{action.desc}</p>
                </div>
                <svg style={{ marginLeft: "auto", color: "rgba(255,255,255,0.3)" }} width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Bookings */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#000" }}>Recent Bookings</h2>
            <Link href="/admin/bookings" style={{ fontSize: "13px", color: "#999", textDecoration: "none" }}>View all →</Link>
          </div>

          {recentBookings.length === 0 ? (
            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "48px", textAlign: "center" }}>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>No bookings yet</p>
              <p style={{ fontSize: "14px", color: "#999" }}>Bookings will appear here once users start making requests.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentBookings.map((booking) => {
                const sc = statusStyle(booking.status);
                return (
                  <div
                    key={booking._id}
                    style={{ background: "#fff", border: "1px solid #eee", borderRadius: "14px", padding: "20px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}
                  >
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 700, color: "#000", marginBottom: "4px" }}>
                        {booking.user?.name} → {booking.celebrity?.name}
                      </p>
                      <p style={{ fontSize: "13px", color: "#999" }}>
                        {booking.eventType} · {new Date(booking.eventDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, padding: "6px 16px", borderRadius: "999px", background: sc.bg, color: sc.color, letterSpacing: "0.05em" }}>
                      {booking.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
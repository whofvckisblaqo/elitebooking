"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminBookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session?.user?.role !== "ADMIN") router.push("/");
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") fetchBookings();
  }, [session]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const tabs = ["ALL", "PENDING", "APPROVED", "REJECTED"];

  const filtered = bookings.filter((b) =>
    activeTab === "ALL" ? true : b.status === activeTab
  );

  const counts = {
    ALL: bookings.length,
    PENDING: bookings.filter((b) => b.status === "PENDING").length,
    APPROVED: bookings.filter((b) => b.status === "APPROVED").length,
    REJECTED: bookings.filter((b) => b.status === "REJECTED").length,
  };

  const statusStyle = (s) => {
    if (s === "APPROVED") return { bg: "rgba(34,197,94,0.1)", color: "#22c55e", border: "rgba(34,197,94,0.2)" };
    if (s === "REJECTED") return { bg: "rgba(255,59,48,0.1)", color: "#ff6b6b", border: "rgba(255,59,48,0.2)" };
    return { bg: "rgba(0,0,0,0.05)", color: "#888", border: "#eee" };
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #eee", borderTop: "2px solid #000", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", paddingTop: "68px" }}>

      {/* Header */}
      <div style={{ background: "#000", paddingTop: "40px", paddingBottom: "40px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>
              Admin Panel
            </p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              Bookings ({bookings.length})
            </h1>
          </div>
          <Link
            href="/admin"
            style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "12px 24px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {tabs.map((tab) => (
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
                transition: "all 0.2s ease",
              }}
            >
              {tab === "ALL" ? `All (${counts.ALL})` : `${tab.charAt(0) + tab.slice(1).toLowerCase()} (${counts[tab]})`}
            </button>
          ))}
        </div>

        {/* Bookings list */}
        {filtered.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "20px", padding: "80px 24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>
              No {activeTab === "ALL" ? "" : activeTab.toLowerCase()} bookings
            </p>
            <p style={{ fontSize: "14px", color: "#999" }}>
              Bookings will appear here once users start making requests.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filtered.map((booking) => {
              const ss = statusStyle(booking.status);
              return (
                <div
                  key={booking._id}
                  style={{
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "20px",
                    alignItems: "start",
                  }}
                >
                  {/* Left info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                    {/* Top row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          padding: "5px 14px",
                          borderRadius: "999px",
                          background: ss.bg,
                          color: ss.color,
                          border: `1px solid ${ss.border}`,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {booking.status}
                      </span>
                      <span style={{ fontSize: "12px", color: "#bbb" }}>
                        {new Date(booking.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </span>
                    </div>

                    {/* Celebrity + User */}
                    <div>
                      <p style={{ fontSize: "17px", fontWeight: 800, color: "#000", marginBottom: "4px" }}>
                        {booking.celebrity?.name || "Unknown Celebrity"}
                      </p>
                      <p style={{ fontSize: "13px", color: "#999" }}>
                        Requested by <span style={{ color: "#555", fontWeight: 600 }}>{booking.user?.name || "Unknown User"}</span>
                        {" · "}{booking.user?.email}
                      </p>
                    </div>

                    {/* Event details */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                      <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "10px", padding: "10px 16px" }}>
                        <p style={{ fontSize: "10px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>Event Type</p>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#000" }}>{booking.eventType}</p>
                      </div>
                      <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "10px", padding: "10px 16px" }}>
                        <p style={{ fontSize: "10px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "3px" }}>Event Date</p>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#000" }}>
                          {new Date(booking.eventDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "10px", padding: "14px 16px" }}>
                      <p style={{ fontSize: "10px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Message</p>
                      <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.7 }}>{booking.message}</p>
                    </div>
                  </div>

                  {/* Right actions */}
                  {booking.status === "PENDING" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0 }}>
                      <button
                        onClick={() => updateStatus(booking._id, "APPROVED")}
                        disabled={updating === booking._id}
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#fff",
                          background: "#000",
                          border: "none",
                          padding: "12px 20px",
                          borderRadius: "999px",
                          cursor: updating === booking._id ? "not-allowed" : "pointer",
                          opacity: updating === booking._id ? 0.6 : 1,
                          transition: "all 0.2s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {updating === booking._id ? "..." : "✓ Approve"}
                      </button>
                      <button
                        onClick={() => updateStatus(booking._id, "REJECTED")}
                        disabled={updating === booking._id}
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#ff3b30",
                          background: "rgba(255,59,48,0.08)",
                          border: "1px solid rgba(255,59,48,0.15)",
                          padding: "12px 20px",
                          borderRadius: "999px",
                          cursor: updating === booking._id ? "not-allowed" : "pointer",
                          opacity: updating === booking._id ? 0.6 : 1,
                          transition: "all 0.2s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {updating === booking._id ? "..." : "✕ Reject"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
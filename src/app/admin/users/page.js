"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session?.user?.role !== "ADMIN") router.push("/");
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") fetchUsers();
  }, [session]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user? This will also delete all their bookings and reviews.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.country && u.country.toLowerCase().includes(search.toLowerCase()))
  );

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
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Admin Panel</p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              Users ({users.length})
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

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", border: "1px solid #eee", borderRadius: "12px", padding: "0 16px", marginBottom: "24px" }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#ccc">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, border: "none", outline: "none", fontSize: "14px", color: "#000", padding: "16px 0", background: "transparent" }}
          />
        </div>

        {/* Users */}
        {filtered.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "80px 24px", textAlign: "center" }}>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>No users found</p>
            <p style={{ fontSize: "14px", color: "#999" }}>Users will appear here once they sign up.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((user) => (
              <div
                key={user._id}
                style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "20px 24px" }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>

                  {/* Left — Avatar + Info */}
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px" }}>

                    {/* Avatar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p style={{ fontSize: "15px", fontWeight: 700, color: "#000", marginBottom: "2px" }}>{user.name}</p>
                        <p style={{ fontSize: "13px", color: "#999" }}>{user.email}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                      {[
                        { label: "Phone", value: user.phone || "N/A" },
                        { label: "Country", value: user.country || "N/A" },
                        { label: "Joined", value: new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) },
                      ].map((item) => (
                        <div key={item.label} style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "10px", padding: "8px 14px" }}>
                          <p style={{ fontSize: "10px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>{item.label}</p>
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "#000" }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right — Stats + Delete */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "10px", padding: "8px 14px", textAlign: "center" }}>
                        <p style={{ fontSize: "18px", fontWeight: 800, color: "#000", lineHeight: 1 }}>{user.bookingCount}</p>
                        <p style={{ fontSize: "10px", color: "#bbb", marginTop: "3px" }}>Bookings</p>
                      </div>
                      <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", padding: "8px 14px", textAlign: "center" }}>
                        <p style={{ fontSize: "18px", fontWeight: 800, color: "#22c55e", lineHeight: 1 }}>{user.approvedCount}</p>
                        <p style={{ fontSize: "10px", color: "#22c55e", marginTop: "3px" }}>Approved</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deleting === user._id}
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#ff3b30",
                        background: "rgba(255,59,48,0.08)",
                        border: "1px solid rgba(255,59,48,0.15)",
                        padding: "10px 18px",
                        borderRadius: "999px",
                        cursor: deleting === user._id ? "not-allowed" : "pointer",
                        opacity: deleting === user._id ? 0.6 : 1,
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {deleting === user._id ? "Deleting..." : "Delete User"}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
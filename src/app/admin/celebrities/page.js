"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminCelebritiesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session?.user?.role !== "ADMIN") router.push("/");
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") fetchCelebrities();
  }, [session]);

  const fetchCelebrities = async () => {
    try {
      const res = await fetch("/api/admin/celebrities");
      const data = await res.json();
      setCelebrities(data.celebrities || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this celebrity?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/celebrities/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCelebrities((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
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
              Celebrities ({celebrities.length})
            </h1>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/admin"
              style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "12px 24px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              ← Dashboard
            </Link>
            <Link
              href="/admin/celebrities/new"
              style={{ fontSize: "13px", fontWeight: 700, color: "#000", background: "#fff", padding: "12px 24px", borderRadius: "999px", textDecoration: "none" }}
            >
              + Add Celebrity
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        {celebrities.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "20px", padding: "80px 24px", textAlign: "center" }}>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>No celebrities yet</p>
            <p style={{ fontSize: "14px", color: "#999", marginBottom: "28px" }}>Add your first celebrity to get started</p>
            <Link
              href="/admin/celebrities/new"
              style={{ display: "inline-block", background: "#000", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "16px 36px", borderRadius: "999px", textDecoration: "none" }}
            >
              Add Celebrity
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {celebrities.map((celeb) => (
              <div
                key={celeb._id}
                style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", overflow: "hidden" }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "220px", background: "#f5f5f5" }}>
                  <Image
                    src={celeb.image}
                    alt={celeb.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                  <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "6px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: "999px",
                        background: celeb.available ? "rgba(34,197,94,0.9)" : "rgba(0,0,0,0.6)",
                        color: "#fff",
                      }}
                    >
                      {celeb.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#000" }}>{celeb.name}</p>
                      <p style={{ fontSize: "13px", color: "#999", marginTop: "2px" }}>{celeb.category} · {celeb.location}</p>
                    </div>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#000", flexShrink: 0 }}>
                      ${celeb.fee.toLocaleString()}
                    </span>
                  </div>

                  <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6, marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {celeb.bio}
                  </p>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      href={`/celebrities/${celeb.slug}`}
                      style={{ flex: 1, fontSize: "13px", fontWeight: 600, color: "#000", background: "#f5f5f5", border: "1px solid #eee", padding: "10px", borderRadius: "999px", textDecoration: "none", textAlign: "center" }}
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/celebrities/${celeb._id}/edit`}
                      style={{ flex: 1, fontSize: "13px", fontWeight: 600, color: "#fff", background: "#000", padding: "10px", borderRadius: "999px", textDecoration: "none", textAlign: "center" }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(celeb._id)}
                      disabled={deleting === celeb._id}
                      style={{ flex: 1, fontSize: "13px", fontWeight: 600, color: "#ff3b30", background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.15)", padding: "10px", borderRadius: "999px", cursor: "pointer" }}
                    >
                      {deleting === celeb._id ? "..." : "Delete"}
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
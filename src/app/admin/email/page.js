"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminEmailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [recipients, setRecipients] = useState("all");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("compose");
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [expandedLog, setExpandedLog] = useState(null);

  useEffect(() => {
    if (session?.user?.role === "ADMIN" && recipients === "specific" && allUsers.length === 0) {
      fetchUsers();
    }
  }, [recipients, session]);

  useEffect(() => {
    if (session?.user?.role === "ADMIN" && tab === "inbox") {
      fetchLogs();
    }
  }, [tab, session]);

  const fetchLogs = async () => {
    setLogsLoading(true);
    try {
      const res = await fetch("/api/admin/email");
      const data = await res.json();
      setLogs(data.logs || []);
    } catch {
      // silently fail
    } finally {
      setLogsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setFetchingUsers(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setAllUsers(data.users || []);
    } catch {
      // silently fail — user list just won't load
    } finally {
      setFetchingUsers(false);
    }
  };

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const filtered = filteredUsers.map((u) => u._id);
    const allSelected = filtered.every((id) => selectedUsers.includes(id));
    if (allSelected) {
      setSelectedUsers((prev) => prev.filter((id) => !filtered.includes(id)));
    } else {
      setSelectedUsers((prev) => [...new Set([...prev, ...filtered])]);
    }
  };

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = async () => {
    setError("");
    setResult(null);
    if (!subject.trim()) { setError("Please enter a subject"); return; }
    if (!message.trim()) { setError("Please enter a message"); return; }
    if (recipients === "specific" && selectedUsers.length === 0) {
      setError("Please select at least one user");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipients, userIds: selectedUsers, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setResult(data);
        setSubject("");
        setMessage("");
        setSelectedUsers([]);
        fetchLogs();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return null;
  if (session?.user?.role !== "ADMIN") { router.push("/"); return null; }

  const recipientOptions = [
    { value: "all", label: "All Users", desc: "Send to every registered user", icon: "👥" },
    { value: "approved", label: "Approved Clients", desc: "Users with at least one approved booking", icon: "✅" },
    { value: "specific", label: "Specific Users", desc: "Choose individual users to email", icon: "🎯" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9", paddingTop: "68px" }}>

      {/* Header */}
      <div style={{ background: "#000", paddingTop: "40px", paddingBottom: "40px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Admin Panel</p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Send Email</h1>
          </div>
          <Link href="/admin" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>← Dashboard</Link>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #eee", marginBottom: "32px" }}>
          {[
            { key: "compose", label: "Compose" },
            { key: "preview", label: "Preview Email" },
            { key: "inbox", label: `Sent Emails${logs.length > 0 ? ` (${logs.length})` : ""}` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{ padding: "12px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", background: "none", color: tab === t.key ? "#000" : "#999", borderBottom: tab === t.key ? "2px solid #000" : "2px solid transparent", marginBottom: "-1px", whiteSpace: "nowrap" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "12px", padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>✅</span>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#16a34a", margin: 0 }}>Emails sent successfully!</p>
              <p style={{ fontSize: "13px", color: "#15803d", margin: "2px 0 0" }}>
                {result.sent} sent{result.failed > 0 ? `, ${result.failed} failed` : ""}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)", borderRadius: "10px", padding: "14px 16px", marginBottom: "24px", fontSize: "13px", color: "#ff3b30" }}>
            {error}
          </div>
        )}

        {tab === "compose" && (
          <>
            {/* Recipients */}
            <div style={cardStyle}>
              <h2 style={sectionTitle}>Recipients</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {recipientOptions.map((opt) => {
                  const active = recipients === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => setRecipients(opt.value)}
                      style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px", borderRadius: "12px", border: `1px solid ${active ? "#000" : "#eee"}`, background: active ? "#000" : "#f9f9f9", cursor: "pointer", transition: "all 0.2s ease" }}
                    >
                      <span style={{ fontSize: "22px" }}>{opt.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: active ? "#fff" : "#000", margin: 0 }}>{opt.label}</p>
                        <p style={{ fontSize: "12px", color: active ? "rgba(255,255,255,0.5)" : "#999", margin: "2px 0 0" }}>{opt.desc}</p>
                      </div>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: active ? "none" : "2px solid #ddd", background: active ? "#fff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#000", flexShrink: 0 }}>
                        {active ? "✓" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Specific user picker */}
              {recipients === "specific" && (
                <div style={{ marginTop: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                    <label style={labelStyle}>Select Users ({selectedUsers.length} selected)</label>
                    <button type="button" onClick={toggleAll} style={{ fontSize: "12px", color: "#000", background: "none", border: "none", cursor: "pointer", fontWeight: 600, textDecoration: "underline" }}>
                      {filteredUsers.every((u) => selectedUsers.includes(u._id)) ? "Deselect All" : "Select All"}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or email..."
                    style={{ ...inputStyle, marginBottom: "12px" }}
                    onFocus={(e) => (e.target.style.border = "1px solid #000")}
                    onBlur={(e) => (e.target.style.border = "1px solid #eee")}
                  />
                  {fetchingUsers ? (
                    <div style={{ textAlign: "center", padding: "24px", color: "#999", fontSize: "13px" }}>Loading users...</div>
                  ) : (
                    <div style={{ maxHeight: "280px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "6px", paddingRight: "4px" }}>
                      {filteredUsers.length === 0 ? (
                        <p style={{ fontSize: "13px", color: "#999", textAlign: "center", padding: "16px" }}>No users found</p>
                      ) : filteredUsers.map((user) => {
                        const checked = selectedUsers.includes(user._id);
                        return (
                          <div
                            key={user._id}
                            onClick={() => toggleUser(user._id)}
                            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${checked ? "#000" : "#eee"}`, background: checked ? "#000" : "#f9f9f9", cursor: "pointer", transition: "all 0.15s ease" }}
                          >
                            <div style={{ width: "18px", height: "18px", borderRadius: "5px", border: checked ? "none" : "2px solid #ddd", background: checked ? "#fff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#000", flexShrink: 0 }}>
                              {checked ? "✓" : ""}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: "13px", fontWeight: 600, color: checked ? "#fff" : "#000", margin: 0 }}>{user.name}</p>
                              <p style={{ fontSize: "12px", color: checked ? "rgba(255,255,255,0.5)" : "#999", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Subject */}
            <div style={cardStyle}>
              <h2 style={sectionTitle}>Subject</h2>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Important Update from EliteBooking"
                style={inputStyle}
                onFocus={(e) => (e.target.style.border = "1px solid #000")}
                onBlur={(e) => (e.target.style.border = "1px solid #eee")}
              />
            </div>

            {/* Message */}
            <div style={cardStyle}>
              <h2 style={sectionTitle}>Message</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={10}
                style={{ ...inputStyle, resize: "vertical", minHeight: "200px", lineHeight: "1.7" }}
                onFocus={(e) => (e.target.style.border = "1px solid #000")}
                onBlur={(e) => (e.target.style.border = "1px solid #eee")}
              />
              <p style={{ fontSize: "12px", color: "#bbb", marginTop: "8px", textAlign: "right" }}>
                {message.length} characters
              </p>
            </div>

            {/* Send */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setTab("preview")}
                style={{ flex: 1, background: "#f5f5f5", color: "#000", fontWeight: 600, fontSize: "15px", padding: "18px", borderRadius: "999px", border: "1px solid #eee", cursor: "pointer", minWidth: "140px" }}
              >
                Preview Email
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={loading}
                style={{ flex: 2, background: loading ? "#ccc" : "#000", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "18px", borderRadius: "999px", border: "none", cursor: loading ? "not-allowed" : "pointer", minWidth: "160px", transition: "all 0.2s ease" }}
              >
                {loading ? "Sending..." : "Send Email"}
              </button>
            </div>
          </>
        )}

        {tab === "inbox" && (
          <div>
            {logsLoading ? (
              <div style={{ textAlign: "center", padding: "64px", color: "#999" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #eee", borderTop: "2px solid #000", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                <p style={{ fontSize: "14px" }}>Loading sent emails...</p>
              </div>
            ) : logs.length === 0 ? (
              <div style={{ ...cardStyle, textAlign: "center", padding: "64px 32px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "24px" }}>✉️</div>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#000", marginBottom: "8px" }}>No emails sent yet</p>
                <p style={{ fontSize: "14px", color: "#999" }}>Emails you send to users will appear here.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {logs.map((log) => {
                  const isExpanded = expandedLog === log._id;
                  const recipientLabel = log.recipients === "all" ? "All Users" : log.recipients === "approved" ? "Approved Clients" : "Specific Users";
                  const date = new Date(log.createdAt);
                  const dateStr = date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
                  const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                  return (
                    <div
                      key={log._id}
                      style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", overflow: "hidden", transition: "border 0.2s ease" }}
                    >
                      {/* Row */}
                      <div
                        onClick={() => setExpandedLog(isExpanded ? null : log._id)}
                        style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", flexWrap: "wrap" }}
                      >
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                          ✉️
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: "15px", fontWeight: 700, color: "#000", margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {log.subject}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "12px", color: "#999" }}>To: {recipientLabel}</span>
                            <span style={{ fontSize: "12px", color: "#ccc" }}>·</span>
                            <span style={{ fontSize: "12px", color: "#999" }}>Sent by {log.sentBy}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,0.1)", padding: "3px 10px", borderRadius: "999px" }}>
                              {log.sentCount} sent
                            </span>
                            {log.failedCount > 0 && (
                              <span style={{ fontSize: "12px", fontWeight: 700, color: "#ff6b6b", background: "rgba(255,59,48,0.1)", padding: "3px 10px", borderRadius: "999px" }}>
                                {log.failedCount} failed
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: "11px", color: "#bbb", margin: 0 }}>{dateStr} · {timeStr}</p>
                        </div>
                        <svg
                          width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#ccc"
                          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", flexShrink: 0 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Expanded message */}
                      {isExpanded && (
                        <div style={{ borderTop: "1px solid #f0f0f0", padding: "24px 24px 24px" }}>
                          <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                            {[
                              { label: "Recipients", value: recipientLabel },
                              { label: "Total", value: `${log.recipientCount} users` },
                              { label: "Delivered", value: `${log.sentCount}` },
                              ...(log.failedCount > 0 ? [{ label: "Failed", value: `${log.failedCount}` }] : []),
                            ].map((item) => (
                              <div key={item.label} style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "10px", padding: "10px 16px" }}>
                                <p style={{ fontSize: "10px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 2px" }}>{item.label}</p>
                                <p style={{ fontSize: "14px", fontWeight: 700, color: "#000", margin: 0 }}>{item.value}</p>
                              </div>
                            ))}
                          </div>
                          <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "12px", padding: "20px" }}>
                            <p style={{ fontSize: "11px", color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px" }}>Message Body</p>
                            <p style={{ fontSize: "14px", color: "#333", lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>{log.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "preview" && (
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={sectionTitle}>Email Preview</h2>
              <button onClick={() => setTab("compose")} style={{ fontSize: "13px", color: "#999", background: "none", border: "none", cursor: "pointer" }}>← Back to Compose</button>
            </div>

            {!subject && !message ? (
              <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: "12px", padding: "48px", textAlign: "center" }}>
                <p style={{ fontSize: "14px", color: "#999" }}>Write a subject and message to preview the email.</p>
              </div>
            ) : (
              <div style={{ background: "#000", borderRadius: "16px", padding: "48px 32px", fontFamily: "Inter, sans-serif" }}>
                <div style={{ marginBottom: "32px" }}>
                  <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 8px" }}>EliteBooking</p>
                  <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>{subject || "(No subject)"}</h1>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "28px", marginBottom: "28px" }}>
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>
                    {message || "(No message)"}
                  </p>
                </div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: "28px" }}>
                  Hi [User Name], this message was sent to you by the EliteBooking team.
                </p>
                <div style={{ display: "inline-block", background: "#fff", color: "#000", fontWeight: 700, fontSize: "14px", padding: "14px 32px", borderRadius: "999px", marginBottom: "32px" }}>
                  View My Dashboard
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px" }}>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", margin: 0 }}>
                    You received this email because you are registered on EliteBooking.
                  </p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)", margin: "8px 0 0" }}>© {new Date().getFullYear()} EliteBooking. All rights reserved.</p>
                </div>
              </div>
            )}
          </div>
        )}
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
  boxSizing: "border-box",
};

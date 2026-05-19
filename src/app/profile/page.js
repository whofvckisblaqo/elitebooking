"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso",
  "Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic",
  "Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini",
  "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana",
  "Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras",
  "Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
  "Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
  "Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
  "Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria",
  "North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine",
  "Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore",
  "Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
  "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo",
  "Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
  "Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
  "Yemen","Zambia","Zimbabwe",
];

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) fetchProfile();
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      setUser(data.user);
      setForm({
        name: data.user.name || "",
        phone: data.user.phone || "",
        country: data.user.country || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setSuccess("Profile updated successfully!");
        await update({ name: form.name });
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setError("New passwords do not match");
    }
    if (passwordForm.newPassword.length < 8) {
      return setError("New password must be at least 8 characters");
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        setSuccess("Password changed successfully!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
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
      <div style={{ background: "#000", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>My Account</p>
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              My Profile
            </h1>
          </div>
          <Link
            href="/dashboard"
            style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", padding: "12px 24px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            ← My Bookings
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Profile card */}
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "20px", padding: "28px 32px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          {/* Avatar */}
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: "28px", fontWeight: 800, color: "#fff" }}>
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p style={{ fontSize: "20px", fontWeight: 800, color: "#000", marginBottom: "4px" }}>{user?.name}</p>
            <p style={{ fontSize: "14px", color: "#999", marginBottom: "4px" }}>{user?.email}</p>
            <p style={{ fontSize: "12px", color: "#bbb" }}>Member since {new Date(user?.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[
            { key: "info", label: "Personal Info" },
            { key: "password", label: "Change Password" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setError(""); setSuccess(""); }}
              style={{
                padding: "10px 22px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                border: activeTab === tab.key ? "none" : "1px solid #e8e8e8",
                background: activeTab === tab.key ? "#000" : "#fff",
                color: activeTab === tab.key ? "#fff" : "#555",
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "20px", padding: "32px" }}>

          {success && (
            <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", padding: "14px 16px", marginBottom: "24px", fontSize: "13px", color: "#22c55e", display: "flex", alignItems: "center", gap: "8px" }}>
              ✅ {success}
            </div>
          )}

          {error && (
            <div style={{ background: "rgba(255,59,48,0.08)", border: "1px solid rgba(255,59,48,0.2)", borderRadius: "10px", padding: "14px 16px", marginBottom: "24px", fontSize: "13px", color: "#ff3b30" }}>
              {error}
            </div>
          )}

          {/* Personal Info Tab */}
          {activeTab === "info" && (
            <form onSubmit={handleInfoSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.border = "1px solid #000")}
                    onBlur={(e) => (e.target.style.border = "1px solid #eee")}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    style={{ ...inputStyle, background: "#f9f9f9", color: "#999", cursor: "not-allowed" }}
                  />
                  <p style={{ fontSize: "12px", color: "#bbb", marginTop: "6px" }}>Email cannot be changed</p>
                </div>

                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.border = "1px solid #000")}
                    onBlur={(e) => (e.target.style.border = "1px solid #eee")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Country</label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.border = "1px solid #000")}
                    onBlur={(e) => (e.target.style.border = "1px solid #eee")}
                  >
                    <option value="">Select country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <button
                    type="submit"
                    disabled={saving}
                    style={{ background: saving ? "#ccc" : "#000", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "16px 40px", borderRadius: "999px", border: "none", cursor: saving ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>

              </div>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <div>
                  <label style={labelStyle}>Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    required
                    placeholder="Enter your current password"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.border = "1px solid #000")}
                    onBlur={(e) => (e.target.style.border = "1px solid #eee")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                    placeholder="Min. 8 characters"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.border = "1px solid #000")}
                    onBlur={(e) => (e.target.style.border = "1px solid #eee")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                    placeholder="Repeat new password"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.border = "1px solid #000")}
                    onBlur={(e) => (e.target.style.border = "1px solid #eee")}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={saving}
                    style={{ background: saving ? "#ccc" : "#000", color: "#fff", fontWeight: 700, fontSize: "15px", padding: "16px 40px", borderRadius: "999px", border: "none", cursor: saving ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
                  >
                    {saving ? "Changing..." : "Change Password"}
                  </button>
                </div>

                <div style={{ paddingTop: "8px", borderTop: "1px solid #eee" }}>
                  <p style={{ fontSize: "13px", color: "#999" }}>
                    Forgot your current password?{" "}
                    <Link href="/forgot-password" style={{ color: "#000", fontWeight: 600, textDecoration: "none" }}>
                      Reset it here
                    </Link>
                  </p>
                </div>

              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

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
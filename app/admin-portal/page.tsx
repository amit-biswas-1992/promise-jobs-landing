"use client";
import { useState } from "react";
import AdminDashboard from "./AdminDashboard";

const API = "http://localhost:3000/api/v1";

export default function AdminPortal() {
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<any>(null);

  const handleLogin = async () => {
    setError("");
    if (!phone || !pass) { setError("ফোন নম্বর ও পাসওয়ার্ড দিন"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, pass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "লগইন ব্যর্থ");
      setToken(data.token);
      setAdminData(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (token) return <AdminDashboard token={token} onLogout={() => { setToken(null); setAdminData(null); }} />;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#064E3B,#047857)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Hind Siliguri',Arial,sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 12px" }}>📋</div>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: 24, margin: 0 }}>Admin Portal</h1>
          <p style={{ color: "#A7F3D0", fontSize: 14, marginTop: 4 }}>Promise Jobs — অ্যাডমিন প্যানেল</p>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 24, padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 6 }}>লগইন করুন</h2>
          <p style={{ color: "#64748B", fontSize: 14, marginBottom: 24 }}>অ্যাডমিন অ্যাকাউন্টে প্রবেশ করুন</p>

          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: "#DC2626", fontSize: 14 }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>📱 ফোন নম্বর</label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "12px 14px", fontSize: 16, outline: "none", boxSizing: "border-box" }}
              onFocus={(e) => e.target.style.borderColor = "#047857"}
              onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>🔒 পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="পাসওয়ার্ড দিন"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "12px 14px", fontSize: 16, outline: "none", boxSizing: "border-box" }}
              onFocus={(e) => e.target.style.borderColor = "#047857"}
              onBlur={(e) => e.target.style.borderColor = "#E5E7EB"}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ width: "100%", background: "linear-gradient(90deg,#059669,#047857)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 17, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন করুন →"}
          </button>

          <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#9CA3AF" }}>
            <a href="/" style={{ color: "#047857", textDecoration: "none" }}>← মূল পেজে ফিরুন</a>
          </p>
        </div>
      </div>
    </div>
  );
}

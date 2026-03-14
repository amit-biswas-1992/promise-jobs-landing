"use client";
import { useState, useEffect } from "react";

const API = "http://localhost:3000/api/v1";

const NAV = [
  { id: "overview", label: "ড্যাশবোর্ড", icon: "📊" },
  { id: "questions", label: "প্রশ্নসমূহ", icon: "❓" },
  { id: "exams", label: "পরীক্ষা", icon: "📝" },
  { id: "solutions", label: "বিসিএস ও ব্যাংক সমাধান", icon: "📚" },
  { id: "users", label: "ব্যবহারকারী", icon: "👥" },
  { id: "roles", label: "ভূমিকা ও অনুমতি", icon: "🔐" },
];

const CATEGORIES = [
  { id: "bcs", label: "বিসিএস", color: "#047857" },
  { id: "bank", label: "ব্যাংক", color: "#1D4ED8" },
  { id: "primary", label: "প্রাথমিক", color: "#B45309" },
  { id: "ntrca", label: "এনটিআরসিএ", color: "#6D28D9" },
  { id: "police", label: "পুলিশ", color: "#B91C1C" },
  { id: "railway", label: "রেলওয়ে", color: "#0891B2" },
];

function apiCall(path: string, token: string, opts: any = {}) {
  return fetch(`${API}${path}`, {
    ...opts,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...opts.headers },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  }).then((r) => r.json());
}

export default function AdminDashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [userTotal, setUserTotal] = useState(0);
  const [userPage, setUserPage] = useState(1);
  const [selCat, setSelCat] = useState("bcs");
  const [qPage, setQPage] = useState(1);
  const [qTotal, setQTotal] = useState(0);
  const [qSearch, setQSearch] = useState("");
  const [qDiff, setQDiff] = useState("");
  const [qTopic, setQTopic] = useState("");
  const [newQ, setNewQ] = useState({ categoryId: "bcs", text: "", options: ["ক. ", "খ. ", "গ. ", "ঘ. "], correctAnswer: "ক", explanation: "", difficulty: "medium", topic: "" });
  const [addingQ, setAddingQ] = useState(false);
  const [newExam, setNewExam] = useState({ title: "", categoryId: "bcs", scheduledAt: "", durationMinutes: 30, totalQuestions: 30 });
  const [addingE, setAddingE] = useState(false);
  const [msg, setMsg] = useState("");

  // --- Roles tab state ---
  const [permissions, setPermissions] = useState<any[]>([]);
  const [roleConfig, setRoleConfig] = useState<Record<string, string[]>>({});
  const [checkedPerms, setCheckedPerms] = useState<Record<string, Record<string, boolean>>>({});
  const [savingRole, setSavingRole] = useState<string | null>(null);

  // --- Solutions tab state ---
  const [bcsSolutions, setBcsSolutions] = useState<any[]>([]);
  const [solutionsFilter, setSolutionsFilter] = useState<"all" | "bcs" | "bank">("all");

  // --- Users tab additions ---
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ phone: "", pass: "", name: "", role: "contributor" });
  const [creatingStaff, setCreatingStaff] = useState(false);
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null);

  useEffect(() => { if (tab === "overview") loadStats(); }, [tab]);
  useEffect(() => { if (tab === "questions") loadQuestions(); }, [tab, selCat, qPage, qTopic]);
  useEffect(() => { if (tab === "exams") loadExams(); }, [tab]);
  useEffect(() => { if (tab === "users") loadUsers(); }, [tab, userPage]);
  useEffect(() => { if (tab === "roles") loadPermissions(); }, [tab]);
  useEffect(() => { if (tab === "solutions") loadSolutions(); }, [tab]);

  // Sync checkedPerms when roleConfig or permissions load
  useEffect(() => {
    if (!permissions.length) return;
    const init: Record<string, Record<string, boolean>> = {};
    ["admin", "contributor"].forEach((role) => {
      init[role] = {};
      permissions.forEach((p) => {
        init[role][p.action] = (roleConfig[role] || []).includes(p.action);
      });
    });
    setCheckedPerms(init);
  }, [roleConfig, permissions]);

  const loadStats = async () => {
    const s = await apiCall("/admin/stats", token);
    setStats(s);
  };

  const loadQuestions = async () => {
    const topicParam = qTopic ? `&topic=${encodeURIComponent(qTopic)}` : "";
    const r = await apiCall(`/admin/questions?category=${selCat}&page=${qPage}&limit=20${topicParam}`, token);
    setQuestions(r.data || []);
    setQTotal(r.total || 0);
  };

  const loadUsers = async () => {
    const r = await apiCall(`/admin/users?page=${userPage}`, token);
    setUsers(r.data || []);
    setUserTotal(r.total || 0);
  };

  const loadPermissions = async () => {
    const r = await apiCall("/admin/permissions", token);
    setPermissions(r.permissions || []);
    setRoleConfig(r.roleConfig || {});
  };

  const deleteQuestion = async (id: string) => {
    if (!confirm("এই প্রশ্ন মুছবেন?")) return;
    await apiCall(`/admin/questions/${id}`, token, { method: "DELETE" });
    loadQuestions();
  };

  const loadExams = async () => {
    const r = await apiCall("/exams/week", token);
    setExams(Array.isArray(r) ? r : []);
  };

  const loadSolutions = async () => {
    const r = await apiCall("/bcs-solutions/exams", token);
    setBcsSolutions(Array.isArray(r) ? r : []);
  };

  const submitQuestion = async () => {
    setAddingQ(true);
    try {
      await apiCall("/questions", token, { method: "POST", body: newQ });
      setMsg("✅ প্রশ্ন সংযুক্ত হয়েছে");
      setNewQ({ categoryId: "bcs", text: "", options: ["ক. ", "খ. ", "গ. ", "ঘ. "], correctAnswer: "ক", explanation: "", difficulty: "medium", topic: "" });
      loadQuestions();
    } catch { setMsg("❌ ত্রুটি হয়েছে"); }
    setAddingQ(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const submitExam = async () => {
    setAddingE(true);
    try {
      await apiCall("/exams", token, { method: "POST", body: newExam });
      setMsg("✅ পরীক্ষা তৈরি হয়েছে");
      setNewExam({ title: "", categoryId: "bcs", scheduledAt: "", durationMinutes: 30, totalQuestions: 30 });
      loadExams();
    } catch { setMsg("❌ ত্রুটি হয়েছে"); }
    setAddingE(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const saveRolePermissions = async (role: string) => {
    setSavingRole(role);
    try {
      const actions = Object.entries(checkedPerms[role] || {})
        .filter(([, checked]) => checked)
        .map(([action]) => action);
      await apiCall(`/admin/permissions/roles/${role}`, token, {
        method: "PATCH",
        body: { permissions: actions },
      });
      setMsg("✅ অনুমতি সংরক্ষিত হয়েছে");
      loadPermissions();
    } catch { setMsg("❌ ত্রুটি হয়েছে"); }
    setSavingRole(null);
    setTimeout(() => setMsg(""), 3000);
  };

  const changeUserRole = async (userId: string, newRole: string) => {
    setUpdatingRoleId(userId);
    try {
      await apiCall(`/admin/users/${userId}/role`, token, {
        method: "PATCH",
        body: { role: newRole },
      });
      loadUsers();
    } catch { setMsg("❌ ভূমিকা পরিবর্তন ব্যর্থ"); }
    setUpdatingRoleId(null);
    setTimeout(() => setMsg(""), 3000);
  };

  const createStaff = async () => {
    if (!newStaff.phone || !newStaff.pass) {
      setMsg("❌ ফোন ও পাসওয়ার্ড আবশ্যিক");
      setTimeout(() => setMsg(""), 3000);
      return;
    }
    setCreatingStaff(true);
    try {
      await apiCall("/admin/users/create-staff", token, { method: "POST", body: newStaff });
      setMsg("✅ স্টাফ তৈরি হয়েছে");
      setShowStaffModal(false);
      setNewStaff({ phone: "", pass: "", name: "", role: "contributor" });
      loadUsers();
    } catch { setMsg("❌ ত্রুটি হয়েছে"); }
    setCreatingStaff(false);
    setTimeout(() => setMsg(""), 3000);
  };

  const s: Record<string, any> = {
    wrap: { display: "flex", minHeight: "100vh", fontFamily: "'Hind Siliguri',Arial,sans-serif" },
    sidebar: { width: 220, background: "#0F172A", padding: "24px 0", flexShrink: 0 },
    sideTitle: { color: "#fff", fontWeight: 900, fontSize: 18, padding: "0 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" },
    navBtn: { display: "block", width: "100%", textAlign: "left" as const, padding: "12px 20px", border: "none", background: "transparent", color: "#94A3B8", cursor: "pointer", fontSize: 15, fontWeight: 600 },
    navBtnActive: { background: "rgba(4,120,87,0.2)", color: "#34D399", borderLeft: "3px solid #047857" },
    main: { flex: 1, background: "#F8FAFC", overflow: "auto" },
    header: { background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" },
    body: { padding: 28 },
    card: { background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", marginBottom: 20 },
    label: { fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 },
    input: { width: "100%", border: "1.5px solid #E5E7EB", borderRadius: 8, padding: "10px 12px", fontSize: 15, boxSizing: "border-box" as const, marginBottom: 12 },
    btn: { background: "#047857", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer" },
    tag: { display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600 },
  };

  // Group permissions by groupLabel for the matrix table
  const groupedPermissions = permissions.reduce((acc: Record<string, any[]>, p: any) => {
    if (!acc[p.groupLabel]) acc[p.groupLabel] = [];
    acc[p.groupLabel].push(p);
    return acc;
  }, {});

  return (
    <div style={s.wrap}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.sideTitle}>📋 Admin Panel</div>
        {NAV.map((n) => (
          <button
            key={n.id}
            style={{ ...s.navBtn, ...(tab === n.id ? s.navBtnActive : {}) }}
            onClick={() => setTab(n.id)}
          >
            {n.icon} {n.label}
          </button>
        ))}
        <div style={{ padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 40 }}>
          <button onClick={onLogout} style={{ ...s.navBtn, color: "#F87171" }}>🚪 লগআউট</button>
        </div>
      </div>

      {/* Main */}
      <div style={s.main}>
        <div style={s.header}>
          <h1 style={{ fontWeight: 800, fontSize: 20, margin: 0 }}>
            {NAV.find((n) => n.id === tab)?.icon} {NAV.find((n) => n.id === tab)?.label}
          </h1>
          {msg && <div style={{ background: msg.startsWith("✅") ? "#D1FAE5" : "#FEE2E2", color: msg.startsWith("✅") ? "#047857" : "#B91C1C", padding: "6px 14px", borderRadius: 8, fontSize: 14, fontWeight: 600 }}>{msg}</div>}
        </div>

        <div style={s.body}>

          {/* OVERVIEW */}
          {tab === "overview" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 24 }}>
                {CATEGORIES.map((c) => (
                  <div key={c.id} style={{ ...s.card, marginBottom: 0, borderLeft: `4px solid ${c.color}` }}>
                    <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>{c.label}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: c.color }}>
                      {stats?.questionCounts?.[c.id] ?? "—"}
                    </div>
                    <div style={{ fontSize: 12, color: "#94A3B8" }}>প্রশ্ন</div>
                  </div>
                ))}
              </div>
              <div style={s.card}>
                <h3 style={{ fontWeight: 800, marginBottom: 12 }}>দ্রুত লিংক</h3>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button style={s.btn} onClick={() => setTab("questions")}>❓ প্রশ্ন যোগ করুন</button>
                  <button style={s.btn} onClick={() => setTab("exams")}>📝 পরীক্ষা তৈরি করুন</button>
                </div>
              </div>
            </>
          )}

          {/* QUESTIONS */}
          {tab === "questions" && (
            <>
              {/* Add Question Form */}
              <div style={s.card}>
                <h3 style={{ fontWeight: 800, marginBottom: 16 }}>নতুন প্রশ্ন যোগ করুন</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={s.label}>বিভাগ</label>
                    <select value={newQ.categoryId} onChange={(e) => setNewQ({ ...newQ, categoryId: e.target.value })} style={s.input}>
                      {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={s.label}>কঠিনতা</label>
                    <select value={newQ.difficulty} onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value })} style={s.input}>
                      <option value="easy">সহজ</option>
                      <option value="medium">মাঝারি</option>
                      <option value="hard">কঠিন</option>
                    </select>
                  </div>
                </div>
                <label style={s.label}>প্রশ্ন *</label>
                <textarea value={newQ.text} onChange={(e) => setNewQ({ ...newQ, text: e.target.value })} rows={3} style={{ ...s.input, resize: "vertical" as const }} placeholder="প্রশ্ন লিখুন..." />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {newQ.options.map((opt, i) => (
                    <div key={i}>
                      <label style={s.label}>{["ক", "খ", "গ", "ঘ"][i]} বিকল্প</label>
                      <input value={opt} onChange={(e) => { const o = [...newQ.options]; o[i] = e.target.value; setNewQ({ ...newQ, options: o }); }} style={s.input} />
                    </div>
                  ))}
                </div>
                <label style={s.label}>সঠিক উত্তর</label>
                <select value={newQ.correctAnswer} onChange={(e) => setNewQ({ ...newQ, correctAnswer: e.target.value })} style={{ ...s.input, width: "auto" }}>
                  {["ক", "খ", "গ", "ঘ"].map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
                <label style={s.label}>টপিক / বিষয় (ঐচ্ছিক)</label>
                <input value={newQ.topic} onChange={(e) => setNewQ({ ...newQ, topic: e.target.value })} style={s.input} placeholder="যেমন: বাংলা সাহিত্য, সংবিধান..." />
                <label style={s.label}>ব্যাখ্যা</label>
                <textarea value={newQ.explanation} onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })} rows={2} style={{ ...s.input, resize: "vertical" as const }} placeholder="ব্যাখ্যা লিখুন..." />
                <button style={s.btn} onClick={submitQuestion} disabled={addingQ}>
                  {addingQ ? "সংযুক্ত হচ্ছে..." : "➕ প্রশ্ন সংযুক্ত করুন"}
                </button>
              </div>

              {/* Question List */}
              <div style={s.card}>
                {/* Header row: title + category pills */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <h3 style={{ fontWeight: 800, margin: 0 }}>প্রশ্নের তালিকা ({qTotal})</h3>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                    {CATEGORIES.map((c) => (
                      <button key={c.id} onClick={() => { setSelCat(c.id); setQPage(1); setQSearch(""); setQTopic(""); setQDiff(""); }}
                        style={{ padding: "5px 12px", borderRadius: 999, border: `1.5px solid ${c.color}`, background: selCat === c.id ? c.color : "transparent", color: selCat === c.id ? "#fff" : c.color, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter bar */}
                <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" as const, background: "#F8FAFC", padding: "12px 14px", borderRadius: 10, border: "1px solid #E5E7EB" }}>
                  <input
                    value={qSearch}
                    onChange={(e) => setQSearch(e.target.value)}
                    placeholder="🔍 প্রশ্ন খুঁজুন..."
                    style={{ flex: 1, minWidth: 180, border: "1.5px solid #E5E7EB", borderRadius: 8, padding: "8px 12px", fontSize: 14, boxSizing: "border-box" as const }}
                  />
                  <input
                    value={qTopic}
                    onChange={(e) => { setQTopic(e.target.value); setQPage(1); }}
                    placeholder="📌 টপিক ফিল্টার..."
                    style={{ flex: 1, minWidth: 160, border: "1.5px solid #E5E7EB", borderRadius: 8, padding: "8px 12px", fontSize: 14, boxSizing: "border-box" as const }}
                  />
                  <select
                    value={qDiff}
                    onChange={(e) => setQDiff(e.target.value)}
                    style={{ border: "1.5px solid #E5E7EB", borderRadius: 8, padding: "8px 12px", fontSize: 14, cursor: "pointer", background: "#fff" }}
                  >
                    <option value="">সব কঠিনতা</option>
                    <option value="easy">সহজ</option>
                    <option value="medium">মাঝারি</option>
                    <option value="hard">কঠিন</option>
                  </select>
                  {(qSearch || qDiff || qTopic) && (
                    <button onClick={() => { setQSearch(""); setQDiff(""); setQTopic(""); setQPage(1); }}
                      style={{ border: "1.5px solid #E5E7EB", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", background: "#fff", color: "#64748B", fontWeight: 600 }}>
                      ✕ ক্লিয়ার
                    </button>
                  )}
                </div>

                {(() => {
                  // Client-side filter by search text and difficulty
                  const filtered = questions.filter((q) => {
                    const matchSearch = !qSearch || q.text.toLowerCase().includes(qSearch.toLowerCase());
                    const matchDiff = !qDiff || q.difficulty === qDiff;
                    return matchSearch && matchDiff;
                  });
                  return filtered.length === 0 ? (
                    <p style={{ color: "#94A3B8", textAlign: "center", padding: 20 }}>
                      {questions.length === 0 ? "এই বিভাগে এখনো প্রশ্ন নেই" : "কোনো ফলাফল পাওয়া যায়নি"}
                    </p>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                            <th style={{ textAlign: "left", padding: "8px 10px", color: "#64748B", fontWeight: 600 }}>প্রশ্ন</th>
                            <th style={{ padding: "8px 10px", color: "#64748B", fontWeight: 600, width: 140, textAlign: "left" as const }}>টপিক</th>
                            <th style={{ padding: "8px 10px", color: "#64748B", fontWeight: 600, width: 72, textAlign: "center" as const }}>উত্তর</th>
                            <th style={{ padding: "8px 10px", color: "#64748B", fontWeight: 600, width: 80, textAlign: "center" as const }}>কঠিনতা</th>
                            <th style={{ padding: "8px 10px", width: 48 }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((q) => (
                            <tr key={q.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                              <td style={{ padding: "10px", maxWidth: 360 }}>{q.text.slice(0, 90)}{q.text.length > 90 ? "..." : ""}</td>
                              <td style={{ padding: "10px" }}>
                                {q.topic ? (
                                  <span style={{ ...s.tag, background: "#EFF6FF", color: "#1D4ED8", maxWidth: 130, display: "inline-block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }} title={q.topic}>
                                    {q.topic}
                                  </span>
                                ) : (
                                  <span style={{ color: "#CBD5E1", fontSize: 12 }}>—</span>
                                )}
                              </td>
                              <td style={{ padding: "10px", textAlign: "center" }}>
                                <span style={{ ...s.tag, background: "#D1FAE5", color: "#047857" }}>{q.correctAnswer}</span>
                              </td>
                              <td style={{ padding: "10px", textAlign: "center" }}>
                                <span style={{ ...s.tag, background: q.difficulty === "hard" ? "#FEE2E2" : q.difficulty === "easy" ? "#D1FAE5" : "#FEF3C7", color: q.difficulty === "hard" ? "#B91C1C" : q.difficulty === "easy" ? "#047857" : "#B45309" }}>
                                  {q.difficulty === "easy" ? "সহজ" : q.difficulty === "hard" ? "কঠিন" : "মাঝারি"}
                                </span>
                              </td>
                              <td style={{ padding: "10px", textAlign: "center" }}>
                                <button onClick={() => deleteQuestion(q.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 16 }} title="মুছুন">🗑️</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                  <button style={{ ...s.btn, background: qPage <= 1 ? "#E5E7EB" : "#047857", color: qPage <= 1 ? "#94A3B8" : "#fff" }} onClick={() => setQPage((p) => Math.max(1, p - 1))} disabled={qPage <= 1}>← আগের</button>
                  <span style={{ color: "#64748B", fontSize: 14, alignSelf: "center" }}>পেজ {qPage}</span>
                  <button style={s.btn} onClick={() => setQPage((p) => p + 1)} disabled={questions.length < 20}>পরের →</button>
                </div>
              </div>
            </>
          )}

          {/* EXAMS */}
          {tab === "exams" && (
            <>
              <div style={s.card}>
                <h3 style={{ fontWeight: 800, marginBottom: 16 }}>নতুন পরীক্ষা তৈরি করুন</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={s.label}>পরীক্ষার নাম *</label>
                    <input value={newExam.title} onChange={(e) => setNewExam({ ...newExam, title: e.target.value })} style={s.input} placeholder="বিসিএস মডেল টেস্ট ১" />
                  </div>
                  <div>
                    <label style={s.label}>বিভাগ</label>
                    <select value={newExam.categoryId} onChange={(e) => setNewExam({ ...newExam, categoryId: e.target.value })} style={s.input}>
                      {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={s.label}>তারিখ ও সময়</label>
                    <input type="datetime-local" value={newExam.scheduledAt} onChange={(e) => setNewExam({ ...newExam, scheduledAt: e.target.value })} style={s.input} />
                  </div>
                  <div>
                    <label style={s.label}>সময়সীমা (মিনিট)</label>
                    <input type="number" value={newExam.durationMinutes} onChange={(e) => setNewExam({ ...newExam, durationMinutes: Number(e.target.value) })} style={s.input} />
                  </div>
                </div>
                <button style={s.btn} onClick={submitExam} disabled={addingE}>
                  {addingE ? "তৈরি হচ্ছে..." : "📝 পরীক্ষা তৈরি করুন"}
                </button>
              </div>

              <div style={s.card}>
                <h3 style={{ fontWeight: 800, marginBottom: 16 }}>এই সপ্তাহের পরীক্ষা</h3>
                {exams.length === 0 ? (
                  <p style={{ color: "#94A3B8", textAlign: "center", padding: 20 }}>কোনো পরীক্ষা নেই</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {exams.map((e) => (
                      <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#F8FAFC", borderRadius: 12, border: "1px solid #E5E7EB" }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{e.title}</div>
                          <div style={{ fontSize: 13, color: "#64748B" }}>{new Date(e.scheduledAt).toLocaleString("bn-BD")} · {e.durationMinutes} মিনিট · {e.totalQuestions} প্রশ্ন</div>
                        </div>
                        <span style={{ ...s.tag, background: e.status === "live" ? "#FEE2E2" : e.status === "finished" ? "#F1F5F9" : "#D1FAE5", color: e.status === "live" ? "#DC2626" : e.status === "finished" ? "#64748B" : "#047857" }}>
                          {e.status === "live" ? "🔴 লাইভ" : e.status === "finished" ? "✅ শেষ" : "🕐 আসছে"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* SOLUTIONS */}
          {tab === "solutions" && (
            <>
              {/* Summary cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div style={{ ...s.card, marginBottom: 0, borderLeft: "4px solid #047857" }}>
                  <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>🎓 মোট বিসিএস পরীক্ষা</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#047857" }}>
                    {bcsSolutions.filter((e) => !e.examCode.startsWith("bank_")).length}
                  </div>
                  <div style={{ fontSize: 13, color: "#94A3B8" }}>
                    মোট {bcsSolutions.filter((e) => !e.examCode.startsWith("bank_")).reduce((sum, e) => sum + (e.totalQuestions || 0), 0)} প্রশ্ন
                  </div>
                </div>
                <div style={{ ...s.card, marginBottom: 0, borderLeft: "4px solid #1D4ED8" }}>
                  <div style={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>🏦 মোট ব্যাংক পরীক্ষা</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#1D4ED8" }}>
                    {bcsSolutions.filter((e) => e.examCode.startsWith("bank_")).length}
                  </div>
                  <div style={{ fontSize: 13, color: "#94A3B8" }}>
                    মোট {bcsSolutions.filter((e) => e.examCode.startsWith("bank_")).reduce((sum, e) => sum + (e.totalQuestions || 0), 0)} প্রশ্ন
                  </div>
                </div>
              </div>

              {/* Exam list */}
              <div style={s.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 800, margin: 0 }}>
                    বছরওয়ারী সমাধান তালিকা ({bcsSolutions.filter((e) =>
                      solutionsFilter === "all" ? true :
                      solutionsFilter === "bank" ? e.examCode.startsWith("bank_") :
                      !e.examCode.startsWith("bank_")
                    ).length})
                  </h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { id: "all", label: "সব", color: "#374151" },
                      { id: "bcs", label: "🎓 বিসিএস", color: "#047857" },
                      { id: "bank", label: "🏦 ব্যাংক", color: "#1D4ED8" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSolutionsFilter(f.id as "all" | "bcs" | "bank")}
                        style={{ padding: "5px 14px", borderRadius: 999, border: `1.5px solid ${f.color}`, background: solutionsFilter === f.id ? f.color : "transparent", color: solutionsFilter === f.id ? "#fff" : f.color, cursor: "pointer", fontSize: 13, fontWeight: 600 }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {bcsSolutions.length === 0 ? (
                  <p style={{ color: "#94A3B8", textAlign: "center", padding: 20 }}>লোড হচ্ছে...</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid #E5E7EB", background: "#F8FAFC" }}>
                          <th style={{ textAlign: "left", padding: "10px 12px", color: "#374151", fontWeight: 700, width: 100 }}>ধরন</th>
                          <th style={{ textAlign: "left", padding: "10px 12px", color: "#374151", fontWeight: 700 }}>পরীক্ষার নাম</th>
                          <th style={{ textAlign: "center", padding: "10px 12px", color: "#374151", fontWeight: 700, width: 120 }}>তারিখ</th>
                          <th style={{ textAlign: "center", padding: "10px 12px", color: "#374151", fontWeight: 700, width: 80 }}>প্রশ্ন</th>
                          <th style={{ textAlign: "center", padding: "10px 12px", color: "#374151", fontWeight: 700, width: 90 }}>সময়</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bcsSolutions
                          .filter((e) =>
                            solutionsFilter === "all" ? true :
                            solutionsFilter === "bank" ? e.examCode.startsWith("bank_") :
                            !e.examCode.startsWith("bank_")
                          )
                          .map((e) => {
                            const isBank = e.examCode.startsWith("bank_");
                            return (
                              <tr key={e.examCode} style={{ borderBottom: "1px solid #F1F5F9" }}>
                                <td style={{ padding: "10px 12px" }}>
                                  <span style={{ ...s.tag, background: isBank ? "#DBEAFE" : "#D1FAE5", color: isBank ? "#1D4ED8" : "#047857" }}>
                                    {isBank ? "🏦 ব্যাংক" : "🎓 বিসিএস"}
                                  </span>
                                </td>
                                <td style={{ padding: "10px 12px" }}>
                                  <div style={{ fontWeight: 700 }}>{e.titleBn}</div>
                                  <div style={{ fontSize: 12, color: "#94A3B8" }}>{e.titleEn} · <span style={{ fontFamily: "monospace" }}>{e.examCode}</span></div>
                                </td>
                                <td style={{ padding: "10px 12px", textAlign: "center", color: "#64748B", fontSize: 13 }}>{e.examDate}</td>
                                <td style={{ padding: "10px 12px", textAlign: "center" }}>
                                  <span style={{ fontWeight: 800, fontSize: 16, color: isBank ? "#1D4ED8" : "#047857" }}>{e.totalQuestions}</span>
                                </td>
                                <td style={{ padding: "10px 12px", textAlign: "center", color: "#64748B", fontSize: 13 }}>{e.durationMinutes} মিনিট</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* USERS */}
          {tab === "users" && (
            <div style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ fontWeight: 800, margin: 0 }}>ব্যবহারকারী ({userTotal})</h3>
                <button style={s.btn} onClick={() => setShowStaffModal(true)}>➕ নতুন স্টাফ তৈরি করুন</button>
              </div>
              {users.length === 0 ? (
                <p style={{ color: "#94A3B8", textAlign: "center", padding: 20 }}>কোনো ব্যবহারকারী নেই</p>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                        <th style={{ textAlign: "left", padding: "8px 10px", color: "#64748B", fontWeight: 600 }}>নাম / ফোন</th>
                        <th style={{ padding: "8px 10px", color: "#64748B", fontWeight: 600, width: 160 }}>ভূমিকা</th>
                        <th style={{ padding: "8px 10px", color: "#64748B", fontWeight: 600, width: 80 }}>পরীক্ষা</th>
                        <th style={{ padding: "8px 10px", color: "#64748B", fontWeight: 600, width: 80 }}>স্কোর</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                          <td style={{ padding: "10px" }}>
                            <div style={{ fontWeight: 600 }}>{u.name || "—"}</div>
                            <div style={{ fontSize: 12, color: "#94A3B8" }}>+{u.phone}</div>
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>
                            <select
                              value={u.role}
                              onChange={(e) => changeUserRole(u.id, e.target.value)}
                              disabled={updatingRoleId === u.id}
                              style={{
                                border: "1.5px solid #E5E7EB",
                                borderRadius: 8,
                                padding: "4px 8px",
                                fontSize: 13,
                                cursor: "pointer",
                                background: u.role === "admin" ? "#D1FAE5" : u.role === "contributor" ? "#EDE9FE" : "#F1F5F9",
                                color: u.role === "admin" ? "#047857" : u.role === "contributor" ? "#6D28D9" : "#475569",
                                fontWeight: 600,
                              }}
                            >
                              <option value="student">শিক্ষার্থী</option>
                              <option value="contributor">কন্ট্রিবিউটর</option>
                              <option value="admin">অ্যাডমিন</option>
                            </select>
                          </td>
                          <td style={{ padding: "10px", textAlign: "center" }}>{u.examsTaken}</td>
                          <td style={{ padding: "10px", textAlign: "center" }}>{u.totalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <button style={{ ...s.btn, background: userPage <= 1 ? "#E5E7EB" : "#047857", color: userPage <= 1 ? "#94A3B8" : "#fff" }} onClick={() => setUserPage((p) => Math.max(1, p - 1))} disabled={userPage <= 1}>← আগের</button>
                <span style={{ color: "#64748B", fontSize: 14, alignSelf: "center" }}>পেজ {userPage}</span>
                <button style={s.btn} onClick={() => setUserPage((p) => p + 1)} disabled={users.length < 20}>পরের →</button>
              </div>
            </div>
          )}

          {/* ROLES */}
          {tab === "roles" && (
            <>
              <div style={s.card}>
                <h3 style={{ fontWeight: 800, marginBottom: 4 }}>ভূমিকা ও অনুমতি ম্যাট্রিক্স</h3>
                <p style={{ color: "#64748B", fontSize: 14, marginBottom: 20 }}>প্রতিটি ভূমিকার জন্য অনুমতি চেক/আনচেক করুন, তারপর সংরক্ষণ করুন।</p>

                {permissions.length === 0 ? (
                  <p style={{ color: "#94A3B8", textAlign: "center", padding: 20 }}>লোড হচ্ছে...</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
                          <th style={{ textAlign: "left", padding: "10px 12px", color: "#374151", fontWeight: 700, width: "50%" }}>অনুমতি</th>
                          <th style={{ padding: "10px 12px", color: "#047857", fontWeight: 700, width: "25%", textAlign: "center" }}>🔑 অ্যাডমিন</th>
                          <th style={{ padding: "10px 12px", color: "#6D28D9", fontWeight: 700, width: "25%", textAlign: "center" }}>✏️ কন্ট্রিবিউটর</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(groupedPermissions).map(([group, perms]: [string, any[]]) => (
                          <>
                            <tr key={`group-${group}`}>
                              <td colSpan={3} style={{ background: "#F8FAFC", fontWeight: 800, padding: "8px 12px", color: "#374151", fontSize: 13, borderBottom: "1px solid #E5E7EB", letterSpacing: "0.05em" }}>
                                📁 {group}
                              </td>
                            </tr>
                            {perms.map((perm: any) => (
                              <tr key={perm.action} style={{ borderBottom: "1px solid #F1F5F9" }}>
                                <td style={{ padding: "10px 12px" }}>
                                  <div style={{ fontWeight: 500 }}>{perm.labelBn}</div>
                                  <div style={{ fontSize: 11, color: "#94A3B8", fontFamily: "monospace" }}>{perm.action}</div>
                                </td>
                                {["admin", "contributor"].map((role) => {
                                  const isAdminLocked = role === "admin" && ["roles.manage", "stats.view"].includes(perm.action);
                                  const checked = checkedPerms[role]?.[perm.action] ?? false;
                                  return (
                                    <td key={role} style={{ textAlign: "center", padding: "10px 12px" }}>
                                      <input
                                        type="checkbox"
                                        checked={isAdminLocked ? true : checked}
                                        disabled={isAdminLocked}
                                        onChange={(e) => {
                                          if (isAdminLocked) return;
                                          setCheckedPerms((prev) => ({
                                            ...prev,
                                            [role]: { ...prev[role], [perm.action]: e.target.checked },
                                          }));
                                        }}
                                        style={{ width: 18, height: 18, cursor: isAdminLocked ? "not-allowed" : "pointer", accentColor: role === "admin" ? "#047857" : "#6D28D9" }}
                                      />
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </>
                        ))}
                        {/* Save row */}
                        <tr style={{ borderTop: "2px solid #E5E7EB", background: "#F8FAFC" }}>
                          <td style={{ padding: "12px" }}></td>
                          {["admin", "contributor"].map((role) => (
                            <td key={role} style={{ padding: "12px", textAlign: "center" }}>
                              <button
                                style={{
                                  ...s.btn,
                                  background: role === "admin" ? "#047857" : "#6D28D9",
                                  fontSize: 13,
                                  padding: "8px 20px",
                                  opacity: savingRole === role ? 0.6 : 1,
                                }}
                                onClick={() => saveRolePermissions(role)}
                                disabled={savingRole === role}
                              >
                                {savingRole === role ? "সংরক্ষণ হচ্ছে..." : "💾 সংরক্ষণ করুন"}
                              </button>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Role summary cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { role: "admin", label: "অ্যাডমিন", color: "#047857" },
                  { role: "contributor", label: "কন্ট্রিবিউটর", color: "#6D28D9" },
                ].map((r) => (
                  <div key={r.role} style={{ ...s.card, marginBottom: 0, borderLeft: `4px solid ${r.color}` }}>
                    <div style={{ fontWeight: 800, color: r.color, fontSize: 15, marginBottom: 8 }}>{r.label}</div>
                    <div style={{ fontSize: 13, color: "#64748B" }}>
                      {(roleConfig[r.role] || []).length} টি অনুমতি সক্রিয়
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                      {(roleConfig[r.role] || []).slice(0, 5).map((a: string) => (
                        <span key={a} style={{ background: `${r.color}15`, color: r.color, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
                          {permissions.find((p: any) => p.action === a)?.labelBn || a}
                        </span>
                      ))}
                      {(roleConfig[r.role] || []).length > 5 && (
                        <span style={{ color: "#94A3B8", fontSize: 11, alignSelf: "center" }}>+{(roleConfig[r.role] || []).length - 5} আরো</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {/* Staff Creation Modal */}
      {showStaffModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", maxHeight: "90vh", overflow: "auto" }}>
            <h3 style={{ fontWeight: 800, marginBottom: 20, fontSize: 18 }}>➕ নতুন স্টাফ তৈরি করুন</h3>

            <label style={s.label}>📱 ফোন নম্বর *</label>
            <input
              value={newStaff.phone}
              onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
              style={s.input}
              placeholder="01XXXXXXXXX"
            />

            <label style={s.label}>🔒 পাসওয়ার্ড *</label>
            <input
              type="password"
              value={newStaff.pass}
              onChange={(e) => setNewStaff({ ...newStaff, pass: e.target.value })}
              style={s.input}
              placeholder="ন্যূনতম ৬ অক্ষর"
            />

            <label style={s.label}>👤 নাম (ঐচ্ছিক)</label>
            <input
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              style={s.input}
              placeholder="স্টাফের নাম"
            />

            <label style={s.label}>🔐 ভূমিকা</label>
            <select
              value={newStaff.role}
              onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
              style={s.input}
            >
              <option value="contributor">কন্ট্রিবিউটর — প্রশ্ন যোগ করতে পারবেন</option>
              <option value="admin">অ্যাডমিন — সব কিছু করতে পারবেন</option>
            </select>

            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button style={{ ...s.btn, flex: 1 }} onClick={createStaff} disabled={creatingStaff}>
                {creatingStaff ? "তৈরি হচ্ছে..." : "✅ তৈরি করুন"}
              </button>
              <button
                style={{ ...s.btn, background: "#6B7280", flex: 1 }}
                onClick={() => { setShowStaffModal(false); setNewStaff({ phone: "", pass: "", name: "", role: "contributor" }); }}
              >
                বাতিল
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

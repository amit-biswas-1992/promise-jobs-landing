"use client";
import { useState, useEffect } from "react";

const API = "http://localhost:3000/api/v1";

const NAV = [
  { id: "overview", label: "ড্যাশবোর্ড", icon: "📊" },
  { id: "questions", label: "প্রশ্নসমূহ", icon: "❓" },
  { id: "exams", label: "পরীক্ষা", icon: "📝" },
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
  const [selCat, setSelCat] = useState("bcs");
  const [qPage, setQPage] = useState(1);
  const [qTotal, setQTotal] = useState(0);
  const [newQ, setNewQ] = useState({ categoryId: "bcs", text: "", options: ["ক. ", "খ. ", "গ. ", "ঘ. "], correctAnswer: "ক", explanation: "", difficulty: "medium" });
  const [addingQ, setAddingQ] = useState(false);
  const [newExam, setNewExam] = useState({ title: "", categoryId: "bcs", scheduledAt: "", durationMinutes: 30, totalQuestions: 30 });
  const [addingE, setAddingE] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => { if (tab === "overview") loadStats(); }, [tab]);
  useEffect(() => { if (tab === "questions") loadQuestions(); }, [tab, selCat, qPage]);
  useEffect(() => { if (tab === "exams") loadExams(); }, [tab]);

  const loadStats = async () => {
    const s = await apiCall("/admin/stats", token);
    setStats(s);
  };

  const loadQuestions = async () => {
    const r = await apiCall(`/questions?category=${selCat}&page=${qPage}`, token);
    setQuestions(r.data || []);
    setQTotal(r.total || 0);
  };

  const loadExams = async () => {
    const r = await apiCall("/exams/week", token);
    setExams(Array.isArray(r) ? r : []);
  };

  const submitQuestion = async () => {
    setAddingQ(true);
    try {
      await apiCall("/questions", token, { method: "POST", body: newQ });
      setMsg("✅ প্রশ্ন সংযুক্ত হয়েছে");
      setNewQ({ categoryId: "bcs", text: "", options: ["ক. ", "খ. ", "গ. ", "ঘ. "], correctAnswer: "ক", explanation: "", difficulty: "medium" });
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
        <div style={{ marginTop: "auto", padding: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 40 }}>
          <button onClick={onLogout} style={{ ...s.navBtn, color: "#F87171" }}>🚪 লগআউট</button>
        </div>
      </div>

      {/* Main */}
      <div style={s.main}>
        <div style={s.header}>
          <h1 style={{ fontWeight: 800, fontSize: 20, margin: 0 }}>
            {NAV.find((n) => n.id === tab)?.icon} {NAV.find((n) => n.id === tab)?.label}
          </h1>
          {msg && <div style={{ background: "#D1FAE5", color: "#047857", padding: "6px 14px", borderRadius: 8, fontSize: 14, fontWeight: 600 }}>{msg}</div>}
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
                <label style={s.label}>ব্যাখ্যা</label>
                <textarea value={newQ.explanation} onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })} rows={2} style={{ ...s.input, resize: "vertical" as const }} placeholder="ব্যাখ্যা লিখুন..." />
                <button style={s.btn} onClick={submitQuestion} disabled={addingQ}>
                  {addingQ ? "সংযুক্ত হচ্ছে..." : "➕ প্রশ্ন সংযুক্ত করুন"}
                </button>
              </div>

              {/* Question List */}
              <div style={s.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontWeight: 800, margin: 0 }}>প্রশ্নের তালিকা ({qTotal})</h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    {CATEGORIES.map((c) => (
                      <button key={c.id} onClick={() => { setSelCat(c.id); setQPage(1); }}
                        style={{ padding: "5px 12px", borderRadius: 999, border: `1.5px solid ${c.color}`, background: selCat === c.id ? c.color : "transparent", color: selCat === c.id ? "#fff" : c.color, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                {questions.length === 0 ? (
                  <p style={{ color: "#94A3B8", textAlign: "center", padding: 20 }}>এই বিভাগে এখনো প্রশ্ন নেই</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #E5E7EB" }}>
                          <th style={{ textAlign: "left", padding: "8px 10px", color: "#64748B", fontWeight: 600 }}>প্রশ্ন</th>
                          <th style={{ padding: "8px 10px", color: "#64748B", fontWeight: 600, width: 80 }}>উত্তর</th>
                          <th style={{ padding: "8px 10px", color: "#64748B", fontWeight: 600, width: 80 }}>কঠিনতা</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions.map((q) => (
                          <tr key={q.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                            <td style={{ padding: "10px", maxWidth: 400 }}>{q.text.slice(0, 80)}{q.text.length > 80 ? "..." : ""}</td>
                            <td style={{ padding: "10px", textAlign: "center" }}>
                              <span style={{ ...s.tag, background: "#D1FAE5", color: "#047857" }}>{q.correctAnswer}</span>
                            </td>
                            <td style={{ padding: "10px", textAlign: "center" }}>
                              <span style={{ ...s.tag, background: q.difficulty === "hard" ? "#FEE2E2" : q.difficulty === "easy" ? "#D1FAE5" : "#FEF3C7", color: q.difficulty === "hard" ? "#B91C1C" : q.difficulty === "easy" ? "#047857" : "#B45309" }}>
                                {q.difficulty === "easy" ? "সহজ" : q.difficulty === "hard" ? "কঠিন" : "মাঝারি"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                  <button style={{ ...s.btn, background: qPage <= 1 ? "#E5E7EB" : "#047857", color: qPage <= 1 ? "#94A3B8" : "#fff" }} onClick={() => setQPage((p) => Math.max(1, p - 1))} disabled={qPage <= 1}>← আগের</button>
                  <span style={{ color: "#64748B", fontSize: 14, alignSelf: "center" }}>পেজ {qPage}</span>
                  <button style={s.btn} onClick={() => setQPage((p) => p + 1)} disabled={questions.length < 50}>পরের →</button>
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

          {/* USERS */}
          {tab === "users" && (
            <div style={s.card}>
              <h3 style={{ fontWeight: 800, marginBottom: 8 }}>ব্যবহারকারী ব্যবস্থাপনা</h3>
              <p style={{ color: "#64748B" }}>ব্যবহারকারীদের তালিকা, ভূমিকা পরিবর্তন ও PRO অ্যাক্টিভেশন এখানে দেখা যাবে।</p>
              <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 20, marginTop: 12 }}>
                <p style={{ color: "#94A3B8", textAlign: "center" }}>ব্যবহারকারী API এর সাথে সংযুক্ত করুন — <code>GET /api/v1/admin/users</code></p>
              </div>
            </div>
          )}

          {/* ROLES */}
          {tab === "roles" && (
            <div style={s.card}>
              <h3 style={{ fontWeight: 800, marginBottom: 16 }}>ভূমিকা ও অনুমতি</h3>
              {[
                { role: "admin", label: "অ্যাডমিন", color: "#047857", perms: ["সব কিছু দেখা", "প্রশ্ন যোগ/সম্পাদনা", "পরীক্ষা তৈরি", "ব্যবহারকারী ব্যবস্থাপনা", "ভূমিকা নির্ধারণ"] },
                { role: "contributor", label: "কন্ট্রিবিউটর", color: "#6D28D9", perms: ["সব প্রশ্ন দেখা", "নতুন প্রশ্ন যোগ করা"] },
                { role: "student", label: "শিক্ষার্থী", color: "#1D4ED8", perms: ["পরীক্ষায় অংশগ্রহণ", "ফলাফল দেখা", "লিডারবোর্ড দেখা"] },
              ].map((r) => (
                <div key={r.role} style={{ marginBottom: 16, padding: 16, border: `1.5px solid ${r.color}30`, borderRadius: 12, background: `${r.color}08` }}>
                  <div style={{ fontWeight: 800, color: r.color, fontSize: 16, marginBottom: 8 }}>{r.label}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {r.perms.map((p) => (
                      <span key={p} style={{ background: `${r.color}15`, color: r.color, padding: "4px 12px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>✓ {p}</span>
                    ))}
                  </div>
                </div>
              ))}
              <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 8 }}>ভবিষ্যতে ডায়নামিক পারমিশন সিস্টেম যুক্ত করা হবে।</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

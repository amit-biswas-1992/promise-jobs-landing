"use client";
import Link from "next/link";

const FEATURES = [
  { icon: "🔴", title: "লাইভ পরীক্ষা", desc: "প্রতিদিন শত শত পরীক্ষার্থীর সাথে রিয়েলটাইম পরীক্ষায় অংশ নিন" },
  { icon: "🎯", title: "র‍্যান্ডম প্র্যাকটিস", desc: "সব বিভাগ থেকে মিক্স করা প্রশ্নে যেকোনো সময় নিজেকে যাচাই করুন" },
  { icon: "🏆", title: "লিডারবোর্ড", desc: "জাতীয় র‍্যাংকিংয়ে নিজের অবস্থান দেখুন এবং প্রতিযোগীদের ছাড়িয়ে যান" },
  { icon: "📖", title: "বিদ্যাসোপান", desc: "বিষয়ভিত্তিক সাজানো প্রশ্নব্যাংক — নিজের গতিতে পড়ুন ও কুইজ দিন" },
  { icon: "🌐", title: "তথ্যকোষ", desc: "সাম্প্রতিক ঘটনার নির্ভরযোগ্য তথ্যভান্ডার — বাংলাদেশ ও আন্তর্জাতিক" },
  { icon: "🗺️", title: "বিশ্বমানচিত্র", desc: "খাল, প্রণালী, নদী, পর্বত — ইন্টারেক্টিভ ভূগোল শিক্ষা" },
];

const CATEGORIES = [
  { id: "bcs", label: "বিসিএস", icon: "🏛️", color: "#047857", bg: "#D1FAE5", count: "১,০০০+" },
  { id: "bank", label: "ব্যাংক", icon: "🏦", color: "#1D4ED8", bg: "#DBEAFE", count: "১,০০০+" },
  { id: "primary", label: "প্রাথমিক", icon: "📚", color: "#B45309", bg: "#FEF3C7", count: "১,০০০+" },
  { id: "ntrca", label: "এনটিআরসিএ", icon: "🎓", color: "#6D28D9", bg: "#EDE9FE", count: "১,০০০+" },
  { id: "police", label: "পুলিশ", icon: "👮", color: "#B91C1C", bg: "#FEE2E2", count: "১,০০০+" },
  { id: "railway", label: "রেলওয়ে", icon: "🚂", color: "#0891B2", bg: "#E0F2FE", count: "১,০০০+" },
];

const STATS = [
  { val: "৬,০০০+", label: "মডেল প্রশ্ন" },
  { val: "৬টি", label: "পরীক্ষার বিভাগ" },
  { val: "২৪/৭", label: "লাইভ পরীক্ষা" },
  { val: "১০০%", label: "বিনামূল্যে শুরু" },
];

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "'Hind Siliguri', Arial, sans-serif" }}>

      {/* ── NAV ─────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #E5E7EB", padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#064E3B,#047857)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📋</div>
            <span style={{ fontWeight: 800, fontSize: 20, color: "#0F172A" }}>Promise Jobs</span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#features" style={{ color: "#6B7280", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>ফিচার</a>
            <a href="#categories" style={{ color: "#6B7280", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>বিভাগ</a>
            <Link href="/admin-portal" style={{ background: "#047857", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>অ্যাডমিন</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)", padding: "80px 24px 100px", position: "relative", overflow: "hidden" }}>
        {/* Blobs */}
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: -100, right: -100 }} />
        <div style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: -80, left: -60 }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 999, padding: "6px 18px", color: "#A7F3D0", fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
            🇧🇩 বাংলাদেশের #১ চাকরির পরীক্ষা প্রস্তুতি অ্যাপ
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 20, letterSpacing: -0.5 }}>
            চাকরির পরীক্ষায়<br />
            <span style={{ color: "#6EE7B7" }}>এগিয়ে থাকুন</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
            BCS, Bank, Primary, NTRCA, Police ও Railway পরীক্ষার জন্য ৬,০০০+ মডেল প্রশ্ন, লাইভ পরীক্ষা ও রিয়েলটাইম লিডারবোর্ড
          </p>

          {/* Download buttons */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 12, background: "#000", color: "#fff", borderRadius: 14, padding: "14px 24px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.2)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76a2 2 0 0 0 2.07-.22l12.11-7L14.1 12 3.18 23.76zM20.54 9.74l-2.49-1.44-3.4 3.4 3.4 3.4 2.52-1.46a1.96 1.96 0 0 0 0-3.9zM3.18.24A2 2 0 0 0 2 2.04v19.92l11.1-11.1L3.18.24zM17.36 4.46L5.25.46 14.1 9.3l3.26-4.84z"/></svg>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, opacity: 0.75 }}>ডাউনলোড করুন</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Google Play</div>
              </div>
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 12, background: "#000", color: "#fff", borderRadius: 14, padding: "14px 24px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.2)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, opacity: 0.75 }}>ডাউনলোড করুন</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>App Store</div>
              </div>
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 60, flexWrap: "wrap" }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ color: "#fff", fontSize: 28, fontWeight: 900 }}>{s.val}</div>
                <div style={{ color: "#A7F3D0", fontSize: 13, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section id="features" style={{ padding: "80px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", marginBottom: 12 }}>কেন Promise Jobs?</h2>
            <p style={{ color: "#64748B", fontSize: 17 }}>লাখো পরীক্ষার্থীর পছন্দের প্ল্যাটফর্ম — সম্পূর্ণ বিনামূল্যে শুরু করুন</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: "#64748B", lineHeight: 1.7, fontSize: 15 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────── */}
      <section id="categories" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0F172A", marginBottom: 12 }}>পরীক্ষার বিভাগ</h2>
            <p style={{ color: "#64748B", fontSize: 17 }}>প্রতিটি বিভাগে ১,০০০+ উচ্চমানের প্রশ্ন ও ব্যাখ্যা</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {CATEGORIES.map((c) => (
              <div key={c.id} style={{ borderRadius: 20, padding: 24, textAlign: "center", background: c.bg, border: `2px solid ${c.color}20` }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: c.color, marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 13, color: c.color, opacity: 0.75, fontWeight: 600 }}>{c.count} প্রশ্ন</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP PREVIEW ─────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #064E3B, #047857)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 16 }}>আজই শুরু করুন</h2>
          <p style={{ color: "#A7F3D0", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
            ফোন নম্বর ও পিন দিয়ে মাত্র ৩০ সেকেন্ডে অ্যাকাউন্ট খুলুন।<br />
            কোনো ক্রেডিট কার্ড বা ইমেইল লাগবে না।
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", color: "#0F172A", borderRadius: 14, padding: "14px 28px", textDecoration: "none", fontWeight: 700, fontSize: 16 }}
            >
              📱 Google Play থেকে ডাউনলোড
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 14, padding: "14px 28px", textDecoration: "none", fontWeight: 700, fontSize: 16, border: "1.5px solid rgba(255,255,255,0.3)" }}
            >
              🍎 App Store থেকে ডাউনলোড
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer style={{ background: "#0F172A", color: "#94A3B8", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#064E3B,#047857)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📋</div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>Promise Jobs</span>
          </div>
          <p style={{ fontSize: 14, marginBottom: 12 }}>বাংলাদেশের সেরা চাকরির পরীক্ষা প্রস্তুতি প্ল্যাটফর্ম</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 20 }}>
            <Link href="/admin-portal" style={{ color: "#64748B", textDecoration: "none", fontSize: 14 }}>অ্যাডমিন পোর্টাল</Link>
            <a href="#features" style={{ color: "#64748B", textDecoration: "none", fontSize: 14 }}>ফিচার</a>
            <a href="#categories" style={{ color: "#64748B", textDecoration: "none", fontSize: 14 }}>বিভাগ</a>
          </div>
          <p style={{ fontSize: 13, color: "#475569" }}>© 2025 Promise Jobs. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
}

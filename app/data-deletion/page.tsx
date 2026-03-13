import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account & Data Deletion — Promise Jobs",
  description: "Request deletion of your Promise Jobs account and associated data.",
};

export default function DataDeletionPage() {
  return (
    <main style={{ fontFamily: "'Hind Siliguri', Arial, sans-serif", maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
      <header style={{ marginBottom: 32 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#047857", fontWeight: 700, fontSize: 14 }}>
          ← Promise Jobs হোম
        </Link>
        <h1 style={{ marginTop: 16, fontSize: 30, fontWeight: 900, color: "#0F172A" }}>Account & Data Deletion Request</h1>
        <p style={{ marginTop: 8, color: "#64748B", fontSize: 14 }}>How to permanently delete your account and exam data.</p>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 24, color: "#0F172A", fontSize: 15, lineHeight: 1.7 }}>
        <p>
          Promise Jobs ব্যবহারকারীদের গোপনীয়তাকে গুরুত্ব সহকারে বিবেচনা করে। আপনি যে কোনো সময় আপনার অ্যাকাউন্ট ও সংশ্লিষ্ট ডেটা মুছে ফেলার অনুরোধ করতে
          পারবেন।
        </p>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>আপনার থেকে যেসব তথ্য লাগবে</h2>
          <ul style={{ paddingLeft: 20, listStyle: "disc", color: "#111827" }}>
            <li>আপনার নাম (যদি প্রোফাইলে সেট করা থাকে)</li>
            <li>Promise Jobs অ্যাপে ব্যবহৃত মোবাইল নম্বর</li>
            <li>যদি সম্ভব হয়, আপনার অ্যাকাউন্ট আইডি / ইউজার আইডি (অ্যাপে প্রোফাইল স্ক্রিনে পাওয়া যেতে পারে)</li>
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>ডিলিট রিকুয়েস্ট পাঠানোর ঠিকানা</h2>
          <p>
            অনুগ্রহ করে নিচের ইমেইল এড্রেসে &quot;Account Deletion Request&quot; সাবজেক্ট দিয়ে আমাদের লিখুন এবং উপরের তথ্যগুলো যুক্ত করুন:
          </p>
          <p style={{ marginTop: 8 }}>
            ইমেইল:{" "}
            <a href="mailto:support@promisejobs.app?subject=Account%20Deletion%20Request" style={{ color: "#047857", textDecoration: "underline" }}>
              support@promisejobs.app
            </a>
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>আমরা কী মুছে ফেলব</h2>
          <ul style={{ paddingLeft: 20, listStyle: "disc", color: "#111827" }}>
            <li>আপনার অ্যাকাউন্ট ও লগইন তথ্য</li>
            <li>আপনার অংশ নেওয়া পরীক্ষার ফলাফল ও স্কোর</li>
            <li>লিডারবোর্ডে থাকা আপনার নাম/অবস্থান</li>
            <li>প্রোফাইল সম্পর্কিত অন্যান্য সনাক্তযোগ্য তথ্য</li>
          </ul>
          <p style={{ marginTop: 8 }}>
            কিছু ক্ষেত্রে আইনগত বা নিরাপত্তাজনিত কারণে নির্দিষ্ট তথ্য নির্দিষ্ট সময় পর্যন্ত সংরক্ষণ করা হতে পারে, তবে তা আমাদের Privacy Policy অনুযায়ী হবে।
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>প্রসেসিং টাইম</h2>
          <p>সাধারণত আমরা ৩০ দিনের মধ্যে আপনার রিকুয়েস্ট প্রক্রিয়া করি এবং কাজ সম্পন্ন হলে ইমেইলের মাধ্যমে নিশ্চিত করি।</p>
        </div>

        <div>
          <p style={{ marginTop: 8 }}>
            আমাদের Privacy Policy দেখতে চাইলে{" "}
            <Link href="/privacy-policy" style={{ color: "#047857", textDecoration: "underline" }}>
              এখানে ক্লিক করুন
            </Link>
            ।
          </p>
        </div>
      </section>
    </main>
  );
}


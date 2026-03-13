import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Promise Jobs",
  description: "Promise Jobs mobile app and website privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ fontFamily: "'Hind Siliguri', Arial, sans-serif", maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
      <header style={{ marginBottom: 32 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#047857", fontWeight: 700, fontSize: 14 }}>
          ← Promise Jobs হোম
        </Link>
        <h1 style={{ marginTop: 16, fontSize: 32, fontWeight: 900, color: "#0F172A" }}>Privacy Policy</h1>
        <p style={{ marginTop: 8, color: "#64748B", fontSize: 14 }}>Last updated: March 2025</p>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 24, color: "#0F172A", fontSize: 15, lineHeight: 1.7 }}>
        <p>
          Promise Jobs (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, and protect your
          information when you use the Promise Jobs mobile app and website.
        </p>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>১. আমরা কী তথ্য সংগ্রহ করি</h2>
          <ul style={{ paddingLeft: 20, listStyle: "disc", color: "#111827" }}>
            <li>মোবাইল নম্বর ও প্রোফাইল তথ্য (নাম, বিভাগ ইত্যাদি)</li>
            <li>ব্যবহারের ডেটা (যেমন: কোন পরীক্ষা দিলেন, স্কোর, র‍্যাংকিং)</li>
            <li>ডিভাইস সংক্রান্ত মৌলিক তথ্য (ডিভাইস মডেল, অ্যাপ ভার্সন, ক্র্যাশ রিপোর্ট)</li>
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>২. আমরা এসব তথ্য কীভাবে ব্যবহার করি</h2>
          <ul style={{ paddingLeft: 20, listStyle: "disc", color: "#111827" }}>
            <li>আপনার অ্যাকাউন্ট তৈরি ও পরিচয় নিশ্চিত করতে</li>
            <li>পরীক্ষার ফলাফল, লিডারবোর্ড ও অ্যানালিটিক্স দেখাতে</li>
            <li>অ্যাপ উন্নয়ন, বাগ ফিক্স ও নতুন ফিচার ডেভেলপমেন্টে</li>
            <li>গুরুত্বপূর্ণ নোটিফিকেশন ও সার্ভিস আপডেট পাঠাতে</li>
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>৩. তৃতীয় পক্ষের সার্ভিস</h2>
          <p>
            আমরা Firebase, Google Analytics ইত্যাদি তৃতীয় পক্ষের সার্ভিস ব্যবহার করতে পারি। এরা তাদের নিজস্ব Privacy Policy অনুসারে ডেটা
            প্রক্রিয়াকরণ করে।
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>৪. ডেটা সিকিউরিটি</h2>
          <p>
            আপনার ডেটা নিরাপদ রাখতে আমরা যুক্তিসঙ্গত টেকনিক্যাল ও অর্গানাইজেশনাল মেজার ব্যবহার করি। তবে ইন্টারনেটের মাধ্যমে সম্পূর্ণ নিরাপত্তা
            গ্যারান্টি দেওয়া সম্ভব নয়।
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>৫. শিশুদের গোপনীয়তা</h2>
          <p>
            Promise Jobs মূলত প্রাপ্তবয়স্ক ব্যবহারকারীদের জন্য ডিজাইন করা। যদি আপনি বুঝতে পারেন যে কোনো অপ্রাপ্তবয়স্ক ব্যবহারকারীর ডেটা আমাদের
            কাছে এসেছে, আমাদের সঙ্গে যোগাযোগ করুন; আমরা প্রয়োজনীয় ব্যবস্থা নেব।
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>৬. আপনার অধিকার</h2>
          <p>
            আপনি চাইলে আপনার অ্যাকাউন্ট ডিলিট বা নির্দিষ্ট ডেটা মুছে ফেলার অনুরোধ করতে পারেন। এ বিষয়ে সহায়তার জন্য নিচের ইমেইলে যোগাযোগ করুন।
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>৭. এই পলিসিতে পরিবর্তন</h2>
          <p>
            প্রয়োজন অনুযায়ী আমরা সময়ে সময়ে এই Privacy Policy আপডেট করতে পারি। বড় পরিবর্তন হলে আমরা অ্যাপ বা ওয়েবসাইটে নোটিফিকেশন দিয়ে জানাব।
          </p>
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>৮. যোগাযোগ</h2>
          <p>
            এই Privacy Policy সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের সঙ্গে যোগাযোগ করুন:
            <br />
            ইমেইল: <a href="mailto:support@promisejobs.app" style={{ color: "#047857", textDecoration: "underline" }}>support@promisejobs.app</a>
          </p>
        </div>
      </section>
    </main>
  );
}


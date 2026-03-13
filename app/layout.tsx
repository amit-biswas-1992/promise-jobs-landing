import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Promise Jobs — বাংলাদেশের সেরা চাকরির পরীক্ষা প্রস্তুতি",
  description: "BCS, Bank, Primary, NTRCA, Police, Railway — লাইভ পরীক্ষা, র‍্যান্ডম প্র্যাকটিস, লিডারবোর্ড",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "김민성 | Frontend Engineer Resume",
  description:
    "7년 차 프론트엔드 개발자 김민성의 경력기술서. React, Next.js, React Native, LangChain 기반 프로젝트 경험과 기술 역량을 소개합니다.",
  keywords: [
    "김민성",
    "Frontend Engineer",
    "경력기술서",
    "Resume",
    "Next.js",
    "React",
    "React Native",
    "LangChain",
    "Supabase",
    "프론트엔드 개발자",
  ],
  authors: [{ name: "김민성", url: "https://github.com/1nnovator1105" }],
  creator: "김민성",
  publisher: "김민성",
  openGraph: {
    title: "김민성 | Frontend Engineer Resume",
    description:
      "프론트엔드 개발자로서의 프로젝트 경험, 기술 역량, 협업 성과를 소개합니다.",
    url: "https://github.com/1nnovator1105",
    siteName: "김민성 Resume",
    images: [
      {
        url: "https://rpahjyrtfkrbplntumfr.supabase.co/storage/v1/object/public/images/info/s-shot.png",
        width: 1200,
        height: 630,
        alt: "김민성 Resume",
      },
    ],
    locale: "ko_KR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "김민성 | Frontend Engineer Resume",
    description:
      "7년 차 프론트엔드 개발자 김민성의 경력기술서. React, Next.js, AI 프로젝트 경험을 담았습니다.",
    images: [
      "https://rpahjyrtfkrbplntumfr.supabase.co/storage/v1/object/public/images/info/s-shot.png",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumBarunGothic@latest/nanumbarungothicsubset.css"
        ></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-nbg antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

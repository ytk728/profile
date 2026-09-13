import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeAuto from "./ThemeAuto";
import { DAY_START_HOUR, NIGHT_START_HOUR } from "./theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profile - ytk728",
  description: "Personal profile page of ytk728",
};

const themeScriptRunBeforeFirstPaint = `
(function () {
  try {
    var hour = new Date().getHours();
    var isDaytime = hour >= ${DAY_START_HOUR} && hour < ${NIGHT_START_HOUR};
    document.documentElement.classList.toggle('dark', !isDaytime);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script>{themeScriptRunBeforeFirstPaint}</script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeAuto />
        {children}
      </body>
    </html>
  );
}

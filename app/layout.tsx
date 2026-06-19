import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tranxfer Market — Coming Soon",
  description:
    "Built for scouts, coaches, players and agents to find and build valuable connections. Coming soon to Android and iPhone.",
  openGraph: {
    title: "Tranxfer Market — Coming Soon",
    description:
      "Built for scouts, coaches, players and agents to find and build valuable connections.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}

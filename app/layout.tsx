import type { Metadata } from "next";
import { Big_Shoulders, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  weight: ["600", "900"],
  subsets: ["latin"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-bricolage",
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
      className={`${bigShoulders.variable} ${bricolageGrotesque.variable} h-full scroll-smooth`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}

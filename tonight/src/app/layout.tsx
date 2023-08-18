import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LiveNavbar } from "@/components/Navbar";
import { LiveNavtabs } from "@/components/Navtabs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LiveNavbar />
        <LiveNavtabs />
        {children}
      </body>
    </html>
  );
}

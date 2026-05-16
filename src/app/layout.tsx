import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getData } from "@/lib/getData";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "JSON-driven portfolio website built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = getData();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <div className="flex min-h-full flex-col">
          <Navbar title={data.short_title.content} />
          <div className="flex-1">{children}</div>
          <Footer title={data.short_title.content} />
        </div>
      </body>
    </html>
  );
}

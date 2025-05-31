import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mega Mindz",
  description: "Megamindz is a personal growth app demo that combines AI-assisted journaling, voice-guided meditations, and habit tracking to help users master their mindset and routines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <header className="w-full px-8 py-3 border-b border-gray-200 flex items-center justify-between">
            <SidebarTrigger />
          </header>
          <div className="container mx-auto px-8 py-2">
            { children }
          </div>
        </main>
       </SidebarProvider>
      </body>
    </html>
  );
}

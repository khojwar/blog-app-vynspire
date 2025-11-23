import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import Header from "../components/Header";
import { Toaster } from 'react-hot-toast';
import ThemeRegistry from "@/components/ThemeProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App Vynspire",
  description: "A blog application built with Next.js and Redux Toolkit",
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
        <ThemeRegistry>
          <Providers>
            <Header />
            <Toaster position="top-right" />
            {children}
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}

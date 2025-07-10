import type { Metadata } from "next";
import "./globals.css";
import {  inglishenglosoftw8asc } from '@/components/hsciifp/hsciifonts'



export const metadata: Metadata = {
  title: "Superblog",
  description: "Superblog is a blog platform for the modern age.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> <body className={`${inglishenglosoftw8asc.className} antialiased`} >
        {children}
      </body>
    </html>
  );
}

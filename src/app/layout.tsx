import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { Footer } from "@/components/ui/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE } from "@/constants/site";
import "react-toastify/ReactToastify.css";
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
  title: SITE.name,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE.locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-gray-950 font-sans text-slate-50">
        {children}
        {/* Fora do <main> de propósito: um <footer> aninhado dentro de main
            perde o landmark de contentinfo e some da navegação por região. */}
        <Footer />
        <WhatsAppButton />
        {/* No layout, e não dentro do formulário: o container é o lugar onde o
            toast é desenhado, e ele precisa sobreviver ao reset do form. O
            react-toastify já marca este componente como "use client", então o
            layout continua sendo Server Component.
            bottom-left pra não cair embaixo do botão do WhatsApp, que é fixed
            no canto direito. */}
        <ToastContainer position="bottom-left" theme="colored" />
      </body>
    </html>
  );
}

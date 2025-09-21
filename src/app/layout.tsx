import "./globals.css";
import { Toaster } from 'sonner'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionAuthProvider } from "@/components/session-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Treina Dev",
  description: "Criando SAAS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionAuthProvider>
          <Toaster duration={2500} />
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  );
}

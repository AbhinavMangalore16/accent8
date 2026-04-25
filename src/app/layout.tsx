import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/client";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accent8.ai | Voices with Soul",
  description: "The India-First high-fidelity Text-to-Speech platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
      <html lang="en">
        <body
          className={`${inter.variable} antialiased`}
        >
          {children}
        </body>
      </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/client";
import { AgeGateProvider } from "../../providers/AgeGuardrail";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accent8 | Voices with Soul",
  description: "The India-First high-fidelity Text-to-Speech platform.",
  icons: {
    icon: [{ url: "/Accent8-wbg.png", type: "image/png" }],
    shortcut: ["/Accent8-wbg.png"],
    apple: ["/Accent8-wbg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <AgeGateProvider>
      <html lang="en">
        <body
          className={`${inter.variable} antialiased`}
        >
          {children}
        </body>
      </html>
      </AgeGateProvider>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
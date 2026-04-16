import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Accent8",
  description: "The complete spectrum of neural speech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className={cn("h-full light", inter.variable)}>
      <body 
        className={cn(
          "min-h-full flex flex-col antialiased font-sans", 
          inter.className 
        )}
      >
        {children}
        <Toaster/>
      </body>
    </html>
    </ClerkProvider>
  );
}
import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetLuma Companion Identity",
  description: "Create a premium digital companion card for your pet.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "PetLuma Companion Identity",
    description: "A premium digital companion card for your pet.",
    siteName: "PetLuma",
    type: "website",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cinzel",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} ${cinzel.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

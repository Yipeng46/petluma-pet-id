import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetLuma Pet ID",
  description: "Create a premium digital identity card for your pet.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "PetLuma Pet ID",
    description: "A digital identity card for your furry family member.",
    siteName: "PetLuma",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}

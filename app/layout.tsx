import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kazinaut",
  description: "Kazinaut, le casino trop rigolo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased font-body">{children}</body>
    </html>
  );
}

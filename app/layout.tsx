import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/provider";
import { Toaster } from "@/components/ui/toaster";
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
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased font-body">
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
          <Toaster />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

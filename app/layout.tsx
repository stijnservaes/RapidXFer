import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RapidXFer",
  description: "Transfer files quickly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen items-center justify-center">
        {children}
      </body>
    </html>
  );
}

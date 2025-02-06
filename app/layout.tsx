import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

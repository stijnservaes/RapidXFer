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
        <main className="container h-4/5 bg-zinc-200 dark:bg-zinc-800  rounded-2xl p-14 shadow-2xl">{children}</main>
      </body>
    </html>
  );
}

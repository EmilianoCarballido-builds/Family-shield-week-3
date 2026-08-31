import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Family Shield | Verify before SPEI",
  description:
    "A fictional bank-sponsored prototype for independent family verification before an urgent SPEI transfer.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

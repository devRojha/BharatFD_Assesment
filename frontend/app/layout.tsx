import type { Metadata } from "next";

import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
export const metadata: Metadata = {
  title: "FAQs",
  description: "BharatFD Assesment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

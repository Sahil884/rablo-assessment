import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "Assessment App",
  description: "Next.js Frontend Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}

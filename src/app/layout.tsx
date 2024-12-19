import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "GalantAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        {children}
      </body>
    </html>
  );
}

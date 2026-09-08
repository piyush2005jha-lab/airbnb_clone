import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "Airbnb inspired rental marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body>
        {children}
      </body>

    </html>
  );
}
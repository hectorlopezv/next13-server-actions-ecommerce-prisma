"use client";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import "./globals.css";
import { Nunito } from "next/font/google";

import { SessionProvider } from "next-auth/react";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App with Tailwind CSS and next server actions",
  description: "next 13 server actions demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <SessionProvider>
          <NavBar />
          <main className="p-4 max-w-7xl m-auto min-w-[300px]">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

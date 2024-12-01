import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./_components/nav-bar";
import Footer from "./_components/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Medical Appointment Booking",
  description: "Book your medical appointment with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-gray-100`}>
        <NavBar />
        <Toaster className="bg-white text-black" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PlanProvider } from "./context/PlanContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <PlanProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
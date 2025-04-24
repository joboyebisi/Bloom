import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { ModelProvider } from "@/context/model-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLOOM Dental 3D - AI-Aided 3D/VR Content Authoring for Dental Educators",
  description: "Create 3D Models from your dental image bank that can be used for teaching on VR-Haptics Dental Simulators, VR Headsets or for teaching in classroom",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModelProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </ModelProvider>
      </body>
    </html>
  );
}

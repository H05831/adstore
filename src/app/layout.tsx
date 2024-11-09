import { auth } from "@/auth";
import Footer from "@/components/Footer";
import NetworkStatusProvider from "@/components/NetworkStatusProvider";
import Provider from "@/components/Provider";
import { constructMetadata } from "@/lib/metadata";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import LoginModal from "../components/auth/modals/LoginModal";
import RegisterModal from "../components/auth/modals/RegisterModal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full">
      <body className="w-full h-full">
        <Provider>
          <SessionProvider session={await auth()}>
            <NetworkStatusProvider>
              <Toaster position="top-center" richColors />
              <LoginModal />
              <RegisterModal />
              <main className="w-full h-full flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
                {children}
              </main>
              <Footer />
            </NetworkStatusProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ChatContextProvider from "@/context/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatter",
  description: "Chat application | Chatter",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
    return (
      <html lang="en">
        <body className={inter.className}>
          <ChatContextProvider>
            <main className="dark flex h-screen w-screen flex-col overflow-hidden bg-background text-white">
              <Toaster theme="dark" richColors position="top-right" />
              {children}
            </main>
          </ChatContextProvider>
        </body>
      </html>
    );

  return "loading";
}

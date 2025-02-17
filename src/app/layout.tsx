import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/web3/web3-provider";
import { ConnectWallet } from '@/components/web3/connect-wallet'
import Link from 'next/link'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BlockQuest",
  description: "Web3 Quest and Reward Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#FFFBF5]">
        <Web3Provider>
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b-4 border-black">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-black hover:text-primary transition-colors">
                  BlockQuest
                </Link>
                <ConnectWallet />
              </div>
            </div>
          </header>

          {children}
        </Web3Provider>
      </body>
    </html>
  );
}

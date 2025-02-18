'use client'

import { BrutalButton } from '@/components/ui/brutal-button'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { isConnected, address } = useAccount()

  return (
    <main className="min-h-screen bg-[#FFFBF5] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 pt-20">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <div className="inline-block mb-8 px-6 py-2 bg-accent text-white font-bold border-4 border-black shadow-brutal transform -rotate-2 hover:rotate-0 transition-transform">
              Web3 Quest and Reward Platform
            </div>
            
            <h1 className="mb-8 text-7xl font-black text-black leading-tight">
              Blockchain
              <span className="block text-8xl bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                Adventure
              </span>
            </h1>
            
            <p className="mb-12 text-xl text-gray-600 max-w-xl">
              Complete testnet quests, earn points, collect NFTs and make your mark in the blockchain world!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <BrutalButton size="lg" className="group">
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  Start Quest →
                </span>
              </BrutalButton>
              <BrutalButton variant="secondary" size="lg" className="group">
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                  How it Works?
                </span>
              </BrutalButton>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="p-4 bg-white border-4 border-black shadow-brutal">
                <div className="text-3xl font-black text-primary">1.2K+</div>
                <div className="text-sm font-bold">Active Users</div>
              </div>
              <div className="p-4 bg-white border-4 border-black shadow-brutal">
                <div className="text-3xl font-black text-accent">50+</div>
                <div className="text-sm font-bold">Quests</div>
              </div>
              <div className="p-4 bg-white border-4 border-black shadow-brutal">
                <div className="text-3xl font-black text-secondary">100K</div>
                <div className="text-sm font-bold">Tokens</div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D or Illustration */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl transform rotate-6 scale-95"></div>
            <div className="relative p-8 bg-white border-4 border-black shadow-brutal">
              {/* Example Quest Card */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">🎯 Active Quest</h3>
                  <span className="px-3 py-1 bg-secondary/20 text-black font-bold rounded-full">500 Points</span>
                </div>
                <p className="text-gray-600 mb-4">Complete your first transaction on Arbitrum Sepolia testnet!</p>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div className="w-2/3 bg-primary h-2 rounded-full"></div>
                </div>
              </div>

              {/* Example NFT Reward */}
              <div className="p-4 bg-accent/10 border-2 border-black">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent/20 border-2 border-black flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Special NFT Reward</h4>
                    <p className="text-sm text-gray-600">Exclusive for first 100 quest completions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

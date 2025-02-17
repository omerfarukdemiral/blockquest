'use client'

import { BrutalButton } from '@/components/ui/brutal-button'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-black mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quests Card */}
          <Link href="/quests" className="group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform group-hover:rotate-6 transition-transform"></div>
              <div className="relative p-8 bg-white border-4 border-black shadow-brutal group-hover:-translate-y-2 transition-transform">
                <h2 className="text-2xl font-bold mb-4">Quests</h2>
                <p className="text-gray-600 mb-4">Complete tasks and earn points</p>
                <BrutalButton>View Quests →</BrutalButton>
              </div>
            </div>
          </Link>

          {/* Profile Card */}
          <Link href="/profile" className="group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/10 rounded-3xl transform group-hover:rotate-6 transition-transform"></div>
              <div className="relative p-8 bg-white border-4 border-black shadow-brutal group-hover:-translate-y-2 transition-transform">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                <p className="text-gray-600 mb-4">View your progress and rewards</p>
                <BrutalButton variant="secondary">View Profile →</BrutalButton>
              </div>
            </div>
          </Link>

          {/* Marketplace Card */}
          <Link href="/marketplace" className="group">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/10 rounded-3xl transform group-hover:rotate-6 transition-transform"></div>
              <div className="relative p-8 bg-white border-4 border-black shadow-brutal group-hover:-translate-y-2 transition-transform">
                <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
                <p className="text-gray-600 mb-4">Spend your tokens on rewards</p>
                <BrutalButton variant="accent">Visit Market →</BrutalButton>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white border-4 border-black shadow-brutal">
            <div className="text-4xl font-black text-primary mb-2">0</div>
            <div className="text-sm font-bold">Completed Quests</div>
          </div>
          <div className="p-6 bg-white border-4 border-black shadow-brutal">
            <div className="text-4xl font-black text-accent mb-2">0</div>
            <div className="text-sm font-bold">Total Points</div>
          </div>
          <div className="p-6 bg-white border-4 border-black shadow-brutal">
            <div className="text-4xl font-black text-secondary mb-2">0</div>
            <div className="text-sm font-bold">Tokens Earned</div>
          </div>
          <div className="p-6 bg-white border-4 border-black shadow-brutal">
            <div className="text-4xl font-black text-primary mb-2">0</div>
            <div className="text-sm font-bold">NFTs Collected</div>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import { BrutalButton } from '@/components/ui/brutal-button'

export default function Quests() {
  const quests = [
    {
      id: 1,
      title: 'First Transaction',
      description: 'Complete your first transaction on Arbitrum Sepolia testnet',
      points: 500,
      progress: 0,
      status: 'active',
    },
    {
      id: 2,
      title: 'Social Share',
      description: 'Share your progress on Twitter',
      points: 200,
      progress: 0,
      status: 'active',
    },
    {
      id: 3,
      title: 'NFT Collection',
      description: 'Mint your first NFT on testnet',
      points: 1000,
      progress: 0,
      status: 'locked',
    },
  ]

  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black">Quests</h1>
          <div className="flex gap-4">
            <BrutalButton variant="secondary">Active</BrutalButton>
            <BrutalButton variant="accent">Completed</BrutalButton>
          </div>
        </div>

        <div className="grid gap-6">
          {quests.map((quest) => (
            <div key={quest.id} className="relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform group-hover:rotate-2 transition-transform"></div>
              <div className="relative p-8 bg-white border-4 border-black shadow-brutal">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{quest.title}</h2>
                    <p className="text-gray-600">{quest.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-4 py-2 bg-primary/20 text-black font-bold rounded-full mb-2">
                      {quest.points} Points
                    </span>
                    {quest.status === 'locked' ? (
                      <span className="px-4 py-2 bg-gray-200 text-gray-600 font-bold rounded-full">
                        Locked
                      </span>
                    ) : (
                      <BrutalButton>Start Quest</BrutalButton>
                    )}
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${quest.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
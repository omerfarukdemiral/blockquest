'use client'

import { BrutalButton } from '@/components/ui/brutal-button'

export default function Profile() {
  const userStats = {
    level: 5,
    totalPoints: 2500,
    tokensEarned: 100,
    nftsCollected: 2,
  }

  const achievements = [
    {
      id: 1,
      title: 'Early Adopter',
      description: 'Joined during platform launch',
      icon: '🌟',
    },
    {
      id: 2,
      title: 'Transaction Master',
      description: 'Completed 10 transactions',
      icon: '💎',
    },
  ]

  const nfts = [
    {
      id: 1,
      name: 'Genesis Badge',
      rarity: 'Rare',
      image: '🏆',
    },
    {
      id: 2,
      name: 'Quest Champion',
      rarity: 'Epic',
      image: '🎮',
    },
  ]

  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Profile Header */}
        <div className="mb-12 p-8 bg-white border-4 border-black shadow-brutal relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="relative flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-black mb-4">Your Profile</h1>
              <p className="text-gray-600 mb-6">Level {userStats.level} Explorer</p>
              <div className="flex gap-4">
                <BrutalButton>Edit Profile</BrutalButton>
                <BrutalButton variant="secondary">Share Profile</BrutalButton>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block px-6 py-2 bg-primary/20 text-black font-bold border-4 border-black transform -rotate-2">
                {userStats.totalPoints} Total Points
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stats Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white border-4 border-black shadow-brutal">
                <div className="text-4xl font-black text-primary mb-2">{userStats.tokensEarned}</div>
                <div className="text-sm font-bold">Tokens Earned</div>
              </div>
              <div className="p-6 bg-white border-4 border-black shadow-brutal">
                <div className="text-4xl font-black text-accent mb-2">{userStats.nftsCollected}</div>
                <div className="text-sm font-bold">NFTs Collected</div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="p-6 bg-white border-4 border-black shadow-brutal flex items-center gap-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-bold">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NFT Collection */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">NFT Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {nfts.map((nft) => (
                <div key={nft.id} className="p-6 bg-white border-4 border-black shadow-brutal">
                  <div className="text-6xl mb-4 flex justify-center">{nft.image}</div>
                  <h3 className="font-bold text-center mb-2">{nft.name}</h3>
                  <p className="text-center text-sm text-primary font-bold">{nft.rarity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
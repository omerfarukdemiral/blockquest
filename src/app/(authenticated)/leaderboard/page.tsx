'use client'

import { BrutalButton } from '@/components/ui/brutal-button'

export default function Leaderboard() {
  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      username: 'CryptoKing',
      points: 15000,
      questsCompleted: 45,
      nftsCollected: 8,
      avatar: '👑',
    },
    {
      id: 2,
      rank: 2,
      username: 'BlockMaster',
      points: 12500,
      questsCompleted: 38,
      nftsCollected: 6,
      avatar: '🎮',
    },
    {
      id: 3,
      rank: 3,
      username: 'Web3Explorer',
      points: 10000,
      questsCompleted: 32,
      nftsCollected: 5,
      avatar: '🚀',
    },
    {
      id: 4,
      rank: 4,
      username: 'TokenHunter',
      points: 8500,
      questsCompleted: 28,
      nftsCollected: 4,
      avatar: '🎯',
    },
    {
      id: 5,
      rank: 5,
      username: 'QuestChampion',
      points: 7000,
      questsCompleted: 25,
      nftsCollected: 3,
      avatar: '🏆',
    },
  ]

  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">Leaderboard</h1>
            <p className="text-gray-600">Top performers and their achievements</p>
          </div>
          <div className="flex gap-4">
            <BrutalButton>Weekly</BrutalButton>
            <BrutalButton variant="secondary">Monthly</BrutalButton>
            <BrutalButton variant="accent">All Time</BrutalButton>
          </div>
        </div>

        {/* Top 3 Players */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {leaderboardData.slice(0, 3).map((player) => (
            <div key={player.id} className="relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform group-hover:rotate-3 transition-transform"></div>
              <div className="relative p-8 bg-white border-4 border-black shadow-brutal text-center">
                <div className="text-6xl mb-4">{player.avatar}</div>
                <div className="text-xl font-bold mb-2">{player.username}</div>
                <div className="text-4xl font-black text-primary mb-4">
                  {player.points.toLocaleString()} pts
                </div>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-accent/20 rounded-full">
                    {player.questsCompleted} Quests
                  </span>
                  <span className="px-3 py-1 bg-primary/20 rounded-full">
                    {player.nftsCollected} NFTs
                  </span>
                </div>
                {player.rank === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-primary text-white font-bold border-4 border-black">
                    #1 Leader
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white border-4 border-black shadow-brutal overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">Player</th>
                <th className="px-6 py-4 text-right">Points</th>
                <th className="px-6 py-4 text-right hidden md:table-cell">Quests</th>
                <th className="px-6 py-4 text-right hidden md:table-cell">NFTs</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player) => (
                <tr key={player.id} className="border-b-2 border-black/10 hover:bg-primary/5">
                  <td className="px-6 py-4">
                    <span className="font-bold">#{player.rank}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{player.avatar}</span>
                      <span className="font-bold">{player.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-primary">
                    {player.points.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right hidden md:table-cell">
                    {player.questsCompleted}
                  </td>
                  <td className="px-6 py-4 text-right hidden md:table-cell">
                    {player.nftsCollected}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <BrutalButton variant="secondary">Load More Players</BrutalButton>
        </div>
      </div>
    </div>
  )
} 
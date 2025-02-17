'use client'

import { BrutalButton } from '@/components/ui/brutal-button'

export default function Marketplace() {
  const items = [
    {
      id: 1,
      name: 'Genesis NFT',
      description: 'Limited edition NFT for early adopters',
      price: 1000,
      image: '🎨',
      type: 'nft',
    },
    {
      id: 2,
      name: 'Quest Booster',
      description: '2x points for your next 5 quests',
      price: 500,
      image: '🚀',
      type: 'boost',
    },
    {
      id: 3,
      name: 'Rare Badge',
      description: 'Show off your achievements with this rare badge',
      price: 750,
      image: '🏅',
      type: 'badge',
    },
    {
      id: 4,
      name: 'Mystery Box',
      description: 'Contains random rewards and surprises',
      price: 300,
      image: '🎁',
      type: 'mystery',
    },
  ]

  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">Marketplace</h1>
            <p className="text-gray-600">Spend your tokens on exclusive rewards</p>
          </div>
          <div className="px-6 py-2 bg-primary/20 text-black font-bold border-4 border-black">
            1000 Tokens Available
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8">
          <BrutalButton>All Items</BrutalButton>
          <BrutalButton variant="secondary">NFTs</BrutalButton>
          <BrutalButton variant="accent">Boosts</BrutalButton>
          <BrutalButton variant="white">Badges</BrutalButton>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform group-hover:rotate-3 transition-transform"></div>
              <div className="relative p-8 bg-white border-4 border-black shadow-brutal">
                <div className="text-6xl mb-6 flex justify-center">{item.image}</div>
                <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-4 py-2 bg-primary/20 text-black font-bold rounded-full">
                    {item.price} Tokens
                  </span>
                  <BrutalButton>Purchase</BrutalButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Featured Items</h2>
          <div className="p-8 bg-white border-4 border-black shadow-brutal relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="relative flex items-center gap-8">
              <div className="text-8xl">👑</div>
              <div>
                <h3 className="text-3xl font-bold mb-2">Legendary Crown NFT</h3>
                <p className="text-gray-600 mb-4">
                  Exclusive NFT for the top performers. Only available for a limited time!
                </p>
                <div className="flex items-center gap-4">
                  <span className="px-6 py-2 bg-primary/20 text-black font-bold border-4 border-black">
                    5000 Tokens
                  </span>
                  <BrutalButton variant="accent">Purchase Now</BrutalButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
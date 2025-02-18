'use client'

import { BrutalButton } from '@/components/ui/brutal-button'
import { useQuests } from '@/hooks/useQuests'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAccount } from 'wagmi'

interface UserProfile {
  username: string | null
  avatar_url: string | null
  points: number
  level: number
  created_at: string
}

export default function Profile() {
  const { address } = useAccount()
  const { quests, userPoints } = useQuests()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Kullanıcı profilini getir
  useEffect(() => {
    const fetchProfile = async () => {
      if (!address) return

      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('wallet_address', address)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (err) {
        console.error('Profil getirme hatası:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [address])

  // Tamamlanan questleri filtrele
  const completedQuests = quests.filter(quest => 
    quest.userProgress?.status === 'COMPLETED'
  )

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-lg mb-8"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Profile Header */}
        <div className="mb-12 p-8 bg-white border-4 border-black shadow-brutal relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="relative flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-black mb-4">
                {profile?.username || 'Anonim Kullanıcı'}
              </h1>
              <p className="text-gray-600 mb-6">Level {profile?.level || 1} Explorer</p>
              <div className="flex gap-4">
                <BrutalButton>Edit Profile</BrutalButton>
                <BrutalButton variant="secondary">Share Profile</BrutalButton>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block px-6 py-2 bg-primary/20 text-black font-bold border-4 border-black transform -rotate-2">
                {userPoints} Total BQ
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stats Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">İstatistikler</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white border-4 border-black shadow-brutal">
                <div className="text-4xl font-black text-primary mb-2">
                  {completedQuests.length}
                </div>
                <div className="text-sm font-bold">Tamamlanan Görevler</div>
              </div>
              <div className="p-6 bg-white border-4 border-black shadow-brutal">
                <div className="text-4xl font-black text-accent mb-2">
                  {profile?.level || 1}
                </div>
                <div className="text-sm font-bold">Seviye</div>
              </div>
            </div>
          </div>

          {/* Completed Quests Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Tamamlanan Görevler</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {completedQuests.map((quest) => (
                <div key={quest.id} className="p-4 bg-white border-4 border-black shadow-brutal">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{quest.title}</h3>
                      <p className="text-gray-600 text-sm">{quest.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/20 text-black font-bold rounded-full text-sm">
                      {quest.points} BQ
                    </span>
                  </div>
                </div>
              ))}
              {completedQuests.length === 0 && (
                <div className="p-4 bg-white border-4 border-black shadow-brutal">
                  <p className="text-gray-600 text-center">Henüz tamamlanmış görev yok</p>
                </div>
              )}
            </div>
          </div>

          {/* NFT Collection - Mock Data */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">NFT Koleksiyonu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 1, name: 'Genesis Badge', rarity: 'Rare', image: '🏆' },
                { id: 2, name: 'Quest Champion', rarity: 'Epic', image: '🎮' }
              ].map((nft) => (
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
'use client'

import { BrutalButton } from '@/components/ui/brutal-button'
import { useQuests } from '@/hooks/useQuests'
import { QuestStatus, QuestType } from '@/types/quest'
import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import { toast } from 'sonner'

export default function Quests() {
  const { quests, loading, error, startQuest, verifyQuest, collectPoints } = useQuests()
  const [filter, setFilter] = useState<QuestStatus | 'ALL'>('ALL')
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({})
  const [showConfetti, setShowConfetti] = useState(false)
  const [collectedPoints, setCollectedPoints] = useState<number | null>(null)
  const [collectedPosition, setCollectedPosition] = useState<{ x: number, y: number } | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: Record<string, number> = {}
      
      quests.forEach(quest => {
        if (quest.type === 'POINT_COLLECTION' && quest.userProgress?.lastCollectedAt) {
          const lastCollected = new Date(quest.userProgress.lastCollectedAt)
          const nextAvailable = new Date(lastCollected.getTime() + 3 * 60 * 1000)
          const now = new Date()
          const diff = nextAvailable.getTime() - now.getTime()
          newTimeLeft[quest.id] = Math.max(0, diff)
        }
      })
      
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [quests])

  const handleCollectPoints = async (questId: string, event: React.MouseEvent) => {
    const result = await collectPoints(questId)
    
    if (result.success) {
      // Konfeti efektini göster
      setShowConfetti(true)
      
      // Tıklanan butonun pozisyonunu al
      const rect = (event.target as HTMLElement).getBoundingClientRect()
      setCollectedPosition({
        x: rect.left + rect.width / 2,
        y: rect.top
      })
      
      // Toplanan puanı göster
      setCollectedPoints(result.points)
      
      // Toast mesajını göster
      toast.success(`${result.points} BQ kazandınız!`)
      
      // 3 saniye sonra efektleri temizle
      setTimeout(() => {
        setShowConfetti(false)
        setCollectedPoints(null)
        setCollectedPosition(null)
      }, 3000)
    } else {
      toast.error(result.message)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="animate-pulse">
            <div className="h-10 w-48 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="p-6 bg-red-50 border-2 border-red-500 rounded-lg">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const filteredQuests = quests.filter(quest => {
    if (filter === 'ALL') return true
    return quest.userProgress?.status === filter
  })

  const handleStartQuest = async (questId: string) => {
    try {
      await startQuest(questId)
    } catch (err) {
      console.error('Quest başlatma hatası:', err)
    }
  }

  const getQuestButton = (quest: any) => {
    switch (quest.type) {
      case 'POINT_COLLECTION':
        const timeLeftForQuest = timeLeft[quest.id] || 0
        const canCollect = timeLeftForQuest === 0
        return (
          <BrutalButton 
            onClick={(e) => handleCollectPoints(quest.id, e)}
            disabled={!canCollect}
            size="sm"
          >
            {canCollect ? 'Puanları Topla' : `${Math.ceil(timeLeftForQuest / 1000)} saniye kaldı`}
          </BrutalButton>
        )

      case 'SOCIAL_FOLLOW':
        if (quest.userProgress?.status === 'COMPLETED') {
          return (
            <span className="px-4 py-2 bg-green-500 text-white font-bold rounded-full text-sm">
              Tamamlandı
            </span>
          )
        }
        return (
          <div className="flex gap-2">
            <BrutalButton 
              onClick={() => window.open('https://x.com/F1', '_blank')}
              size="sm"
              variant="secondary"
            >
              X'e Git
            </BrutalButton>
            <BrutalButton 
              onClick={() => verifyQuest(quest.id)}
              size="sm"
            >
              Takibi Doğrula
            </BrutalButton>
          </div>
        )

      case 'DISCORD_JOIN':
        if (quest.userProgress?.status === 'COMPLETED') {
          return (
            <span className="px-4 py-2 bg-green-500 text-white font-bold rounded-full text-sm">
              Tamamlandı
            </span>
          )
        }
        return (
          <div className="flex gap-2">
            <BrutalButton 
              onClick={() => window.open('https://discord.gg/formula1', '_blank')}
              size="sm"
              variant="secondary"
            >
              Discord'a Git
            </BrutalButton>
            <BrutalButton 
              onClick={() => verifyQuest(quest.id)}
              size="sm"
            >
              Katılımı Doğrula
            </BrutalButton>
          </div>
        )

      case 'PROFILE_SETUP':
        if (quest.userProgress?.status === 'COMPLETED') {
          return (
            <span className="px-4 py-2 bg-green-500 text-white font-bold rounded-full text-sm">
              Tamamlandı
            </span>
          )
        }
        return (
          <BrutalButton 
            onClick={() => window.location.href = '/profile'}
            size="sm"
          >
            Profile Git
          </BrutalButton>
        )

      default:
        return null
    }
  }

  const getProgressBar = (quest: any) => {
    switch (quest.type) {
      case 'POINT_COLLECTION':
        const timeLeftForQuest = timeLeft[quest.id] || 0
        const totalTime = 3 * 60 * 1000 // 3 dakika
        const elapsedTime = totalTime - timeLeftForQuest
        const progress = (elapsedTime / totalTime) * 100

        return (
          <div className="w-full">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Sonraki BQ: {Math.ceil(timeLeftForQuest / 1000)} saniye</span>
              <span>{quest.points} BQ</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )

      case 'PROFILE_SETUP':
        return (
          <div className="flex gap-2 mb-3">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${quest.userProgress?.progress && quest.userProgress.progress >= (step * 33.33) ? '100%' : '0%'}` 
                  }}
                ></div>
              </div>
            ))}
          </div>
        )

      default:
        return (
          <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${quest.userProgress?.progress || 0}%` }}
            ></div>
          </div>
        )
    }
  }

  return (
    <div className="p-8">
      {/* Konfeti efekti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* Toplanan puan animasyonu */}
      {collectedPoints && collectedPosition && (
        <div
          className="fixed pointer-events-none text-2xl font-bold text-primary animate-float-up"
          style={{
            left: collectedPosition.x,
            top: collectedPosition.y,
          }}
        >
          +{collectedPoints}
        </div>
      )}

      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-black">Görevler</h1>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <BrutalButton 
              variant={filter === 'ALL' ? 'primary' : 'secondary'}
              onClick={() => setFilter('ALL')}
              size="sm"
            >
              Tümü
            </BrutalButton>
            <BrutalButton 
              variant={filter === 'IN_PROGRESS' ? 'primary' : 'secondary'}
              onClick={() => setFilter('IN_PROGRESS')}
              size="sm"
            >
              Devam Eden
            </BrutalButton>
            <BrutalButton 
              variant={filter === 'COMPLETED' ? 'primary' : 'secondary'}
              onClick={() => setFilter('COMPLETED')}
              size="sm"
            >
              Tamamlanan
            </BrutalButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuests.map((quest) => (
            <div key={quest.id} className="relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform group-hover:rotate-2 transition-transform"></div>
              <div className="relative p-6 bg-white border-4 border-black shadow-brutal h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2 flex-wrap">
                        <h2 className="text-xl font-bold">{quest.title}</h2>
                        <span className="px-2 py-1 text-sm bg-primary/20 text-black font-bold rounded-full">
                          {quest.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{quest.description}</p>
                    </div>
                    <div className="flex flex-col items-end ml-4">
                      <span className="px-3 py-1 bg-primary/20 text-black font-bold rounded-full text-sm mb-2 whitespace-nowrap">
                        {quest.points} BQ
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    {getProgressBar(quest)}
                    <div className="flex justify-end">
                      {getQuestButton(quest)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
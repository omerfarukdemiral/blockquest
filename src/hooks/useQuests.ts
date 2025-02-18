'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Quest, QuestWithProgress, UserQuest } from '@/types/quest'
import { useAccount } from 'wagmi'
import { QuestVerificationService } from '@/services/quest-verification'

export function useQuests() {
  const { address } = useAccount()
  const [quests, setQuests] = useState<QuestWithProgress[]>([])
  const [userPoints, setUserPoints] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)

  // Kullanıcı puanlarını güncelle
  const updateUserPoints = async (pointsToAdd: number) => {
    if (!address) return

    try {
      const now = new Date().toISOString()

      // Puan toplama kaydı ekle
      const { error: logError } = await supabase
        .from('point_collections')
        .insert([
          {
            user_id: address,
            points: pointsToAdd,
            created_at: now
          }
        ])

      if (logError) throw logError

      // Toplam puanları yeniden hesapla
      return await fetchUserPoints()
    } catch (err) {
      console.error('Puan güncelleme hatası:', err)
      throw err
    }
  }

  // Kullanıcı puanlarını getir
  const fetchUserPoints = async () => {
    if (!address) return

    try {
      // Point collections tablosundan toplam puanları hesapla
      const { data, error } = await supabase
        .from('point_collections')
        .select('points')
        .eq('user_id', address)

      if (error) throw error
      
      // Toplam puanları hesapla
      const totalPoints = data?.reduce((sum, record) => sum + (record.points || 0), 0) || 0
      setUserPoints(totalPoints)

      // Users tablosunu da güncelle
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          points: totalPoints,
          updated_at: new Date().toISOString()
        })
        .eq('wallet_address', address)

      if (updateError) {
        console.error('Users tablosu puan güncelleme hatası:', updateError)
      }

      return totalPoints
    } catch (err) {
      console.error('Puan getirme hatası:', err)
      setUserPoints(0)
      return 0
    }
  }

  // Quest'leri ve kullanıcının ilerlemesini getir
  const fetchQuests = async () => {
    try {
      setLoading(true)
      setError(null)

      await fetchUserPoints() // Kullanıcı puanlarını da getir

      // Önce tüm quest'leri getir
      const { data: questsData, error: questsError } = await supabase
        .from('quests')
        .select('*')
        .order('category', { ascending: true })
        .order('points', { ascending: true })

      if (questsError) throw questsError

      if (!address) {
        setQuests(questsData as QuestWithProgress[])
        return
      }

      // Kullanıcının quest ilerlemelerini getir
      const { data: userQuestsData, error: userQuestsError } = await supabase
        .from('user_quests')
        .select('*')
        .eq('user_id', address)

      if (userQuestsError) throw userQuestsError

      // Quest'leri kullanıcı ilerlemeleriyle birleştir
      const questsWithProgress = questsData.map((quest: Quest) => {
        const userQuest = userQuestsData?.find(uq => uq.quest_id === quest.id)
        return {
          ...quest,
          userProgress: userQuest ? {
            status: userQuest.status,
            progress: userQuest.progress,
            completedAt: userQuest.completed_at,
            lastCollectedAt: userQuest.last_collected_at
          } : undefined
        }
      })

      setQuests(questsWithProgress)
    } catch (err) {
      console.error('Quest getirme hatası:', err)
      setError('Quest\'ler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  // Quest'i başlat
  const startQuest = async (questId: string) => {
    if (!address) return

    try {
      const quest = quests.find(q => q.id === questId)
      if (!quest) throw new Error('Quest bulunamadı')

      // Ön koşulları kontrol et
      if (quest.requirements.prerequisiteQuests?.length) {
        const prerequisitesMet = await checkPrerequisites(quest.requirements.prerequisiteQuests)
        if (!prerequisitesMet) {
          throw new Error('Önce gerekli quest\'leri tamamlamalısınız')
        }
      }

      const { data: existingQuest, error: checkError } = await supabase
        .from('user_quests')
        .select('*')
        .eq('user_id', address)
        .eq('quest_id', questId)
        .single()

      if (checkError && checkError.code !== 'PGRST116') throw checkError

      if (existingQuest) {
        console.log('Quest zaten başlatılmış')
        return
      }

      const { error: insertError } = await supabase
        .from('user_quests')
        .insert([
          {
            user_id: address,
            quest_id: questId,
            status: 'IN_PROGRESS',
            progress: 0,
            started_at: new Date().toISOString(),
            last_updated_at: new Date().toISOString()
          }
        ])

      if (insertError) throw insertError

      // Otomatik doğrulama gerektiren quest'ler için hemen kontrol yap
      if (quest.verificationMethod.type === 'AUTOMATIC') {
        await verifyQuest(questId)
      }

      await fetchQuests()
    } catch (err) {
      console.error('Quest başlatma hatası:', err)
      throw err
    }
  }

  // Quest ön koşullarını kontrol et
  const checkPrerequisites = async (prerequisiteQuestIds: string[]): Promise<boolean> => {
    if (!address) return false

    const { data, error } = await supabase
      .from('user_quests')
      .select('*')
      .eq('user_id', address)
      .eq('status', 'COMPLETED')
      .in('quest_id', prerequisiteQuestIds)

    if (error) throw error
    return data.length === prerequisiteQuestIds.length
  }

  // Quest'i doğrula ve puanları ver
  const verifyQuest = async (questId: string) => {
    if (!address || verifying) return

    try {
      setVerifying(true)
      const quest = quests.find(q => q.id === questId)
      if (!quest) throw new Error('Quest bulunamadı')

      const verificationResult = await QuestVerificationService.verify(quest.type, address)

      if (!verificationResult.success) {
        throw new Error(verificationResult.message || 'Doğrulama başarısız')
      }

      // Quest'i güncelle
      const now = new Date().toISOString()
      const { error: updateError } = await supabase
        .from('user_quests')
        .upsert({
          user_id: address,
          quest_id: questId,
          status: verificationResult.shouldComplete ? 'COMPLETED' : 'IN_PROGRESS',
          progress: verificationResult.progress || 0,
          completed_at: verificationResult.shouldComplete ? now : null,
          last_updated_at: now,
          started_at: now
        })

      if (updateError) throw updateError

      // Eğer quest tamamlandıysa puanları ver
      if (verificationResult.shouldComplete) {
        // Puanları güncelle
        await updateUserPoints(quest.points)

        // Puan toplama kaydı ekle
        const { error: logError } = await supabase
          .from('point_collections')
          .insert([
            {
              user_id: address,
              points: quest.points,
              created_at: now,
              quest_id: questId,
              type: 'QUEST_COMPLETION'
            }
          ])

        if (logError) throw logError
      }

      await fetchQuests()
    } catch (err) {
      console.error('Quest doğrulama hatası:', err)
      throw err
    } finally {
      setVerifying(false)
    }
  }

  // Quest ilerlemesini güncelle
  const updateQuestProgress = async (questId: string, progress: number) => {
    if (!address) return

    try {
      const { error } = await supabase
        .from('user_quests')
        .update({
          progress,
          last_updated_at: new Date().toISOString(),
          status: progress >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
          completed_at: progress >= 100 ? new Date().toISOString() : null
        })
        .eq('user_id', address)
        .eq('quest_id', questId)

      if (error) throw error

      await fetchQuests()
    } catch (err) {
      console.error('Quest ilerleme güncelleme hatası:', err)
      throw err
    }
  }

  // Puan toplama
  const collectPoints = async (questId: string) => {
    if (!address || verifying) return { success: false, points: 0 }

    try {
      setVerifying(true)
      const quest = quests.find(q => q.id === questId)
      if (!quest) return { success: false, message: 'Quest bulunamadı', points: 0 }

      const verificationResult = await QuestVerificationService.verify(quest.type, address)

      if (!verificationResult.success) {
        return { success: false, message: verificationResult.message, points: 0 }
      }

      // Quest durumunu güncelle
      const now = new Date().toISOString()
      const { error: updateError } = await supabase
        .from('user_quests')
        .upsert(
          {
            user_id: address,
            quest_id: questId,
            status: 'IN_PROGRESS',
            progress: verificationResult.progress || 0,
            last_collected_at: now,
            last_updated_at: now
          },
          {
            onConflict: 'user_id,quest_id'
          }
        )

      if (updateError) throw updateError

      // Puan toplama kaydı ekle
      const { error: logError } = await supabase
        .from('point_collections')
        .insert([
          {
            user_id: address,
            points: quest.points,
            created_at: now,
            quest_id: questId,
            type: 'POINT_COLLECTION'
          }
        ])

      if (logError) throw logError

      // Toplam puanları güncelle
      await fetchUserPoints()

      return { 
        success: true, 
        message: 'BQ\'lar toplandı!',
        points: quest.points 
      }
    } catch (err) {
      console.error('Puan toplama hatası:', err)
      return { 
        success: false, 
        message: 'BQ toplama sırasında bir hata oluştu',
        points: 0
      }
    } finally {
      setVerifying(false)
    }
  }

  useEffect(() => {
    fetchQuests()
  }, [address])

  return {
    quests,
    userPoints,
    loading,
    error,
    verifying,
    startQuest,
    verifyQuest,
    updateQuestProgress,
    refreshQuests: fetchQuests,
    collectPoints
  }
} 
import { supabase } from '@/lib/supabase'
import { QuestType } from '@/types/quest'

interface VerificationResult {
  success: boolean
  message?: string
  progress?: number
  shouldComplete?: boolean
}

// Sosyal medya doğrulama için örnek API endpoint'leri
const TWITTER_VERIFY_URL = process.env.NEXT_PUBLIC_TWITTER_VERIFY_URL
const DISCORD_VERIFY_URL = process.env.NEXT_PUBLIC_DISCORD_VERIFY_URL

export class QuestVerificationService {
  // Profil tamamlama kontrolü
  static async verifyProfileSetup(userId: string): Promise<VerificationResult> {
    try {
      const { data: profile, error } = await supabase
        .from('users')
        .select('username, avatar_url, bio')
        .eq('wallet_address', userId)
        .single()

      if (error) throw error

      let completedFields = 0
      let missingFields = []

      if (profile?.username) completedFields++
      else missingFields.push('kullanıcı adı')

      if (profile?.avatar_url) completedFields++
      else missingFields.push('profil fotoğrafı')

      if (profile?.bio) completedFields++
      else missingFields.push('bio')

      const progress = (completedFields / 3) * 100

      if (completedFields === 3) {
        return {
          success: true,
          progress: 100,
          shouldComplete: true,
          message: 'Profiliniz tamamlandı!'
        }
      }

      return {
        success: false,
        progress,
        message: `Lütfen ${missingFields.join(', ')} ekleyin`
      }
    } catch (error) {
      console.error('Profil kontrolü hatası:', error)
      return {
        success: false,
        message: 'Profil kontrolü sırasında bir hata oluştu'
      }
    }
  }

  // Twitter takip kontrolü
  static async verifyTwitterFollow(userId: string): Promise<VerificationResult> {
    try {
      // Şimdilik manuel doğrulama
      // İleride Twitter API entegrasyonu eklenecek
      return {
        success: true,
        progress: 100,
        shouldComplete: true,
        message: 'X takibi doğrulandı!'
      }
    } catch (error) {
      console.error('X takip kontrolü hatası:', error)
      return {
        success: false,
        message: 'X takip kontrolü sırasında bir hata oluştu'
      }
    }
  }

  // Discord sunucu katılım kontrolü
  static async verifyDiscordJoin(userId: string): Promise<VerificationResult> {
    try {
      // Şimdilik manuel doğrulama
      // İleride Discord API entegrasyonu eklenecek
      return {
        success: true,
        progress: 100,
        shouldComplete: true,
        message: 'Discord katılımı doğrulandı!'
      }
    } catch (error) {
      console.error('Discord katılım kontrolü hatası:', error)
      return {
        success: false,
        message: 'Discord katılım kontrolü sırasında bir hata oluştu'
      }
    }
  }

  // Günlük giriş kontrolü
  static async verifyDailyCheckIn(userId: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0]
    
    const { data: lastCheckIn, error } = await supabase
      .from('daily_check_ins')
      .select('created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error

    if (!lastCheckIn) return true

    const lastCheckInDate = new Date(lastCheckIn.created_at).toISOString().split('T')[0]
    return lastCheckInDate !== today
  }

  // Puan toplama kontrolü
  static async verifyPointCollection(userId: string): Promise<VerificationResult> {
    try {
      const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000).toISOString()
      const today = new Date().toISOString().split('T')[0]

      // Son 3 dakika içinde toplama yapılmış mı?
      const { data: lastCollection, error: lastError } = await supabase
        .from('point_collections')
        .select('created_at')
        .eq('user_id', userId)
        .gt('created_at', threeMinutesAgo)
        .limit(1)
        .single()

      if (lastError && lastError.code !== 'PGRST116') throw lastError
      if (lastCollection) {
        const nextCollectionTime = new Date(lastCollection.created_at)
        nextCollectionTime.setMinutes(nextCollectionTime.getMinutes() + 3)
        const waitSeconds = Math.ceil((nextCollectionTime.getTime() - Date.now()) / 1000)
        
        return {
          success: false,
          message: `${waitSeconds} saniye sonra tekrar toplayabilirsiniz`
        }
      }

      // Bugün kaç kez toplanmış?
      const { data: todayCollections, error: countError } = await supabase
        .from('point_collections')
        .select('created_at')
        .eq('user_id', userId)
        .gte('created_at', `${today}T00:00:00Z`)
        .lte('created_at', `${today}T23:59:59Z`)

      if (countError) throw countError

      const collectionCount = todayCollections?.length || 0
      if (collectionCount >= 10) {
        return {
          success: false,
          message: 'Bugünkü puan toplama hakkınız doldu'
        }
      }

      return {
        success: true,
        progress: 100,
        message: 'Puanlar toplanabilir'
      }
    } catch (error) {
      console.error('Puan toplama kontrolü hatası:', error)
      return {
        success: false,
        message: 'Puan toplama kontrolü sırasında bir hata oluştu'
      }
    }
  }

  // Quest tipine göre doğrulama yöntemini seç
  static async verify(questType: QuestType, userId: string): Promise<VerificationResult> {
    switch (questType) {
      case 'PROFILE_SETUP':
        return await this.verifyProfileSetup(userId)
      case 'SOCIAL_FOLLOW':
        return await this.verifyTwitterFollow(userId)
      case 'DISCORD_JOIN':
        return await this.verifyDiscordJoin(userId)
      case 'POINT_COLLECTION':
        return await this.verifyPointCollection(userId)
      default:
        return {
          success: false,
          message: `Bilinmeyen quest tipi: ${questType}`
        }
    }
  }
} 
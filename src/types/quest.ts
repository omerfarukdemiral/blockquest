export type QuestType = 'PROFILE_SETUP' | 'SOCIAL_FOLLOW' | 'DISCORD_JOIN' | 'DAILY_CHECK_IN' | 'POINT_COLLECTION'
export type QuestStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'LOCKED'
export type QuestDifficulty = 'EASY' | 'MEDIUM' | 'HARD'
export type QuestCategory = 'BEGINNER' | 'DAILY' | 'SOCIAL' | 'SPECIAL'

export interface Quest {
  id: string
  title: string
  description: string
  type: QuestType
  category: QuestCategory
  difficulty: QuestDifficulty
  points: number
  requirements: {
    prerequisiteQuests?: string[] // Tamamlanması gereken quest ID'leri
    level?: number // Gerekli minimum seviye
    points?: number // Gerekli minimum puan
  }
  verificationMethod: {
    type: 'AUTOMATIC' | 'MANUAL' | 'SOCIAL' | 'BLOCKCHAIN'
    data?: Record<string, any>
  }
}

export interface UserQuest {
  id: string
  userId: string
  questId: string
  status: QuestStatus
  progress: number
  startedAt: string
  completedAt?: string
  lastUpdatedAt: string
  verificationData?: Record<string, any>
}

export interface QuestWithProgress extends Quest {
  userProgress?: {
    status: QuestStatus
    progress: number
    completedAt?: string
    lastCollectedAt?: string
  }
} 
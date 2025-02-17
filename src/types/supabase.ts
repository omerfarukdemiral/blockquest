export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          username: string | null
          points: number
          tokens: number
          level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          wallet_address: string
          username?: string | null
          points?: number
          tokens?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string
          username?: string | null
          points?: number
          tokens?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
      }
      quests: {
        Row: {
          id: string
          title: string
          description: string
          points: number
          status: 'active' | 'completed' | 'locked'
          requirements: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          points: number
          status?: 'active' | 'completed' | 'locked'
          requirements?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          points?: number
          status?: 'active' | 'completed' | 'locked'
          requirements?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_quests: {
        Row: {
          id: string
          user_id: string
          quest_id: string
          status: 'in_progress' | 'completed'
          progress: number
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quest_id: string
          status?: 'in_progress' | 'completed'
          progress?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quest_id?: string
          status?: 'in_progress' | 'completed'
          progress?: number
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      nfts: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string
          price: number
          supply: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image_url: string
          price: number
          supply: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image_url?: string
          price?: number
          supply?: number
          created_at?: string
          updated_at?: string
        }
      }
      user_nfts: {
        Row: {
          id: string
          user_id: string
          nft_id: string
          token_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          nft_id: string
          token_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          nft_id?: string
          token_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 
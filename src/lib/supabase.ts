import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// User related functions
export async function getUser(walletAddress: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single()

  if (error) throw error
  return data
}

export async function createUser(walletAddress: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        wallet_address: walletAddress,
        points: 0,
        tokens: 0,
        level: 1,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

// Quest related functions
export async function getQuests() {
  const { data, error } = await supabase
    .from('quests')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function getUserQuests(userId: string) {
  const { data, error } = await supabase
    .from('user_quests')
    .select('*, quests(*)')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

// NFT related functions
export async function getNFTs() {
  const { data, error } = await supabase
    .from('nfts')
    .select('*')
    .order('price', { ascending: true })

  if (error) throw error
  return data
}

export async function getUserNFTs(userId: string) {
  const { data, error } = await supabase
    .from('user_nfts')
    .select('*, nfts(*)')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

// Leaderboard functions
export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('points', { ascending: false })
    .limit(100)

  if (error) throw error
  return data
}

export async function signInWithWallet(address: string, signature: string) {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'custom',
    token: signature,
  })

  if (error) throw error

  // Kullanıcı profilini güncelle veya oluştur
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: data.user.id,
      wallet_address: address,
      updated_at: new Date().toISOString(),
    })

  if (profileError) throw profileError

  return data
}

export async function getProfileByWallet(address: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('wallet_address', address)
    .single()

  if (error) throw error
  return data
}

export interface ProfileUpdate {
  username?: string
  avatar_url?: string
  level?: number
  points?: number
}

export async function updateProfile(userId: string, updates: ProfileUpdate) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)

  if (error) throw error
  return data
} 
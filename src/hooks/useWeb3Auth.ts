'use client'

import { useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { supabase } from '@/lib/supabase'
import { generateNonce } from '@/lib/utils'

export function useWeb3Auth() {
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  const signIn = async () => {
    if (!address) return

    setIsLoading(true)
    setError(null)

    try {
      console.log('Kullanıcı kontrolü yapılıyor...')
      // Önce kullanıcıyı kontrol et
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', address)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Kullanıcı sorgulama hatası:', fetchError)
        throw fetchError
      }

      if (existingUser) {
        console.log('Mevcut kullanıcı bulundu:', existingUser)
        // Kullanıcı varsa son giriş tarihini güncelle
        const { error: updateError } = await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('wallet_address', address)

        if (updateError) {
          console.error('Giriş tarihi güncelleme hatası:', updateError)
          throw updateError
        }
        setUser(existingUser)
      } else {
        console.log('Yeni kullanıcı oluşturuluyor...')
        // Kullanıcı yoksa yeni kullanıcı oluştur
        const nonce = generateNonce()
        const message = `BlockQuest'e hoş geldiniz!\n\nBu mesajı imzalayarak giriş yapabilirsiniz.\n\nNonce: ${nonce}`
        
        console.log('İmza isteniyor...')
        // Mesajı imzala
        const signature = await signMessageAsync({ message })
        console.log('İmza alındı')

        // Yeni kullanıcı oluştur
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([
            {
              wallet_address: address,
              nonce,
              signature,
              last_login: new Date().toISOString(),
              created_at: new Date().toISOString(),
              points: 0,
              level: 1
            }
          ])
          .select()
          .single()

        if (createError) {
          console.error('Kullanıcı oluşturma hatası:', createError)
          throw createError
        }
        console.log('Yeni kullanıcı oluşturuldu:', newUser)
        setUser(newUser)
      }
    } catch (err) {
      console.error('Auth error detayı:', err)
      if (err instanceof Error) {
        setError(`Giriş hatası: ${err.message}`)
      } else if (typeof err === 'object' && err !== null) {
        setError(`Giriş hatası: ${JSON.stringify(err)}`)
      } else {
        setError('Giriş yapılırken beklenmeyen bir hata oluştu')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
  }

  useEffect(() => {
    if (isConnected && address) {
      signIn()
    } else {
      signOut()
    }
  }, [isConnected, address])

  return {
    user,
    isLoading,
    error,
    signIn,
    signOut
  }
} 
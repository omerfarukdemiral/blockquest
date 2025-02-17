import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { signInWithWallet } from '@/lib/supabase'
import { useState } from 'react'

export function useWeb3Auth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()

  const login = async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (!isConnected) {
        await connect()
      }

      if (!address) throw new Error('Cüzdan adresi bulunamadı')

      const message = `BlockQuest'e hoş geldiniz!\n\nBu mesajı imzalayarak giriş yapabilirsiniz.\n\nCüzdan: ${address}\nTarih: ${new Date().toISOString()}`
      
      const signature = await signMessageAsync({ message })
      
      await signInWithWallet(address, signature)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş yapılırken bir hata oluştu')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      setError(null)
      await disconnect()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Çıkış yapılırken bir hata oluştu')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    logout,
    isLoading,
    error,
    isConnected,
    address
  }
} 
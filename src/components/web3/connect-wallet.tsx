'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { BrutalButton } from '@/components/ui/brutal-button'
import { shortenAddress } from '@/lib/utils'
import { injected } from 'wagmi/connectors'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useWeb3Auth } from '@/hooks/useWeb3Auth'

const ConnectWallet = () => {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { user, isLoading, error } = useWeb3Auth()

  const isConnecting = isLoading

  useEffect(() => {
    if (isConnected && address && user) {
      const currentPath = window.location.pathname
      if (currentPath === '/') {
        Cookies.set('wallet_connected', 'true', { expires: 7 })
        router.push('/dashboard')
      }
    }
  }, [isConnected, address, user, router])

  const handleConnect = async () => {
    try {
      connect({ connector: injected() })
    } catch (err) {
      console.error('Bağlantı hatası:', err)
    }
  }

  const handleDisconnect = async () => {
    try {
      Cookies.remove('wallet_connected')
      disconnect()
      if (window.location.pathname !== '/') {
        router.push('/')
      }
    } catch (err) {
      console.error('Çıkış hatası:', err)
    }
  }

  if (!isConnected || !address) {
    return (
      <BrutalButton
        onClick={handleConnect}
        disabled={isConnecting}
      >
        {isConnecting ? 'Bağlanıyor...' : 'Cüzdan Bağla'}
      </BrutalButton>
    )
  }

  if (error) {
    return (
      <div className="text-red-500">
        Hata: {error}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="px-4 py-2 font-mono text-sm bg-gray-100 border-2 border-black">
        {shortenAddress(address)}
      </span>
      <BrutalButton variant="secondary" onClick={handleDisconnect}>
        Çıkış Yap
      </BrutalButton>
    </div>
  )
}

export default ConnectWallet 
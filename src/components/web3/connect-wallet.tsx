'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { BrutalButton } from '@/components/ui/brutal-button'
import { shortenAddress } from '@/lib/utils'
import { injected } from 'wagmi/connectors'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, status } = useConnect()
  const { disconnect } = useDisconnect()

  const isConnecting = status === 'pending'

  if (!isConnected || !address) {
    return (
      <BrutalButton
        onClick={() => connect({ connector: injected() })}
        disabled={isConnecting}
      >
        {isConnecting ? 'Bağlanıyor...' : 'Cüzdan Bağla'}
      </BrutalButton>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <span className="px-4 py-2 font-mono text-sm bg-gray-100 border-2 border-black">
        {shortenAddress(address)}
      </span>
      <BrutalButton variant="secondary" onClick={() => disconnect()}>
        Çıkış Yap
      </BrutalButton>
    </div>
  )
} 
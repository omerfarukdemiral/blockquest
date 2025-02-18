'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { WagmiProvider, createConfig } from 'wagmi'
import { arbitrumSepolia } from 'viem/chains'
import { injected } from 'wagmi/connectors'
import { createPublicClient, http } from 'viem'

const config = createConfig({
  chains: [arbitrumSepolia],
  connectors: [injected()],
  client: ({ chain }) =>
    createPublicClient({
      chain,
      transport: http(),
    }),
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
} 
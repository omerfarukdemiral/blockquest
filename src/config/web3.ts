import { defaultWagmiConfig } from '@web3modal/wagmi'
import { cookieStorage, createStorage } from 'wagmi'
import { goerli } from 'viem/chains'

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

if (!projectId) throw new Error('WalletConnect Project ID is required')

const metadata = {
  name: 'BlockQuest',
  description: 'Web3 Görev Platformu',
  url: 'https://blockquest.app', 
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const config = defaultWagmiConfig({
  chains: [goerli], 
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})

export const SUPPORTED_CHAINS = [goerli] 
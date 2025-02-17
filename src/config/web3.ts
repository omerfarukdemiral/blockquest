'use client'

import { BrowserProvider, JsonRpcSigner } from 'ethers'

// Ethereum window tipi
declare global {
  interface Window {
    ethereum?: {
      request: (args: { 
        method: string; 
        params?: unknown[] 
      }) => Promise<string[] | Record<string, unknown>>
      on(event: 'accountsChanged' | 'chainChanged', listener: (value: string | string[]) => void): void
      removeListener(event: 'accountsChanged' | 'chainChanged', listener: (value: string | string[]) => void): void
      removeAllListeners(event: 'accountsChanged' | 'chainChanged'): void
      isMetaMask?: boolean
    }
  }
}

// Arbitrum Sepolia RPC ve Chain ID
export const ARBITRUM_SEPOLIA_RPC = 'https://sepolia-rollup.arbitrum.io/rpc'
export const ARBITRUM_SEPOLIA_CHAIN_ID = 421614

// MetaMask bağlantı fonksiyonu
export async function connectMetaMask(): Promise<{
  address: string
  chainId: number
  signer: JsonRpcSigner
} | null> {
  try {
    // MetaMask'ın yüklü olup olmadığını kontrol et
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask yüklü değil!')
    }

    // Sadece MetaMask provider'ını kullan
    if (!window.ethereum.isMetaMask) {
      throw new Error('Lütfen MetaMask kullanın!')
    }

    // Cüzdan bağlantısını iste
    const response = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    if (!Array.isArray(response) || response.length === 0) {
      throw new Error('Cüzdan bağlantısı reddedildi!')
    }

    // Provider ve Signer oluştur
    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const network = await provider.getNetwork()

    return {
      address: response[0],
      chainId: Number(network.chainId),
      signer,
    }
  } catch (error) {
    console.error('MetaMask bağlantı hatası:', error)
    return null
  }
}

// Ağ değiştirme fonksiyonu
export async function switchToArbitrumSepolia(): Promise<boolean> {
  try {
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${ARBITRUM_SEPOLIA_CHAIN_ID.toString(16)}` }],
    })
    return true
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 4902) {
      try {
        await window.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${ARBITRUM_SEPOLIA_CHAIN_ID.toString(16)}`,
              chainName: 'Arbitrum Sepolia',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: [ARBITRUM_SEPOLIA_RPC],
              blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
            },
          ],
        })
        return true
      } catch (addError) {
        console.error('Ağ ekleme hatası:', addError)
        return false
      }
    }
    console.error('Ağ değiştirme hatası:', error)
    return false
  }
}

// MetaMask hesap değişikliği dinleyicisi
export function listenToAccountChanges(callback: (accounts: string[]) => void) {
  if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
    // Önceki dinleyicileri temizle
    window.ethereum.removeAllListeners('accountsChanged')
    
    // Yeni dinleyiciyi ekle
    window.ethereum.on?.('accountsChanged', (value: string | string[]) => {
      callback(Array.isArray(value) ? value : [value])
    })
  }
}

// MetaMask ağ değişikliği dinleyicisi
export function listenToNetworkChanges(callback: (chainId: string) => void) {
  if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
    // Önceki dinleyicileri temizle
    window.ethereum.removeAllListeners('chainChanged')
    
    // Yeni dinleyiciyi ekle
    window.ethereum.on?.('chainChanged', (value: string | string[]) => {
      callback(Array.isArray(value) ? value[0] : value)
    })
  }
}

// Dinleyicileri kaldırma fonksiyonu
export function removeMetaMaskListeners() {
  if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
    window.ethereum.removeAllListeners('accountsChanged')
    window.ethereum.removeAllListeners('chainChanged')
  }
} 
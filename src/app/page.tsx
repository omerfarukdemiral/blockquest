'use client'

import { ConnectButton } from '@/components/web3/connect-button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">BlockQuest</h1>
      <p className="mb-8 text-xl text-center">
        Web3 Görev Platformuna Hoş Geldiniz!<br />
        Cüzdanınızı bağlayarak başlayın.
      </p>
      <ConnectButton />
    </main>
  )
}

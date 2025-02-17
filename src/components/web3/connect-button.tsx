import { useWeb3Modal } from '@web3modal/wagmi'
import { useAccount } from 'wagmi'

export function ConnectButton() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  if (!isConnected) {
    return (
      <button
        onClick={() => open()}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Cüzdan Bağla
      </button>
    )
  }

  return (
    <button
      onClick={() => open()}
      className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
    >
      {address?.slice(0, 6)}...{address?.slice(-4)}
    </button>
  )
} 
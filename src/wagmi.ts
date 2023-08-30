import { configureChains, createConfig } from 'wagmi'
import { canto } from 'wagmi/chains'


import { publicProvider } from 'wagmi/providers/public'

const { publicClient, webSocketPublicClient } = configureChains(
  [canto],
  [
    publicProvider(),
  ],
)

export const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
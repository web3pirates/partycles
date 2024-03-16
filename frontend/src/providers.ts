import { createClient, http } from 'viem';
import { createConfig } from 'wagmi';
import { baseSepolia, mainnet, sepolia } from 'wagmi/chains';
import { arbitrum } from 'wagmi/chains';
import { base } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

const WALLETCONNECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;

if (!WALLETCONNECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_WALLETCONNECT_ID');
}

export const chains = [arbitrum, base];

const connector = walletConnect({
  projectId: WALLETCONNECT_ID,
});

export const wagmiConfig = createConfig({
  chains: [arbitrum, base, baseSepolia, mainnet, sepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

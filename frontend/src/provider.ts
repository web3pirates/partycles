import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const WALLETCONNECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;

if (!WALLETCONNECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_ID");
}

export const chains = [sepolia];

const { publicClient, webSocketPublicClient } = configureChains(chains, [
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Web3 Starter",
  projectId: WALLETCONNECT_ID,
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

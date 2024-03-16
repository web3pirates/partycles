import { chains, wagmiConfig } from '@/providers';
import '@/styles/style.scss';
import { SharedStateProvider } from '@/utils/store';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlausibleProvider from 'next-plausible';
import type { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="example.com" trackOutboundLinks>
      <SharedStateProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </SharedStateProvider>
    </PlausibleProvider>
  );
}

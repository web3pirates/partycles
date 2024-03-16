import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { CreateButton, CustomContainer, Layout } from '@/components/atoms';
import { useIsMounted } from '@/hooks/useIsMounted';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useReconnect } from 'wagmi';

export default function Home() {
  const isMounted = useIsMounted(); // Prevent Next.js hydration errors
  const router = useRouter();
  const { reconnect } = useReconnect();
  return (
    <>
      <Head>
        <title>Partycles</title>
        <meta name="description" content="Revolutionizing cool apps." />
      </Head>

      <Layout>
        <Nav />

        <CustomContainer as="main">
          <h1>Partycles</h1>
          <p>
            Welcome to Partycles, where collecting partycles gets you invited to the reward party!{' '}
            <br />
            Partycles is a platform designed to incentivize and gamify activity on UniV4 pools by
            rewarding users with NFT scratch cards containing ERC20 rewards.
          </p>

          <div className="Uniswap">
            <SwapWidget />
          </div>

          <p></p>
          <br />
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}

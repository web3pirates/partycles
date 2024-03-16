import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Table } from "@/components/Table";
import { CreateButton, CustomContainer, Layout } from "@/components/atoms";
import { useIsMounted } from "@/hooks/useIsMounted";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReconnect } from "wagmi";

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
          <div className="w-full">
            <h1 className="mb-4">Partycles</h1>
            <div className="flex gap-4">
              <div className="Uniswap">
                <SwapWidget />
              </div>
              <Table />
            </div>
          </div>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}

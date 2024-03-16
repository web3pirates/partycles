import apecoin from "../../public/images/apecoin.png";
import cakecoin from "../../public/images/cake.png";
import ethcoin from "../../public/images/ethlogo.png";
import usdccoin from "../../public/images/usdc.png";
import ArrowDown from "../../public/svg/arrowDown";
import DoubleArrow from "../../public/svg/doubleArrow";
import Uniswap from "../../public/svg/uniswap";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Table } from "@/components/Table";
import { CreateButton, CustomContainer, Layout } from "@/components/atoms";
import { useIsMounted } from "@/hooks/useIsMounted";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useReconnect } from "wagmi";

export default function Home() {
  const isMounted = useIsMounted(); // Prevent Next.js hydration errors
  const router = useRouter();
  const { reconnect } = useReconnect();

  const [selectedPool, setSelectedPool] = useState<Pool>(pools[0]);
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
            <h1 className="mx-auto w-fit">Partycles</h1>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <Swap pool={selectedPool} />
              </div>
              <div className="w-full col-span-8">
                <p className="flex justify-center w-full gap-2 pt-4 font-extrabold text-2xl md:text-3xl mb-4">
                  <div className="h-fit my-auto">Pools</div>
                  <Uniswap className="w-12 h-12 mb-2" />
                </p>
                {pools
                  .filter((p) => p.id !== selectedPool.id)
                  .map((pool) => (
                    <div className="mb-2">
                      <Pool pool={pool} callback={setSelectedPool} />
                    </div>
                  ))}
                <div className="mb-8"></div>
                <Table />
              </div>
            </div>
          </div>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}

const Pool = (props: { pool: Pool; callback: (pool: Pool) => void }) => {
  const { pool, callback } = props;
  return (
    <div
      className="rounded-xl w-full font-semibold py-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 hover:cursor-pointer"
      onClick={() => callback(pool)}
    >
      <div className="w-fit mx-auto flex text-xl ">
        {pool.token1.symbol}&nbsp;
        <Image
          src={pool.token1.img}
          alt={pool.token1.symbol}
          width={25}
          height={15}
        />
        &nbsp;-&nbsp;{pool.token2.symbol}&nbsp;
        <Image
          src={pool.token2.img}
          alt={pool.token2.symbol}
          width={25}
          height={15}
        />
      </div>
    </div>
  );
};

const Swap = (props: { pool: Pool }) => {
  const { pool } = props;
  return (
    <>
      <div className="w-full mx-auto">
        <p className="flex justify-center w-full gap-2 pt-4 font-extrabold text-2xl md:text-3xl mb-4">
          <div className="h-fit my-auto">Swap</div>
          <div className="mt-2 h-fit">
            <DoubleArrow className="w-8 h-8 mb-2 rotate-90" />
          </div>
        </p>
        <div className="flex w-fit mx-auto">
          <div className="text-2xl font-bold">10&nbsp;</div>
          <Image
            src={pool.token1.img}
            alt={pool.token1.symbol}
            width={30}
            height={30}
          />
        </div>
        <ArrowDown className="w-12 h-12 mx-auto" />
        <div className="flex w-fit mx-auto">
          <div className="text-2xl font-bold">{10 * pool.ratio}&nbsp;</div>
          <Image
            src={pool.token2.img}
            alt={pool.token2.symbol}
            width={30}
            height={30}
          />
        </div>
        <button className="mt-4 h-fit w-full text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-32 py-2.5 text-center me-2 mb-2">
          SWAP
        </button>
      </div>
    </>
  );
};

interface Token {
  symbol: string;
  img: StaticImageData;
}

const apeToken: Token = {
  symbol: "APE",
  img: apecoin,
};
const usdcToken: Token = {
  symbol: "USDC",
  img: usdccoin,
};
const cakeToken: Token = {
  symbol: "CAKE",
  img: cakecoin,
};
const ethToken: Token = {
  symbol: "ETH",
  img: ethcoin,
};

interface Pool {
  id: number;
  token1: Token;
  token2: Token;
  ratio: number;
}

const pools = [
  {
    id: 1,
    token1: usdcToken,
    token2: apeToken,
    ratio: 0.46574,
  },
  {
    id: 2,
    token1: usdcToken,
    token2: cakeToken,
    ratio: 4.43,
  },
  {
    id: 3,
    token1: usdcToken,
    token2: ethToken,
    ratio: 0.000273233,
  },
];

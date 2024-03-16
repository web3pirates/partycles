import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  Layout,
  Title,
  CustomContainer,
  HackathonBox,
  HackathonsContainer,
} from "@/components/atoms";
import { useGraph } from "@/hooks/useGraph";
import { useIsMounted } from "@/hooks/useIsMounted";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAsyncMemo } from "use-async-memo";
import { useAccount } from "wagmi";

export default function partycles() {
  const isMounted = useIsMounted(); // Prevent Next.js hydration errors
  const { address } = useAccount();
  const { fetchUserPartycles } = useGraph();

  const partycles = useAsyncMemo(async () => {
    if (address) return await fetchUserPartycles(address);
  }, [address]);

  return (
    <>
      <Head>
        <title>Partycles</title>
        <meta name="description" content="Revolutionizing cool apps." />
      </Head>

      <Layout>
        <Nav />
        <CustomContainer as="main">
          <HackathonsContainer>
            {partycles?.map((party, idx) => (
              <NFT party={party} idx={idx} />
            ))}
          </HackathonsContainer>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}

function NFT(props: {
  party: { id: string; tokenURI: string; partyNumber: string };
  idx: number;
}) {
  const { idx, party } = props;
  const router = useRouter();

  const imageURL: string = useAsyncMemo(async () => {
    const json = await fetch(party.tokenURI);
    const parsedJSON = await json.json();
    return parsedJSON.image;
  }, [party.tokenURI]);

  return (
    <HackathonBox
      title="Partycles"
      onClick={() => router.push(`/partycles/${party.id}`)}
    >
      <img src={imageURL} />
      <Title>PARTY #{party.partyNumber}</Title>
    </HackathonBox>
  );
}

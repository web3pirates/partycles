import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  Layout,
  Title,
  CustomContainer,
  HackathonBox,
  HackathonsContainer,
} from "@/components/atoms";
import { useIsMounted } from "@/hooks/useIsMounted";
import { usePartycles } from "@/hooks/usePartycles";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAsyncMemo } from "use-async-memo";
import { useAccount } from "wagmi";

export default function partycles() {
  const isMounted = useIsMounted(); // Prevent Next.js hydration errors
  const router = useRouter();
  const { address } = useAccount();
  const { fetchUserPartycles } = usePartycles();

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
              <HackathonBox
                title="Partycles"
                onClick={() => router.push(`/partycles/${party}`)}
              >
                <img src={partyclesImages[idx]} />
                <Title>PARTY #{party}</Title>
              </HackathonBox>
            ))}
          </HackathonsContainer>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}

export const partyclesImages = [
  "https://ca.slack-edge.com/T02742R3GCA-U03K7DS332B-93303d454d34-512",
  "https://ca.slack-edge.com/T02742R3GCA-U06HUN592C8-e53fb61db2af-512",
  "https://ca.slack-edge.com/T02742R3GCA-U06EGJDNQAX-a4471283cd40-512",
  "https://ca.slack-edge.com/T02742R3GCA-U027GNCE317-9edefd667b4b-512",
  "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun1.svg",
  "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun2.svg",
  "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun3.svg",
  "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun4.svg",
  "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun1.svg",
  "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun5.svg",
  "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun6.svg",
  "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun7.svg",
];

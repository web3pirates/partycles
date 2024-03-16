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
import Head from "next/head";
import { useRouter } from "next/router";

export default function partycles() {
  const isMounted = useIsMounted(); // Prevent Next.js hydration errors
  const router = useRouter();

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
            {partyclesMocked.map((party) => (
              <HackathonBox
                title="Partycles"
                onClick={() => router.push(`/partycles/${party.id}`)}
              >
                <img src={party.src} />
                <Title>PARTY #{party.id}</Title>
              </HackathonBox>
            ))}
          </HackathonsContainer>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}

export const partyclesMocked = [
  {
    id: 234,
    src: "https://ca.slack-edge.com/T02742R3GCA-U03K7DS332B-93303d454d34-512",
  },
  {
    id: 367,
    src: "https://ca.slack-edge.com/T02742R3GCA-U06HUN592C8-e53fb61db2af-512",
  },
  {
    id: 375,
    src: "https://ca.slack-edge.com/T02742R3GCA-U06EGJDNQAX-a4471283cd40-512",
  },
  {
    id: 409,
    src: "https://ca.slack-edge.com/T02742R3GCA-U027GNCE317-9edefd667b4b-512",
  },
  {
    id: 456,
    src: "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun1.svg",
  },
  {
    id: 457,
    src: "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun2.svg",
  },
  {
    id: 458,
    src: "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun3.svg",
  },
  {
    id: 459,
    src: "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun4.svg",
  },
  {
    id: 460,
    src: "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun1.svg",
  },
  {
    id: 461,
    src: "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun5.svg",
  },
  {
    id: 462,
    src: "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun6.svg",
  },
  {
    id: 463,
    src: "https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun7.svg",
  },
];

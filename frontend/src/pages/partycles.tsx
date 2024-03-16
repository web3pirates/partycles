import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import {
  Layout,
  Title,
  CustomContainer,
  HackathonBox,
  HackathonsContainer,
} from '@/components/atoms';
import { useIsMounted } from '@/hooks/useIsMounted';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
            <HackathonBox title="Partycles">
              <img src={'https://ca.slack-edge.com/T02742R3GCA-U03K7DS332B-93303d454d34-512'} />
              <Title>PARTY #234</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://ca.slack-edge.com/T02742R3GCA-U06HUN592C8-e53fb61db2af-512'} />
              <Title>PARTY #367</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://ca.slack-edge.com/T02742R3GCA-U06EGJDNQAX-a4471283cd40-512'} />
              <Title>PARTY #375</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://ca.slack-edge.com/T02742R3GCA-U027GNCE317-9edefd667b4b-512'} />
              <Title>PARTY #409</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun1.svg'} />
              <Title>PARTY #456</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun2.svg'} />
              <Title>PARTY #456</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun3.svg'} />
              <Title>PARTY #456</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun4.svg'} />
              <Title>PARTY #456</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun1.svg'} />
              <Title>PARTY #456</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun5.svg'} />
              <Title>PARTY #456</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun6.svg'} />
              <Title>PARTY #456</Title>
            </HackathonBox>
            <HackathonBox title="Partycles">
              <img src={'https://tideprotocol-images.s3.eu-west-1.amazonaws.com/noun7.svg'} />
              <Title>PARTY #456</Title>
            </HackathonBox>
          </HackathonsContainer>
        </CustomContainer>

        <Footer />
      </Layout>
    </>
  );
}

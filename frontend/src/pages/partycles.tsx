import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import {
  CustomContainer,
  Label,
  Layout,
  Title,
  LabelCard,
  TinyLabelCard,
  Form,
  Input,
  Button,
  Row,
  CreateButton,
  Description,
  BannerImage,
  StyledDetail,
  StyledTable,
  TextArea,
  Select,
  Loader,
} from '@/components/atoms';
import { useIsMounted } from '@/hooks/useIsMounted';
import Head from 'next/head';
import { useRouter } from 'next/router';

// import {
//     CreateButton,
//     CustomContainer,
//     HackathonBox,
//     HackathonsContainer,
//     Layout,
//     TinyLabelCard,
//     Title,
//   } from '@/components/atoms'

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

        <CustomContainer>My Partycles</CustomContainer>

        <Footer />
      </Layout>
    </>
  );
}

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Title, Layout } from "@/components/atoms";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const ExampleDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>{id} page</title>
        <meta name="description" content={`Details of somethings`} />
      </Head>

      <Layout>
        <Nav />
        <Title>You're page for the id {id}</Title>
        <Footer />
      </Layout>
    </>
  );
};

export default ExampleDetails;

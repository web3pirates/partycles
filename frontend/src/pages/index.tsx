import { Layout } from "@/components/Layout";
import { Nav } from "@/components/Nav";
import { useIsMounted } from "@/hooks/useIsMounted";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const isMounted = useIsMounted(); // Prevent Next.js hydration errors
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Your cool App</title>
        <meta name="description" content="Revolutionizing cool apps." />
      </Head>

      <Layout>
        <>
          <div className="flex flex-col gap-1 text-left p-1">
            <h1>Your cool app is here</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            </p>

            <Link href="/example/create" passHref>
              <div>Create cool app</div>
            </Link>

            <p></p>
            <br />
          </div>
        </>
      </Layout>
    </>
  );
}

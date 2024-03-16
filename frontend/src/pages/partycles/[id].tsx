import { partyclesImages } from "../partycles";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CustomContainer, Layout } from "@/components/atoms";
import { useRouter } from "next/router";
import { useMemo } from "react";

export default function PartycleView() {
  const router = useRouter();
  const id = useMemo(
    () => Number(router.query.id as string),
    [router.query.id]
  );
  const tokenId = useMemo(
    () => Number(router.query.tokenId as string),
    [router.query.tokenId]
  );

  return (
    <>
      <Layout>
        <Nav />
        <CustomContainer as="main">
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <h1 className="mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500 text-5xl font-black">
                Partycle #{tokenId}
              </h1>
              <img src={partyclesImages[id]} className="w-[400px] h-[400px]" />
            </div>
            <div className="col-span-7 flex justify-between">
              <button className="h-fit mt-auto text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-32 py-2.5 text-center me-2 mb-2">
                Scratch
              </button>
              <button
                type="button"
                onClick={() => router.push(`https://opensea.io/${id}/sell`)}
                className="whitespace-nowrap h-fit mt-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-32 py-2.5 text-center me-2 mb-2"
              >
                Sell
              </button>
            </div>
          </div>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}

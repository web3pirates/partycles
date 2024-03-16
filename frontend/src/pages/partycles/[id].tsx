import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CustomContainer, Layout } from "@/components/atoms";
import { useGraph } from "@/hooks/useGraph";
import { usePartycle } from "@/hooks/usePartycle";
import { createWalletAddress, checkPaymentStatus } from "@/payment";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useAsyncMemo } from "use-async-memo";
import { useAccount } from "wagmi";

export default function PartycleView() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [intent, setIntent] = useState("");
  const [depositAddress, setDepositAddress] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [error, setError] = useState("");
  const { scratch } = usePartycle();
  const { address } = useAccount();
  const { fetchParty } = useGraph();

  const tokenId = useMemo(() => router.query.id as string, [router.query.id]);
  const partyData = useAsyncMemo(async () => fetchParty(tokenId), [tokenId]);
  const imageURL = useAsyncMemo(async () => {
    if (!partyData) return;
    const json = await fetch(partyData.tokenURI);
    const parsedJSON = await json.json();
    return parsedJSON.image;
  }, [partyData]);

  const createPaymentIntent = async (e: any) => {
    e.preventDefault();
    let [intent, address] = await createWalletAddress();
    if (!intent || !address) return;

    setIntent(intent);
    setDepositAddress(address);
  };

  const confirmPayment = async (e: any) => {
    e.preventDefault();
    let status = await checkPaymentStatus(intent);
    if (status) {
      setIntent("");
      setDepositAddress("");
      setError("");
    } else {
      setError("Payment not confirmed");
    }

    setPaymentStatus(status);
  };
  return (
    <>
      <Layout>
        <Nav />
        <CustomContainer as="main">
          <div className="grid grid-cols-12">
            <div className="col-span-5">
              <h1 className="mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500 text-5xl font-black">
                Partycle #{tokenId?.substring(tokenId.length - 5)}
              </h1>
              <img src={imageURL} className="w-[400px] h-[400px]" />
            </div>
            <div className="col-span-7 flex justify-between">
              <button
                onClick={() => {
                  if (address) scratch(tokenId);
                }}
                className="h-fit mt-auto text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-32 py-2.5 text-center me-2 mb-2"
              >
                Scratch
              </button>
              <button
                type="button"
                className="whitespace-nowrap h-fit mt-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-32 py-2.5 text-center me-2 mb-2"
              >
                Sell
              </button>

              {/* <button
                onClick={(e: any) => {
                  createPaymentIntent(e);
                }}
                type="submit"
                className="whitespace-nowrap h-fit mt-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-32 py-2.5 text-center me-2 mb-2"
              >
                Sell for 100 USDC
              </button> */}

              {intent && depositAddress && !paymentStatus && (
                <>
                  <div>Pay 1 USDC to {depositAddress}</div>
                  <div>Once done please click confirmation</div>
                  <form onSubmit={confirmPayment}>
                    <button type="submit">Confirm</button>
                  </form>
                </>
              )}
              {!intent && !depositAddress && paymentStatus && (
                <>
                  <div>Thanks for the payment</div>
                </>
              )}
              {error && <div>{error}</div>}
            </div>
          </div>
        </CustomContainer>
        <Footer />
      </Layout>
    </>
  );
}

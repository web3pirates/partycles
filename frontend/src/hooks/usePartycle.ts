import { partycleAbi } from "@/abi/Partycles";
import { wagmiConfig } from "@/providers";
import ApolloClient from "@/utils/ApolloClient";
import { PARTYCLE_CONTRACT, USDC_CONTRACT } from "@/utils/constants";
import { gql } from "@apollo/client";
import { waitForTransaction, writeContract } from "wagmi/actions";

export function useGraph() {
  async function scratch(userAddress: string, idx: number) {
    try {
      const res = await ApolloClient.query<{
        user: { nfts: Array<{ id: string }> };
      }>({
        query: gql`query {
            user(id: "${userAddress}") {
              nfts {
                id
              }
            }
        }`,
      });

      const tokenId = res.data.user.nfts[idx].id;

      const hash = await writeContract(wagmiConfig, {
        abi: partycleAbi,
        address: PARTYCLE_CONTRACT,
        chainId: 421614,
        functionName: "scratch",
        args: [BigInt(tokenId), USDC_CONTRACT],
      });

      await waitForTransaction(wagmiConfig, {
        chainId: 421614,
        hash: hash,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return { scratch };
}
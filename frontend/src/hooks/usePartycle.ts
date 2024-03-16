import { partycleAbi } from "@/abi/Partycles";
import { wagmiConfig } from "@/providers";
import ApolloClient from "@/utils/ApolloClient";
import { PARTYCLE_CONTRACT, USDC_CONTRACT } from "@/utils/constants";
import { gql } from "@apollo/client";
import { type GetTransactionConfirmationsReturnType } from "@wagmi/core";
import {
  getTransactionConfirmations,
  waitForTransaction,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";

export function usePartycle() {
  async function scratch(tokenId: string) {
    try {
      const hash = await writeContract(wagmiConfig, {
        abi: partycleAbi,
        address: PARTYCLE_CONTRACT,
        chainId: 421614,
        functionName: "scratch",
        args: [BigInt(tokenId), USDC_CONTRACT],
      });

      await waitForTransactionReceipt(wagmiConfig, {
        chainId: 421614,
        hash,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function mintERC20(userAddress: string, value: bigint) {
    try {
      const hash = await writeContract(wagmiConfig, {
        abi: partycleAbi,
        address: PARTYCLE_CONTRACT,
        chainId: 421614,
        functionName: "mintERC20",
        args: [userAddress as `0x${string}`, value],
      });

      await waitForTransactionReceipt(wagmiConfig, {
        chainId: 421614,
        hash,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return { scratch, mintERC20 };
}

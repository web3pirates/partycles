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

export function useCircle() {
  async function example() {}

  return { example };
}

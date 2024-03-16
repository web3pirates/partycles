import ApolloClient from "@/utils/ApolloClient";
import { gql } from "@apollo/client";

export function usePartycles() {
  async function fetchUserPartycles(userAddress: string): Promise<string[]> {
    let res;
    try {
      res = await ApolloClient.query<{
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
    } catch (e) {
      console.error(e);
    }

    console.log(res);

    return (
      res?.data.user.nfts.map((n) => n.id.substring(n.id.length - 5)) || []
    );
  }

  async function fetchPartycles(): Promise<string[]> {
    let res;
    try {
      res = await ApolloClient.query<{
        nfts: Array<{ id: string }>;
      }>({
        query: gql`
          query {
            nfts(first: 1000) {
              id
            }
          }
        `,
      });
    } catch (e) {
      console.error(e);
    }

    console.log(res);

    return res?.data.nfts.map((n) => n.id.substring(n.id.length - 5)) || [];
  }

  return {
    fetchPartycles,
    fetchUserPartycles,
  };
}

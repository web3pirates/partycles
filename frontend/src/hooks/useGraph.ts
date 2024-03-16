import ApolloClient from "@/utils/ApolloClient";
import { gql } from "@apollo/client";

export function useGraph() {
  async function fetchLeaderboard(): Promise<{ id: string; gained: number }[]> {
    let res;
    try {
      res = await ApolloClient.query<{
        users: Array<{ id: string; gained: string }>;
      }>({
        query: gql`
          query {
            users(first: 100, orderBy: "gained", orderDirection: "desc") {
              id
              gained
            }
          }
        `,
      });
    } catch (e) {
      console.error(e);
    }

    return (
      res?.data.users.map((u) => ({
        ...u,
        gained: Number(
          u.gained.slice(0, u.gained.length - 18) +
            "." +
            u.gained.slice(u.gained.length - 18, u.gained.length - 16)
        ),
      })) || []
    );
  }

  async function fetchParty(
    tokenId: string
  ): Promise<{ id: string; tokenURI: string } | undefined> {
    let res;
    try {
      res = await ApolloClient.query<{
        nft: { id: string; tokenURI: string };
      }>({
        query: gql`query {
            nft(id: "${tokenId}") {
              id
              tokenURI
            }
        }`,
      });
    } catch (e) {
      console.error(e);
    }

    return res?.data.nft;
  }

  async function fetchUserPartycles(
    userAddress: string
  ): Promise<{ id: string; tokenURI: string; partyNumber: string }[]> {
    let res;
    try {
      res = await ApolloClient.query<{
        user: {
          nfts: Array<{ id: string; tokenURI: string }>;
        };
      }>({
        query: gql`query {
            user(id: "${userAddress}") {
              nfts {
                id
                tokenURI
              }
            }
        }`,
      });
    } catch (e) {
      console.error(e);
    }

    return (
      res?.data.user.nfts.map((n) => ({
        ...n,
        partyNumber: n.id.substring(n.id.length - 5),
      })) || []
    );
  }

  async function fetchPartycles(): Promise<
    { id: string; tokenURI: string; partyNumber: string }[]
  > {
    let res;
    try {
      res = await ApolloClient.query<{
        nfts: Array<{ id: string; tokenURI: string }>;
      }>({
        query: gql`
          query {
            nfts(first: 1000) {
              id
              tokenURI
            }
          }
        `,
      });
    } catch (e) {
      console.error(e);
    }

    return (
      res?.data.nfts.map((n) => ({
        ...n,
        partyNumber: n.id.substring(n.id.length - 5),
      })) || []
    );
  }

  return {
    fetchPartycles,
    fetchUserPartycles,
    fetchLeaderboard,
    fetchParty,
  };
}

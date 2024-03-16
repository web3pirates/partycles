import { usePartycles } from "@/hooks/usePartycles";
import { useAsyncMemo } from "use-async-memo";
import { useEnsName } from "wagmi";

export const Table = () => {
  const { fetchLeaderboard } = usePartycles();

  const leaderboard = useAsyncMemo(async () => await fetchLeaderboard(), []);
  return (
    <>
      <div className=" border border-custom-gray-uniborder rounded-2xl h-full w-full">
        <div className="inline-block min-w-full align-middle h-full">
          <div className="overflow-x-scroll custom-scrollbar">
            <table className="w-full divide-y-2 divide-custom-gray-uniborder">
              <thead className="w-full">
                <tr
                  className=" bg-custom-gray-700"
                  style={{
                    fontFamily: '"InterVariable", sans-serif',
                  }}
                >
                  <th
                    scope="col"
                    className={`p-[0.9375rem] text-left font-normal text-custom-gray-uni rounded-2xl`}
                  >
                    <button
                      className="hover:cursor-pointer hover:opacity-70 flex gap-2 items-center"
                      onClick={() => {}}
                    >
                      Position
                    </button>
                  </th>
                  <th
                    scope="col"
                    className={`p-[0.9375rem] text-left font-normal text-custom-gray-uni rounded-2xl`}
                  >
                    <button
                      className="hover:cursor-pointer hover:opacity-70 flex gap-2 items-center"
                      onClick={() => {}}
                    >
                      Address
                    </button>
                  </th>
                  <th
                    scope="col"
                    className={`p-[0.9375rem] text-left font-normal text-custom-gray-uni rounded-2xl`}
                  >
                    <button
                      className="hover:cursor-pointer hover:opacity-70 flex gap-2 items-center"
                      onClick={() => {}}
                    >
                      Partycles
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody className="w-full divide-custom-gray-700 divide-y !border-0 text-sm font-semibold p-2 bg-custom-gray-700">
                {leaderboard?.map((user, idx) => (
                  <LeaderboardRow user={user} idx={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

function LeaderboardRow(props: {
  user: { id: string; gained: number };
  idx: number;
}) {
  const { user, idx } = props;
  const positionColorStyle = (position: number) =>
    position === 1
      ? "bg-gold"
      : position === 2
      ? "bg-silver"
      : position === 3
      ? "bg-bronze"
      : "bg-custom-gray-700";

  const { data: userEns } = useEnsName({
    address: user.id as `0x${string}`,
    chainId: 1,
  });

  return (
    <tr key={idx}>
      <td
        className={`whitespace-nowrap p-[0.9375rem] text-custom-gray-uni relative rounded-2xl`}
      >
        <div
          className={`rounded-full ${positionColorStyle(
            idx + 1
          )} w-[2.2rem] h-[2.2rem] text-sm font-semibold flex items-center justify-center text-custom-gray-100`}
        >
          {idx + 1}
        </div>
      </td>
      <td className="whitespace-nowrap p-[0.9375rem] text-custom-gray-100 relative rounded-2xl">
        <a
          href={`https://zapper.xyz/account/${user.id}`}
          className="text-bright-blue gap-x-1 max-w-[12rem] text-ellipsis overflow-hidden group underline"
        >
          {(userEns || user.id).length > 40
            ? `${(userEns || user.id).slice(0, 15)}...`
            : userEns || user.id}
        </a>
      </td>

      <td className="whitespace-nowrap p-[0.9375rem] text-custom-gray-100 relative rounded-2xl">
        <p className=" gap-x-1 max-w-[12rem] capitalize text-ellipsis overflow-hidden group">
          {user.gained} PARTY
        </p>
      </td>
    </tr>
  );
}

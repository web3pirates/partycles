import { useEnsName } from "wagmi";

export const Table = () => {
  function handleOrdering(arg0: string) {
    console.log("Function not implemented.");
  }

  const getEnsName = (address: string) => {
    const { data: userEns } = useEnsName({
      address: address as `0x${string}`,
      chainId: 1,
    });

    return userEns;
  };
  return (
    <>
      <div className="bg-custom-gray-800 border border-custom-gray-200 rounded-2xl h-full w-full">
        <div className="inline-block min-w-full align-middle h-full">
          <div className="overflow-x-scroll custom-scrollbar">
            <table className="w-full divide-y-2 divide-custom-gray-200">
              <thead className="w-full">
                <tr className="text-custom-gray-300 text-xs bg-custom-gray-700">
                  <th
                    scope="col"
                    className={`p-[0.9375rem] text-left text-xs uppercase font-semibold text-custom-gray-300 rounded-2xl`}
                  >
                    <button
                      className="hover:cursor-pointer hover:opacity-70 flex gap-2 items-center"
                      onClick={() => {}}
                    >
                      POSITION
                    </button>
                  </th>
                  <th
                    scope="col"
                    className={`p-[0.9375rem] text-left text-xs uppercase font-semibold text-custom-gray-300 rounded-2xl`}
                  >
                    <button
                      className="hover:cursor-pointer hover:opacity-70 flex gap-2 items-center"
                      onClick={() => {}}
                    >
                      ADDRESS
                    </button>
                  </th>
                  <th
                    scope="col"
                    className={`p-[0.9375rem] text-left text-xs uppercase font-semibold text-custom-gray-300 rounded-2xl`}
                  >
                    <button
                      className="hover:cursor-pointer hover:opacity-70 flex gap-2 items-center"
                      onClick={() => {}}
                    >
                      PARTYCLES
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody className="w-full divide-custom-gray-700 divide-y !border-0 text-sm font-semibold p-2 bg-custom-gray-700">
                {mockedData.map((data, idx) => (
                  <tr key={idx}>
                    <td className="whitespace-nowrap p-[0.9375rem] text-custom-gray-100 relative rounded-2xl">
                      <div>{data.position}</div>
                    </td>
                    <td className="whitespace-nowrap p-[0.9375rem] text-custom-gray-100 relative rounded-2xl">
                      <a
                        href={`https://zapper.xyz/account/${data.userAddress}`}
                        className="text-bright-blue gap-x-1 max-w-[12rem] capitalize text-ellipsis overflow-hidden group underline"
                      >
                        {(getEnsName(data.userAddress) || data.userAddress)
                          .length > 40
                          ? `${(
                              getEnsName(data.userAddress) || data.userAddress
                            ).slice(0, 15)}...`
                          : getEnsName(data.userAddress) || data.userAddress}
                      </a>
                    </td>

                    <td className="whitespace-nowrap p-[0.9375rem] text-custom-gray-100 relative rounded-2xl">
                      <p className=" gap-x-1 max-w-[12rem] capitalize text-ellipsis overflow-hidden group">
                        {data.xp} PARTY
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const mockedData = [
  {
    position: 1,
    userAddress: "0x7d06dE4aE53Ef27Fff2B34731C97bb44FD27D9E6",
    xp: 15.2,
  },
  {
    position: 2,
    userAddress: "0x30b0eae5e9df8a1c95dfdb7af86aa4e7f3b51f13",
    xp: 13.1,
  },
  {
    position: 3,
    userAddress: "0x9a9D075A63BE26e0a2D905E49715A26B4163396c",
    xp: 9.9,
  },
];

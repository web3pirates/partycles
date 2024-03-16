export const exampleAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "exampleEvent",
        type: "address",
      },
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "ExampleEvent",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "reedeemer", type: "address" }],
    name: "exampleFunction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

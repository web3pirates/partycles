pragma solidity ^0.8.24;

import {VRFConsumerBaseV2} from "../lib/chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import {VRFCoordinatorV2Interface} from "../lib/chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";

contract RandomNumber is VRFConsumerBaseV2 {
    uint256 public mockedMaxTokenId = 10000;
    uint256 public winnerTokenId;

    event WinnerExtracted(uint256 tokenId);

    constructor()
        VRFConsumerBaseV2(0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625)
    {
        // solhint-disable-previous-line no-empty-blocks
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        uint256 tokenIdHasWon = 0;
        do {
            tokenIdHasWon = (randomWords[0] % mockedMaxTokenId);
            tokenIdHasWon = (tokenIdHasWon + 1) % mockedMaxTokenId;
        } while (tokenIdHasWon == 0); // ownerOf(tokenIdHasWon) == address(0) || tokenIdHasWon == 0
        winnerTokenId = tokenIdHasWon;
        emit WinnerExtracted(tokenIdHasWon);

        // call burn for the nft tokenId that has won
    }

    function callRandom() public {
        uint256 requestId = VRFCoordinatorV2Interface(
            0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
        ).requestRandomWords(
                0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c,
                10257,
                200,
                1000000,
                1
            );
    }
}

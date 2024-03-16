// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC404} from "lib/erc404/contracts/ERC404.sol";
import {INounsDescriptorMinimal} from "lib/nouns-monorepo/packages/nouns-contracts/contracts/interfaces/INounsDescriptorMinimal.sol";
import {INounsSeeder} from "lib/nouns-monorepo/packages/nouns-contracts/contracts/interfaces/INounsSeeder.sol";
import {Ownable} from "lib/v4-periphery/lib/v4-core/lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {DoubleEndedQueue} from "lib/erc404/contracts/lib/DoubleEndedQueue.sol";
import {VRFConsumerBaseV2} from "lib/chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import {VRFCoordinatorV2Interface} from "lib/chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";

contract Partycle is ERC404, Ownable, VRFConsumerBaseV2 {
    using DoubleEndedQueue for DoubleEndedQueue.Uint256Deque;
    INounsDescriptorMinimal descriptor;
    INounsSeeder seeder;

    address minter;
    address VRFConsumerV2Address = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;
    uint256 private randomNumber;

    // The noun seeds
    mapping(uint256 => INounsSeeder.Seed) public seeds;

    modifier onlyMinter() {
        require(msg.sender == minter, "Only minter can mint new tokens");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        INounsDescriptorMinimal _descriptor,
        INounsSeeder _seeder,
        address _minter
    )
        ERC404(_name, _symbol, _decimals)
        Ownable()
        VRFConsumerBaseV2(VRFConsumerV2Address)
    {
        descriptor = _descriptor;
        seeder = _seeder;
        minter = _minter;
    }

    function mintERC20(address to, uint256 value) external onlyMinter {
        _mintERC20(to, value);
    }

    function setMinter(address _minter) external onlyOwner {
        minter = _minter;
    }

    /**
     * @notice A distinct Uniform Resource Identifier (URI) for a given asset.
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "NounsToken: URI query for nonexistent token"
        );
        return descriptor.tokenURI(tokenId, seeds[tokenId]);
    }

    /**
     * @notice Similar to `tokenURI`, but always serves a base64 encoded data URI
     * with the JSON contents directly inlined.
     */
    function dataURI(uint256 tokenId) public view returns (string memory) {
        require(
            _exists(tokenId),
            "NounsToken: URI query for nonexistent token"
        );
        return descriptor.dataURI(tokenId, seeds[tokenId]);
    }

    function scratch(uint256 tokenId) public {
        require(
            _exists(tokenId),
            "NounsToken: URI query for nonexistent token"
        );
        require(
            msg.sender == _getOwnerOf(tokenId),
            "Only owner can scratch token"
        );

        // see if a user have won with a possibility of 1 / 50 using random number as a seed
        bool hasWon = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    msg.sender,
                    tokenId,
                    randomNumber
                )
            )
        ) %
            50 ==
            0;

        if (hasWon) {
            // send prize to the user
        }
        erc721TransferFrom(msg.sender, address(0), tokenId);
    }

    /// @notice Function for ERC-721 transfers from.
    /// @dev This function is recommended for ERC721 transfers.
    function erc721TransferFrom(
        address from_,
        address to_,
        uint256 id_
    ) public override {
        // Prevent minting tokens from 0x0.
        if (from_ == address(0)) {
            revert InvalidSender();
        }

        if (from_ != _getOwnerOf(id_)) {
            revert Unauthorized();
        }

        // Check that the operator is either the sender or approved for the transfer.
        if (
            msg.sender != from_ &&
            !isApprovedForAll[from_][msg.sender] &&
            msg.sender != getApproved[id_]
        ) {
            revert Unauthorized();
        }

        // We only need to check ERC-721 transfer exempt status for the recipient
        // since the sender being ERC-721 transfer exempt means they have already
        // had their ERC-721s stripped away during the rebalancing process.
        if (erc721TransferExempt(to_)) {
            revert RecipientIsERC721TransferExempt();
        }

        // Transfer 1 * units ERC-20 and 1 ERC-721 token.
        // ERC-721 transfer exemptions handled above. Can't make it to this point if either is transfer exempt.
        _transferERC20(from_, to_, units);
        _transferERC721(from_, to_, id_);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        randomNumber = randomWords[0];
    }

    function generateRandomNumber() public {
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

    function _retrieveOrMintERC721(address to_) internal virtual override {
        if (to_ == address(0)) {
            revert InvalidRecipient();
        }

        uint256 id;

        if (!_storedERC721Ids.empty()) {
            // If there are any tokens in the bank, use those first.
            // Pop off the end of the queue (FIFO).
            id = _storedERC721Ids.popBack();
        } else {
            // Otherwise, mint a new token, should not be able to go over the total fractional supply.
            seeds[id] = seeder.generateSeed(id, descriptor);
            ++minted;

            // Reserve max uint256 for approvals
            if (minted == type(uint256).max) {
                revert MintLimitReached();
            }

            id = ID_ENCODING_PREFIX + minted;
        }

        address erc721Owner = _getOwnerOf(id);

        // The token should not already belong to anyone besides 0x0 or this contract.
        // If it does, something is wrong, as this should never happen.
        if (erc721Owner != address(0)) {
            revert AlreadyExists();
        }

        // Transfer the token to the recipient, either transferring from the contract's bank or minting.
        // Does not handle ERC-721 exemptions.
        _transferERC721(erc721Owner, to_, id);
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _getOwnerOf(tokenId) != address(0);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC404} from "lib/erc404/contracts/ERC404.sol";

contract Partycle is ERC404 {
    constructor() ERC404("Partycle", "PARTY", 18) {}

    function tokenURI(
        uint256 id_
    ) public view override returns (string memory) {}
}

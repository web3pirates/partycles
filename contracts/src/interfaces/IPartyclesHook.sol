// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "../../lib/v4-core/lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol";

interface IPartyclesHook {
    function awardPrize(IERC20 token, address winner) external;
}

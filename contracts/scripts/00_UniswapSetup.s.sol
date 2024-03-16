// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../lib/forge-std/src/Script.sol";
import {Deployers} from "../lib/v4-core/test/utils/Deployers.sol";

contract UniswapSetupScript is Script, Deployers {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);
        Deployers.deployFreshManagerAndRouters();
        Deployers.deployMintAndApprove2Currencies();
    }
}

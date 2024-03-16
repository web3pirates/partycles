// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../lib/forge-std/src/Script.sol";
import {Partycle} from "../src/Partycle.sol";

contract HooklessPartycleScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        console.log(vm.addr(deployerPrivateKey));
        vm.broadcast(deployerPrivateKey);
        Partycle partycle = new Partycle("Partycles", "PARTY", 18);
    }
}

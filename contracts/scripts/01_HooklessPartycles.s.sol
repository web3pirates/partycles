// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../lib/forge-std/src/Script.sol";
import {Partycle} from "../src/Partycle.sol";
import {IPartycleHook} from "../src/interfaces/IPartycleHook.sol";

contract HooklessPartycleScript is Script {
    function setUp() public {}

    function run() public {
        console.log(vm.envString("PRIVATE_KEY"));
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        console.log(vm.addr(deployerPrivateKey));
        vm.broadcast(deployerPrivateKey);
        Partycle partycle = new Partycle(
            "Partycles",
            "PARTY",
            18,
            IPartycleHook(address(0))
        );
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../lib/forge-std/src/Script.sol";
import {Hooks} from "../lib/v4-core/src/libraries/Hooks.sol";
import {PoolManager} from "../lib/v4-core/src/PoolManager.sol";
import {IPoolManager} from "../lib/v4-core/src/interfaces/IPoolManager.sol";
import {PoolModifyLiquidityTest} from "../lib/v4-core/src/test/PoolModifyLiquidityTest.sol";
import {PoolSwapTest} from "../lib/v4-core/src/test/PoolSwapTest.sol";
import {PoolDonateTest} from "../lib/v4-core/src/test/PoolDonateTest.sol";
import {Partycle} from "../src/Partycle.sol";
import {HookMiner} from "../test/utils/HookMiner.sol";

contract CounterScript is Script {
    address constant CREATE2_DEPLOYER =
        address(0x4e59b44847b379578588920cA78FbF26c0B4956C);
    address constant GOERLI_POOLMANAGER =
        address(0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b);

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // hook contracts must have specific flags encoded in the address
        uint160 flags = uint160(
            Hooks.BEFORE_SWAP_FLAG |
                Hooks.AFTER_SWAP_FLAG |
                Hooks.AFTER_ADD_LIQUIDITY_FLAG
        );

        // Mine a salt that will produce a hook address with the correct flags
        (address hookAddress, bytes32 salt) = HookMiner.find(
            CREATE2_DEPLOYER,
            flags,
            type(Partycle).creationCode,
            abi.encode(address(GOERLI_POOLMANAGER))
        );

        // Deploy the hook using CREATE2
        vm.broadcast(deployerPrivateKey);
        Partycle partycle = new Partycle{salt: salt}("Partycles", "PARTY", 18);
        require(
            address(partycle) == hookAddress,
            "CounterScript: hook address mismatch"
        );
    }
}

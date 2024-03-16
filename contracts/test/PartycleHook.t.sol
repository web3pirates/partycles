// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import {IHooks} from "v4-core/src/interfaces/IHooks.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {TickMath} from "v4-core/src/libraries/TickMath.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {BalanceDelta} from "v4-core/src/types/BalanceDelta.sol";
import {PoolId, PoolIdLibrary} from "v4-core/src/types/PoolId.sol";
import {CurrencyLibrary, Currency} from "v4-core/src/types/Currency.sol";
import {PoolSwapTest} from "v4-core/src/test/PoolSwapTest.sol";
import {Deployers} from "v4-core/test/utils/Deployers.sol";
import {Constants} from "v4-core/test/utils/Constants.sol";
import {PartycleHook} from "../src/PartycleHook.sol";
import {HookMiner} from "./utils/HookMiner.sol";
import {Partycle} from "../src/Partycle.sol";
import {IPartycle} from "../src/interfaces/IPartycle.sol";
import {IERC20} from "../lib/v4-core/lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol";

contract CounterTest is Test, Deployers {
    using PoolIdLibrary for PoolKey;
    using CurrencyLibrary for Currency;

    PartycleHook hook;
    Partycle partycle;
    PoolId poolId;
    IERC20 token0;
    IERC20 token1;
    address alice = vm.addr(1);

    function setUp() public {
        // creates the pool manager, utility routers, and test tokens
        Deployers.deployFreshManagerAndRouters();
        (Currency currency0, Currency currency1) = Deployers
            .deployMintAndApprove2Currencies();

        // Deploy the hook to an address with the correct flags
        uint160 flags = uint160(
            Hooks.BEFORE_SWAP_FLAG |
                Hooks.AFTER_SWAP_FLAG |
                Hooks.AFTER_ADD_LIQUIDITY_FLAG
        );
        (address hookAddress, bytes32 salt) = HookMiner.find(
            address(this),
            flags,
            type(PartycleHook).creationCode,
            abi.encode(address(manager))
        );
        hook = new PartycleHook{salt: salt}(IPoolManager(address(manager)));
        require(
            address(hook) == hookAddress,
            "CounterTest: hook address mismatch"
        );

        partycle = new Partycle("Partycle", "PARTY", 18, hook);
        hook.setPartycle(IPartycle(address(partycle)));

        // approve tokens to hook
        token0 = IERC20(address(uint160(currency0.toId())));
        token1 = IERC20(address(uint160(currency1.toId())));
        token0.transfer(alice, 10e18);
        token1.transfer(alice, 10e18);
        vm.startPrank(alice);
        token0.approve(address(hook), Constants.MAX_UINT256);
        token1.approve(address(hook), Constants.MAX_UINT256);
        vm.stopPrank();

        // Create the pool
        key = PoolKey(currency0, currency1, 3000, 60, IHooks(address(hook)));
        poolId = key.toId();
        manager.initialize(key, SQRT_RATIO_1_1, ZERO_BYTES);

        // Provide liquidity to the pool
        modifyLiquidityRouter.modifyLiquidity(
            key,
            IPoolManager.ModifyLiquidityParams(-60, 60, 10 ether),
            abi.encode(alice)
        );
        modifyLiquidityRouter.modifyLiquidity(
            key,
            IPoolManager.ModifyLiquidityParams(-120, 120, 10 ether),
            abi.encode(alice)
        );
        modifyLiquidityRouter.modifyLiquidity(
            key,
            IPoolManager.ModifyLiquidityParams(
                TickMath.minUsableTick(60),
                TickMath.maxUsableTick(60),
                10 ether
            ),
            abi.encode(alice)
        );
    }

    function testHooks() public {
        bool zeroForOne = true;
        int256 amountSpecified = -1e18; // negative number indicates exact input swap!
        BalanceDelta swapDelta = swap(
            key,
            zeroForOne,
            amountSpecified,
            abi.encode(alice)
        );

        assertEq(int256(swapDelta.amount0()), amountSpecified);
        assert(partycle.erc20BalanceOf(alice) > 0);
    }

    function testAccumulation() public {
        uint256 balance = partycle.erc721BalanceOf(alice);
        partycle.mintERC20(alice, 1e18);
        assertEq(partycle.erc721BalanceOf(alice) - balance, 1);
    }

    function testScrath() public {
        uint256[] memory minted = partycle.owned(alice);

        uint256 balanceERC721 = partycle.erc721BalanceOf(alice);
        uint256 balanceERC20 = partycle.erc20BalanceOf(alice);

        vm.startPrank(alice);
        partycle.scratch(minted[0], token0);
        vm.stopPrank();

        assertEq(partycle.erc721BalanceOf(alice), balanceERC721 - 1);
        assertEq(partycle.erc20BalanceOf(alice), balanceERC20 - 1e18);
    }

    function testLiquidityHooks() public {
        // remove liquidity
        int256 liquidityDelta = -1e18;
        modifyLiquidityRouter.modifyLiquidity(
            key,
            IPoolManager.ModifyLiquidityParams(-60, 60, liquidityDelta),
            ZERO_BYTES
        );
    }
}

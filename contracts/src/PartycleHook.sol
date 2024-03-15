// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BaseHook} from "v4-periphery/BaseHook.sol";

import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "v4-core/src/types/PoolId.sol";
import {BalanceDelta} from "v4-core/src/types/BalanceDelta.sol";

contract PartycleHook is BaseHook {
    using PoolIdLibrary for PoolKey;

    IPartycle partycle;

    // NOTE: ---------------------------------------------------------
    // state variables should typically be unique to a pool
    // a single hook contract should be able to service multiple pools
    // ---------------------------------------------------------------

    constructor(IPoolManager _poolManager) BaseHook(_poolManager) {}

    function getHookPermissions()
        public
        pure
        override
        returns (Hooks.Permissions memory)
    {
        return
            Hooks.Permissions({
                beforeInitialize: false,
                afterInitialize: false,
                beforeAddLiquidity: true,
                afterAddLiquidity: false,
                beforeRemoveLiquidity: false,
                afterRemoveLiquidity: false,
                beforeSwap: false,
                afterSwap: true,
                beforeDonate: false,
                afterDonate: false
            });
    }

    // requires calldata to be an abi.encoded address of the user's wallet
    function afterSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata swapParams,
        BalanceDelta,
        bytes calldata data
    ) external override returns (bytes4) {
        uint256 amount = swapParams.amountSpecified > 0
            ? uint256(swapParams.amountSpecified)
            : uint256(-swapParams.amountSpecified);
        address swapper = abi.decode(data, (address));
        //partycle.mint();

        return BaseHook.afterSwap.selector;
    }

    function afterAddLiquidity(
        address,
        PoolKey calldata key,
        IPoolManager.ModifyLiquidityParams calldata liquidityParams,
        BalanceDelta,
        bytes calldata data
    ) external override returns (bytes4) {
        uint256 amount = liquidityParams.liquidityDelta > 0
            ? uint256(liquidityParams.liquidityDelta)
            : uint256(-liquidityParams.liquidityDelta);
        address swapper = abi.decode(data, (address));
        //partycle.mint(amount, swapper);

        return BaseHook.beforeAddLiquidity.selector;
    }
}

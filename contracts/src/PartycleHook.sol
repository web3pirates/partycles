// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {BaseHook} from "v4-periphery/BaseHook.sol";

import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {PoolId, PoolIdLibrary} from "v4-core/src/types/PoolId.sol";
import {BalanceDelta} from "v4-core/src/types/BalanceDelta.sol";
import {IPartycle} from "./interfaces/IPartycle.sol";
import {IERC20} from "../lib/v4-core/lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol";
import {Currency, CurrencyLibrary} from "../lib/v4-core/src/types/Currency.sol";

contract PartycleHook is BaseHook {
    event Test(string);

    using PoolIdLibrary for PoolKey;
    using CurrencyLibrary for Currency;

    uint256 PARTYCLE_FEE = 500;

    IPartycle public partycle;

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
                beforeAddLiquidity: false,
                afterAddLiquidity: true,
                beforeRemoveLiquidity: false,
                afterRemoveLiquidity: false,
                beforeSwap: true,
                afterSwap: true,
                beforeDonate: false,
                afterDonate: false
            });
    }

    function setPartycle(IPartycle _partycle) public {
        partycle = _partycle;
    }

    // requires calldata to be an abi.encoded address of the user's wallet
    function beforeSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata swapParams,
        bytes calldata data
    ) external override returns (bytes4) {
        // negative if exact input, positive if exact output
        int256 amountSpecified = swapParams.amountSpecified;

        // if amount specified < 0, then manage it in afterSwap
        if (amountSpecified > 0) return BaseHook.beforeSwap.selector;

        // here we are sure it's an exact input
        bool isAmountInToken0 = swapParams.zeroForOne;
        uint256 feeAmount = (uint256(-amountSpecified) * PARTYCLE_FEE) /
            100_000;

        IERC20 token = IERC20(
            isAmountInToken0
                ? address(uint160(key.currency0.toId()))
                : address(uint160(key.currency1.toId()))
        );
        address swapper = abi.decode(data, (address));
        token.transferFrom(swapper, address(this), feeAmount);

        partycle.mintERC20(swapper, feeAmount);

        return BaseHook.beforeSwap.selector;
    }

    // requires calldata to be an abi.encoded address of the user's wallet
    function afterSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata swapParams,
        BalanceDelta,
        bytes calldata data
    ) external override returns (bytes4) {
        // negative if exact input, positive if exact output
        int256 amountSpecified = swapParams.amountSpecified;

        // if amount specified > 0, then it was managed in beforeSwap
        if (amountSpecified < 0) return BaseHook.afterSwap.selector;

        // here we are sure it's an exact input
        bool isAmountInToken0 = swapParams.zeroForOne;
        uint256 feeAmount = (uint256(amountSpecified) * PARTYCLE_FEE) / 100_000;

        IERC20 token = IERC20(
            isAmountInToken0
                ? address(uint160(key.currency0.toId()))
                : address(uint160(key.currency1.toId()))
        );
        address swapper = abi.decode(data, (address));
        token.transferFrom(swapper, address(this), feeAmount);

        partycle.mintERC20(swapper, feeAmount);

        return BaseHook.afterSwap.selector;
    }

    // requires calldata to be an abi.encoded address of the user's wallet
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

        partycle.mintERC20(swapper, amount);

        return BaseHook.afterAddLiquidity.selector;
    }
}

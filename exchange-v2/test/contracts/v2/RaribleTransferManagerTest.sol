// SPDX-License-Identifier: MIT

pragma solidity >=0.6.9 <0.8.0;
pragma experimental ABIEncoderV2;

import "../../../contracts/exchange/v2/RaribleTransferManager.sol";
import "../../../contracts/exchange/v2/ITransferExecutor.sol";
import "../../../contracts/exchange/v2/OrderValidator.sol";

contract RaribleTransferManagerTest is RaribleTransferManager, TransferExecutor, OrderValidator {

    function checkDoTransfers( LibAsset.AssetType memory makeMatch,
        LibAsset.AssetType memory takeMatch,
        LibFill.FillResult memory fill,
        LibOrder.Order memory leftOrder,
        LibOrder.Order memory rightOrder)external {
        doTransfers(makeMatch, takeMatch, fill, leftOrder, rightOrder);
    }

    function __TransferManager_init(TransferProxy _transferProxy, ERC20TransferProxy _erc20TransferProxy) external initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
        __TransferExecutor_init_unchained(_transferProxy, _erc20TransferProxy);
        __OrderValidator_init_unchained();
    }
}

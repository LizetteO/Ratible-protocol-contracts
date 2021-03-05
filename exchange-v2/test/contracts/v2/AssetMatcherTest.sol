pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "../../../contracts/exchange/v2/AssetMatcher.sol";

//todo тест на кастомный asset matcher
contract AssetMatcherTest is Initializable, OwnableUpgradeable, AssetMatcher {

    function __AssetMatcherTest_init() external {
        __Ownable_init_unchained();
    }

    function matchAssetsTest(LibAsset.AssetType calldata leftAssetType, LibAsset.AssetType calldata rightAssetType) external view returns (LibAsset.AssetType memory) {
        return matchAssets(leftAssetType, rightAssetType);
    }
}

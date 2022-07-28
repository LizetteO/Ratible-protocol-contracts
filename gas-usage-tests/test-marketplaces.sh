#!/usr/bin/env bash
truffle test \
        ./test/marketplaces.test.js \
        ./test/contracts/RaribleTestHelper.sol \
        ./test/contracts/LooksRareTestHelper.sol \
        ./test/contracts/TestERC20.sol \
        ./test/contracts/TestERC721.sol \
        --compile-all
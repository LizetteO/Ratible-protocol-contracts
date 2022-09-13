const RariMine = artifacts.require("RariMine.sol");
const Staking = artifacts.require("Staking.sol");
const ERC20 = artifacts.require("TestERC20.sol");
const truffleAssert = require('truffle-assertions');
const tests = require("@daonomic/tests-common");
const increaseTime = tests.increaseTime;
const { expectThrow } = require("@daonomic/tests-common");

contract("RariMine", accounts => {
	let staking;
	let testStaking;
	let token;
	let deposite;

	const DAY = 86400;
 	const WEEK = DAY * 7;
 	const MONTH = WEEK * 4;
 	const YEAR = DAY * 365;

	beforeEach(async () => {
		deposite = accounts[1];
		tokenOwner = accounts[2];
		token = await ERC20.new();
		staking = await Staking.new();
		await staking.__Staking_init(token.address); //initialize staking, set token
		rariMine = await RariMine.new(token.address, tokenOwner, staking.address); //initialize rariMine
	})

	describe("Check RariMine claim", () => {

		it("Test 1. Claim() and stake tokens", async () => {
			await token.mint(tokenOwner, 1500);
   		await token.approve(rariMine.address, 1000000, { from: tokenOwner });
      const recipient = accounts[3];
      const amount = 100;
      let balanceRecipient = {recipient: recipient, value: amount};
      await rariMine.plus([balanceRecipient]);
      await rariMine.setSlopePeriod(10);
      await rariMine.setCliffPeriod(10);
      await rariMine.claim({from: recipient});

      let balanceOf = await staking.balanceOf.call(recipient);
      assert.equal(balanceOf, 0x1f);
      assert.equal(await token.balanceOf(staking.address), 100);
      assert.equal(await token.balanceOf(rariMine.address), 0);
      assert.equal(await token.balanceOf(tokenOwner), 1400);
		});

		it("Test 2. Claim() and transfer tokens to recipient", async () => {
			await token.mint(tokenOwner, 1500);
   		await token.approve(rariMine.address, 1000000, { from: tokenOwner });
      const recipient = accounts[3];
      const amount = 100;
      let balanceRecipient = {recipient: recipient, value: amount};
      await rariMine.plus([balanceRecipient]);
      await rariMine.claim({from: recipient});

      let balanceOf = await staking.balanceOf.call(recipient);
      assert.equal(balanceOf, 0x0);
      assert.equal(await token.balanceOf(recipient), 100);
      assert.equal(await token.balanceOf(staking.address), 0);
      assert.equal(await token.balanceOf(rariMine.address), 0);
      assert.equal(await token.balanceOf(tokenOwner), 1400);
		});

	})

})
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");



describe("Bank", function () {
  async function deployBankFixture() {
    const [admin, user1, user2] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy(admin.address);
    return { bank, admin, user1, user2 };
  }

  it("Should allow deposits and update balance ledger", async function () {
    const { bank, user1 } = await loadFixture(deployBankFixture);
    const depositAmount = "1000000000000000000";

    await bank.connect(user1).deposite({ value: depositAmount });

    expect(await bank.balanceLedger(user1.address)).to.equal(depositAmount);
  });
it("Should transfer funds between accounts", async function () {
  const { bank, admin, user1 } = await loadFixture(deployBankFixture);
  const depositAmount = "10000000000000000000"; // 10 Ether
  const transferAmount = "4000000000000000000"; // 4 Ether

  // Deposit funds into the admin's account
  await bank.connect(admin).deposite({ value: depositAmount });

  // Transfer funds from admin to user1
  await bank.connect(admin).transfer(transferAmount, user1.address);

  // Check balances after the transfer
  expect(await bank.balanceLedger(user1.address)).to.equal(transferAmount);
  expect(await bank.balanceLedger(admin.address)).to.equal(
    BigInt(depositAmount) - BigInt(transferAmount)
    
  );
});


});

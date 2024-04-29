// 引入 Hardhat 庫和 Chai 断言庫
import { ethers } from "hardhat";
import chai, { expect } from "chai";
import { Contract, Signer } from "ethers";
import { solidity } from "ethereum-waffle/dist/src/chai-binders";

// 將 Solidity 断言庫插入 Chai 中
chai.use(solidity);

// 測試套件
describe("MyToken", () => {
  // 定義變量
  let Token: Contract;
  let token: Contract;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  const TOTAL_SUPPLY = ethers.utils.parseEther("1000");

  // 在每個測試之前執行以下代碼
  beforeEach(async () => {
    // 編譯合約
    Token = await ethers.getContractFactory("MyToken");

    // 部署合約
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await Token.connect(owner).deploy(TOTAL_SUPPLY);

    // 確保每個地址都有一些代幣
    await token.transfer(addr1.address, ethers.utils.parseEther("100"));
    await token.transfer(addr2.address, ethers.utils.parseEther("50"));
  });

  // 測試代幣總量是否正確
  it("Should return the total supply", async () => {
    expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY);
  });

  // 測試地址餘額是否正確
  it("Should return the balance of an address", async () => {
    expect(await token.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY.sub(ethers.utils.parseEther("150")));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
    expect(await token.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("50"));
  });

  // 測試代幣轉移是否正確
  it("Should transfer tokens between addresses", async () => {
    await token.transfer(addr1.address, ethers.utils.parseEther("10"));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("110"));
  });
});

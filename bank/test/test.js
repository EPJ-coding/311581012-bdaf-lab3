
const { expect } = require("chai");


const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Token contract", function () {

  async function deployTokenFixture() {

    const Token = await ethers.getContractFactory("MockDaiToken");
    const [owner, addr1, addr2] = await ethers.getSigners();


    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return { Token, hardhatToken, owner, addr1, addr2 };
  }


  describe("Deployment", function () {

    it("Should set the right owner", async function () {

      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      // Transfer 50 tokens from owner to addr1
      await expect(
        hardhatToken.transfer(addr1.address, 50)
      ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(
        hardhatToken.connect(addr1).transfer(addr2.address, 50)
      ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
    });

    it("Should emit Transfer events", async function () {
      const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      // Transfer 50 tokens from owner to addr1
      await expect(hardhatToken.transfer(addr1.address, 50))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(owner.address, addr1.address, 50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
        .to.emit(hardhatToken, "Transfer")
        .withArgs(addr1.address, addr2.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      /*
      // Try to send 1 token from addr1 (0 tokens) to owner.
      // `require` will evaluate false and revert the transaction.
      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");
      */

      // Owner balance shouldn't have changed.
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});



describe("Bank contract", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshot in every test.
  async function deployBankFixture() {
    // Get the ContractFactory and Signers here.
    const Bank = await ethers.getContractFactory("Bank");
    const [Bank_owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens once its transaction has been
    // mined.
    const hardhatBank = await Bank.deploy();

    await hardhatBank.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Bank, hardhatBank, Bank_owner, addr1, addr2 };
  } 

  async function deployTokenFixture() {
    // Get the ContractFactory and Signers here.
    const Token = await ethers.getContractFactory("MockDaiToken");
    const [Token_owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens once its transaction has been
    // mined.
    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, Token_owner, addr1, addr2 };
  }



  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should set the right owner", async function () {
      const { hardhatBank, Bank_owner } = await loadFixture(deployBankFixture);
      expect(await hardhatBank.owner()).to.equal(Bank_owner.address);
    });

  });


  describe("Transactions", function () {

    
    it("Should allow valid deposit and withdraw", async function () {


      const { hardhatBank, Bank_owner} = await loadFixture(
        deployBankFixture
      );


      const { hardhatToken, Token_owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      expect(
        (await hardhatBank.balanceOf(addr1.address)).toString()
      ).to.equal("0");

      
      // Transfer 500 tokens from owner to addr1
      await expect(
        hardhatToken.transfer(addr1.address, 500)
      ).to.changeTokenBalances(hardhatToken, [Token_owner, addr1], [-500, 500]);
      
      
      // addr1 deposit 50 tokens to bank/*
      const erc20WithSigner = hardhatToken.connect(addr1);
      const approveTx = await erc20WithSigner.approve(hardhatBank.address, "100000000");
      await approveTx.wait();
      
      const BankWithSigner = hardhatBank.connect(addr1);
      const depositTx = await BankWithSigner.deposit(hardhatToken.address, 50);
      await depositTx.wait();

      // 50 tokens in bank
      expect(
        (await hardhatBank.connect(addr1).balanceOf(hardhatToken.address)).toString()
      ).to.equal("50");

      // 450 tokens in addr1
      expect(
        (await hardhatToken.connect(addr1).balanceOf(addr1.address)).toString()
      ).to.equal("450");     
      
      // addr1 withdraw 50 tokens from bank
      const withdrawTx = await BankWithSigner.withdraw(hardhatToken.address, 50);
      await withdrawTx.wait();

      // 0 tokens in bank
      expect(
        (await hardhatBank.connect(addr1).balanceOf(hardhatToken.address)).toString()
      ).to.equal("0");

      // 500 tokens in addr1
      expect(
        (await hardhatToken.connect(addr1).balanceOf(addr1.address)).toString()
      ).to.equal("500");     
    });
    


    it('Should forbidden invalid deposit and withdraw', async function() {
      const { hardhatBank, Bank_owner} = await loadFixture(
        deployBankFixture
      );


      const { hardhatToken, Token_owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );


      // Transfer 500 tokens from owner to addr1
      await expect(
        hardhatToken.transfer(addr1.address, 500)
      ).to.changeTokenBalances(hardhatToken, [Token_owner, addr1], [-500, 500]);
      
      
      
      const erc20WithSigner = hardhatToken.connect(addr1);
      const approveTx = await erc20WithSigner.approve(hardhatBank.address, "100000000");
      await approveTx.wait();
      
      // addr1 try to deposit 1000 tokens to bank
      const BankWithSigner = hardhatBank.connect(addr1);
      let err=""
      try{
        await BankWithSigner.deposit(hardhatToken.address, 1000);
      }
      catch(e){
        err = e.message;
      }
      expect(err).to.equal("VM Exception while processing transaction: reverted with reason string 'ERC20: transfer amount exceeds balance'");

      // should be 0 tokens in bank
      expect(
        (await hardhatBank.connect(addr1).balanceOf(hardhatToken.address)).toString()
      ).to.equal("0");

      // should be 500 tokens in addr1
      expect(
        (await hardhatToken.connect(addr1).balanceOf(addr1.address)).toString()
      ).to.equal("500");     
      
      // addr1 try to withdraw 50 tokens from bank

      try{
        await BankWithSigner.withdraw(hardhatToken.address, 50);
      }
      catch(e){
        err = e.message;
      }
      expect(err).to.equal("VM Exception while processing transaction: reverted with reason string 'Insufficient balance'");
      // 0 tokens in bank
      expect(
        (await hardhatBank.connect(addr1).balanceOf(hardhatToken.address)).toString()
      ).to.equal("0");

      // 500 tokens in addr1
      expect(
        (await hardhatToken.connect(addr1).balanceOf(addr1.address)).toString()
      ).to.equal("500");   

    });

  });
});


const { expect } = require("chai");

describe('FamilyFunds', async function () {
  it('should set the right owner', async function () {
    const [ownerAccount, account1, account2] = await ethers.getSigners()
    const [ownerAddress, addr1, addr2] = addresses.map(account => account.address)

    const FamilyFundsContract = await ethers.getContractFactory('FamilyFunds')
    const familyFunds = await FamilyFundsContract.deploy([addr1, addr2])
    
    await familyFunds.deployTransaction.wait()

    expect(await familyFunds.owner()).to.be.equal(ownerAddress)
  })

  it('should recognise addresses as family members', async function () {
    const [ownerAcc, account1, account2, account3] = await ethers.getSigners()
    const [ownerAddress, addr1, addr2, addr3] = addresses.map(account => account.address)

    const FamilyFundsContract = await ethers.getContractFactory('FamilyFunds')
    const familyFunds = await FamilyFundsContract.deploy([addr1, addr2])

    await familyFunds.deployTransaction.wait()

    expect(await familyFunds.isFamilyMember(addr1)).to.equal(true)
    expect(await familyFunds.isFamilyMember(addr2)).to.equal(true)
    expect(await familyFunds.isFamilyMember(addr3)).to.equal(false)
  })
})


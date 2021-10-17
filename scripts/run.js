const main = async() => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const begContractContractFactory = await hre.ethers.getContractFactory("BegContract")
  const begContract = await begContractContractFactory.deploy()
  await begContract.deployed()

  console.log("Deployed to "+ begContract.address+"\n")
  console.log("Contract deployed by:", owner.address);

  for(i=0; i<5; i++){
    await begContract.increment()
  }

  console.log("Enter random person")

  let begTxn = await begContract.connect(randomPerson).increment();
  await begTxn.wait();

  let totalBegs = await begContract.connect(randomPerson).getTotalBegs();
  console.log("Total begs after execution = ",totalBegs)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};

runMain()

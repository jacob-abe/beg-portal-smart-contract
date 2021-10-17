const main = async() => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const consoleAppContractFactory = await hre.ethers.getContractFactory("ConsoleApp")
  const consoleContract = await consoleAppContractFactory.deploy()
  await consoleContract.deployed()

  console.log("Deployed to "+ consoleContract.address+"\n")
  console.log("Contract deployed by:", owner.address);

  for(i=0; i<5; i++){
    await consoleContract.increment()
  }

  console.log("Enter random person")

  let consoleTxn = await consoleContract.connect(randomPerson).increment();
  await consoleTxn.wait();
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

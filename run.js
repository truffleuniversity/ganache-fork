const Web3 = require('web3');
const makerAbi = require('./abi.json');

const recipientAddress = '0x0000000000000000000000000000000000000000';

const unlockedAddress = '0x8EE7D9235e01e6B42345120b5d270bdB763624C7';
const makerContractAddress = '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2';

const web3 = new Web3('http://127.0.0.1:8545');

const maker = new web3.eth.Contract(
    makerAbi,
    makerContractAddress
);

async function run() {
    let unlockedBalance, recipientBalance;
    ([unlockedBalance, recipientBalance] = await Promise.all([
        maker.methods
            .balanceOf(unlockedAddress)
            .call(),
        maker.methods
            .balanceOf(recipientAddress)
            .call()
    ]));
    console.log(`Maker Balance: ${unlockedBalance}`);
    console.log(`Local Account Balance: ${recipientBalance}`);

    await maker.methods
        .transfer(recipientAddress, 10)
        .send({from: unlockedAddress});

    ([unlockedBalance, recipientBalance] = await Promise.all([
        maker.methods
            .balanceOf(unlockedAddress)
            .call(),
        maker.methods
            .balanceOf(recipientAddress)
            .call()
    ]));

    console.log(`New Maker Balance: ${unlockedBalance}`);
    console.log(`New Local Account Balance: ${recipientBalance}`);
}

run();
const { Zilliqa } = require('@zilliqa-js/zilliqa')
const { MessageType } = require('@zilliqa-js/subscriptions')
const zilliqa = new Zilliqa('https://api.zilliqa.com')

const duck_contract = '0xc6bb661eda683bdc792b3e456a206a92cc3cb92e'
const nfd_contract = process.env.NFD_CONTRACT || '0x06f70655d4aa5819e711563eb2383655449f24e9'


export async function getDuckHolders () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        nfd_contract,
        "token_owners"
    )).result.token_owners
    
    const arrayResult = Object.entries(result).map(x => ({ id: x[0], address: x[1] }))
    return arrayResult
     
}

export async function getDuckTokenHolders () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        duck_contract,
        "balances"
    )).result.balances

    return result
}
 
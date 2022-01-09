const environment = require('@/helpers/environment')
const { Zilliqa } = require('@zilliqa-js/zilliqa')


const zilliqa = new Zilliqa(environment.getRpcUrl())

 

export async function getDuckHolders () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        environment.getContractAddress('NFT_CONTRACT'),
        "token_owners"
    )).result.token_owners
    
    const arrayResult = Object.entries(result).map(x => ({ id: x[0], address: x[1] }))
    return arrayResult
     
}

export async function getDuckTokenHolders () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        environment.getContractAddress('TOKEN_CONTRACT'),
        "balances"
    )).result.balances

    return result
}
 
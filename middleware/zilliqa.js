const environment = require('@/helpers/environment')
const { Zilliqa } = require('@zilliqa-js/zilliqa')
const {  units } = require('@zilliqa-js/util')
 

const zilliqa = new Zilliqa(environment.getRpcUrl())
// const mainnetZilliqa = new Zilliqa('https://api.zilliqa.com')

export async function fetchVoucherOwners () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        environment.getContractAddress('VOUCHER_CONTRACT'),
        "token_owners"
    ))

    const pairs = Object.entries(result.result.token_owners).map(x => ({ id: x[0], address: x[1] }))
    return pairs
}

export async function fetchUserRewardsState () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        environment.getContractAddress('MAINNET_REWARDS_CONTRACT'),
        "user_claim_rewards"
    )).result.user_claim_rewards
    return result
}

export async function getBalance (wallet) {
    const { result } = await zilliqa.blockchain.getBalance(wallet)  
    const zilInQa = units.toQa(1, units.Units.Zil)
   
    return result.balance / zilInQa
}

export async function getDuckHolders () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        environment.getContractAddress('ZRC6_CONTRACT'),
        "token_owners"
    )).result.token_owners
    
    const arrayResult = Object.entries(result).map(x => ({ id: x[0], address: x[1] }))
    return arrayResult
}


export async function getHeldZRC1Tokens () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        environment.getContractAddress('ZRC1_CONTRACT'),
        "token_owners"
    ))

    const pairs = Object.entries(result.result.token_owners).map(x => ({ id: x[0], address: x[1] }))
    return pairs
}

export async function getZRC1Operators () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        environment.getContractAddress('ZRC1_CONTRACT'),
        "operator_approvals"
    ))

    return result.result.operator_approvals
}


export async function getDuckTokenHolders () {
    const result = (await zilliqa.blockchain.getSmartContractSubState(
        environment.getContractAddress('TOKEN_CONTRACT'),
        "balances"
    )).result.balances || []

    return result
}
 
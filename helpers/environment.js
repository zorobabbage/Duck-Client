export function getContractAddress (address) {
    const network = process.env.zilliqa_network
    
    switch (network) {
      case 'testnet': {
        switch (address) {
          case 'ZRC6_CONTRACT': return process.env.TESTNET_ZRC6_CONTRACT
          case 'ZRC1_CONTRACT': return process.env.TESTNET_ZRC1_CONTRACT
          case 'PROXY_CONTRACT': return process.env.TESTNET_PROXY_CONTRACT
          case 'TOKEN_CONTRACT': return process.env.TESTNET_TOKEN_CONTRACT
          case 'MIGRATOR_CONTRACT': return process.env.TESTNET_MIGRATOR_CONTRACT
        }
      }
      case 'mainnet': {
        switch (address) {
          case 'ZRC6_CONTRACT': return process.env.mainnet_zrc6_contract
          case 'ZRC1_CONTRACT': return process.env.mainnet_zrc1_contract
          case 'PROXY_CONTRACT': return process.env.mainnet_proxy_contract
          case 'TOKEN_CONTRACT': return process.env.mainnet_token_contract
          case 'MIGRATOR_CONTRACT': return process.env.mainnet_migrator_contract
          case 'REWARDS_CONTRACT': return process.env.mainnet_rewards_contract
          case 'VOUCHER_CONTRACT': return process.env.mainnet_voucher_contract
          case 'OWNERSHIP_CONTRACT': return process.env.mainnet_ownership_contract
        }
      }
      default: throw new Error('Invalid network')
    }
}

export function getRpcUrl(type = '') {
    const network = process.env.zilliqa_network
    if (network === 'testnet') {
        return type === 'ws' ? 'wss://dev-ws.zilliqa.com' : 'https://dev-api.zilliqa.com'
    } else {
        return type === 'ws' ? 'wss://api-ws.zilliqa.com' : 'https://api.zilliqa.com'
    }
}

export function getNetworkFromEnv () {
    return process.env.zilliqa_network    
}
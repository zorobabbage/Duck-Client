export function getContractAddress (address) {
    const network = process.env.ZILLIQA_NETWORK
    
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
          case 'ZRC6_CONTRACT': return process.env.MAINNET_ZRC6_CONTRACT
          case 'ZRC1_CONTRACT': return process.env.MAINNET_ZRC1_CONTRACT
          case 'PROXY_CONTRACT': return process.env.MAINNET_PROXY_CONTRACT
          case 'TOKEN_CONTRACT': return process.env.MAINNET_TOKEN_CONTRACT
          case 'MIGRATOR_CONTRACT': return process.env.MAINNET_MIGRATOR_CONTRACT
        }
      }
      default: throw new Error('Invalid network')
    }
}

export function getRpcUrl(type = '') {
    const network = process.env.ZILLIQA_NETWORK
    if (network === 'testnet') {
        return type === 'ws' ? 'wss://dev-ws.zilliqa.com' : 'https://dev-api.zilliqa.com'
    } else {
        return type === 'ws' ? 'wss://api-ws.zilliqa.com' : 'https://api.zilliqa.com'
    }
}

export function getNetworkFromEnv () {
    return process.env.ZILLIQA_NETWORK    
}
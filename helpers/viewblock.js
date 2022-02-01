import { getNetworkFromEnv } from '@/helpers/environment'

export const getLink = (tx) => {
    const net = getNetworkFromEnv()
    switch (net) {
        case 'testnet': {
            return `https://viewblock.io/zilliqa/tx/0x${tx.ID}?network=testnet`
        }
        case 'mainnet': {
            return `https://viewblock.io/zilliqa/tx/0x${txID}`
        }
        default: {
            return `https://viewblock.io/zilliqa/tx/0x${tx.ID}`
        }
    }
}
import { BN, Long } from '@zilliqa-js/util'
const environment = require('@/helpers/environment')

const gasLimit = Long.fromString('25000')
const gasPrice = new BN('500000000')
let contract
if (process.browser) {
  contract = window.zilPay.contracts.at(environment.getContractAddress('PROXY_CONTRACT')) 
}

import pollTx from './poll-tx'

export async function doProxyMint(amount) {
  console.log(`proxymint ${amount}`)
  console.log(contract)
  try {
    const tx = await contract.call('ProxyMint', [], {
      amount,
      gasPrice,
      gasLimit
    })

    console.log(tx)
    await pollTx(tx)
    console.log(tx)
    console.log('confirmed')
  } catch (err) {
    console.log(err)
  }
}


export async function doProxyBatchMint(amount, dummy_list_count) {
  console.log(`ProxyBatchMint ${amount} ${dummy_list_count}`)

  try {
    const tx = await contract.call('ProxyBatchMint',
      [
        {
          vname: "dummy_list_count",
          type: "List Uint256",
          value: dummy_list_count
        }
      ],
      {
        amount,
        gasPrice,
        gasLimit: utils.Long.fromNumber(gasLimit)
      })
  } catch (err) {
    console.log(err)
  }
}
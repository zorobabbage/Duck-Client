const environment = require('@/helpers/environment')
const { Zilliqa } = require('@zilliqa-js/zilliqa')
const zilliqa = new Zilliqa(environment.getRpcUrl())

export const pollTx = async (tx) => new Promise((resolve, reject) => {

  const interval = setInterval(async () => {
    console.log(tx.ID)
    const result = await zilliqa.blockchain.getTransactionStatus(tx.ID)
  
    if (result.status === 3 && result.success === true) {
      clearInterval(interval)
      console.log('success')
      resolve(true)
    }
    if (result.status >= 10 || (result.status === 3 && result.success === false)) {
      const failedTx = await zilliqa.blockchain.getTransaction(tx.ID)
      console.log('failed')
      clearInterval(interval)
      reject(failedTx)
    }
  }, 3000)
})
//

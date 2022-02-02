<template>
  <div class="bg-orange-100 rounded-xl w-full h-90 my-8   grid grid-cols-1 lg:grid-cols-2 sm:divide-y lg:divide-x  divide-yellow-50">
    <div class="p-4 md:p-12">
      <h1 class="text-xl font-bold">NFD migration</h1>
      <p class="text-md font-medium mt-4">
        Here you can migrate your old ZRC-1 ducks to the new ZRC-6 standard. This
        process will convert every one of your NFDs to be compatible with the new
        future of zilliqa NFT dapps. The cost for performing this action is zero,
        with gas fees on us! Voucher migration coming soon.
        
      </p>
    </div>
    <div class="p-4 md:p-12">
      <div class="mb-4" v-if="!tooManyDucks">
        <p>You will be migrating {{ oldOwnedIDs.length}} duck<a v-if="oldOwnedIDs.length > 1">s</a>, with us <a class="fond-bold">offsetting {{  oldOwnedIDs.length * 4 }} ZIL</a> worth of transaction fees</p>
      </div>
      <div class="mb-4" v-if="tooManyDucks">
        <p class="test-medium uppercase">You have too many ducks ({{ oldOwnedIDs.length }}) to migrate at this time. This is a known issue which we will be issuing a fix to over the coming days. </p>
      </div>
      <div class="flex flex-col lg:flex-row gap-2 mt-auto pl-auto w-full ">
        <button :disabled="approved || tooManyDucks" @click="approve" class=" bg-orange-200 px-auto rounded-xl py-4 font-semibold flex items-center justify-center text-center w-full disabled:opacity-50">1. Approve</button>
        <button :disabled="!approved || tooManyDucks" @click="migrate" class="bg-orange-200 px-auto rounded-xl py-4 font-semibold flex items-center justify-center text-center w-full disabled:opacity-50">2. Migrate</button>
      </div>
    </div>
  </div>
</template>

<script>
import Big from 'big.js'
import { pollTx } from '@/zilpay/poll-tx'
import { BN, Long } from '@zilliqa-js/util'
const environment = require('@/helpers/environment')

export default {
  computed: {
    wallet() {
      return this.$store.state.wallet.wallet;
    },
    oldOwnedIDs () {
      let pairs = this.$store.state.ducks.zrc1owners
      let owned = pairs.filter(x => x.address.toLowerCase() === this.wallet.base16.toLowerCase())
      let arrayOfIDs = owned.map(pair => pair.id)
      return arrayOfIDs
    },
    approved () {
      let map = this.$store.state.ducks.zrc1operators 
      let contract = environment.getContractAddress('MIGRATOR_CONTRACT')
      let bool = this.wallet.base16.toLowerCase() in map 
      if (bool) {
        let approved = contract in map[this.wallet.base16.toLowerCase()]
        return approved
      }
      return bool 
    },
    tooManyDucks () {
      return this.oldOwnedIDs.length > 5
    }
  },
  methods: {
    async approve() {
      let amount = new BN('0')
      const gasLimit = Long.fromString('25000')
      const gasPrice = new BN('200000000')
      let contract
      if (process.browser) {
        contract = window.zilPay.contracts.at(environment.getContractAddress('ZRC1_CONTRACT')) 
      }

 
      try {
        const tx = await contract.call('SetApprovalForAll',
          [
            {
              vname: "to",
              type: "ByStr20",
              value: environment.getContractAddress('MIGRATOR_CONTRACT')
            }
          ],
          {
            amount,
            gasPrice,
            gasLimit
          })


        let txToast = this.$toast.success("TX sending") 
        txToast = this.$styleToast(txToast, tx,   "Approving token spend", 'pending')

        await pollTx(tx)
          .then(res => {
            console.log(res)
            txToast = this.$styleToast(txToast, tx, "Confirmed", 'success')
            txToast.goAway(20000)
          })
          .catch(err => {
            console.log(err)
            txToast = this.$styleToast(txToast, tx, "Approve failed", 'failed')
            txToast.goAway(20000)
          })


      } catch (err) {
        console.log(err)
      }
    },
    async migrate() {
      const tokenArray = this.oldOwnedIDs
      console.log(`Migrate  ${tokenArray}`)

      const amount = new BN('0')
      const gasLimit = Long.fromString('25000')
      const gasPrice = new BN('200000000')
      let contract
      if (process.browser) {
        contract = window.zilPay.contracts.at(environment.getContractAddress('MIGRATOR_CONTRACT')) 
      }

      console.log(contract)
      try {
        const tx = await contract.call('Claim',
          [
            {
              vname: "claim_list",
              type: "List Uint256",
              value: tokenArray.slice(0, 50)
            }
          ],
          {
            amount,
            gasPrice,
            gasLimit
          })


        let txToast = this.$toast.success("TX sending") 
        txToast = this.$styleToast(txToast, tx,   "Migrating", 'pending')

        await pollTx(tx)
          .then(res => {
            console.log(res)
            txToast = this.$styleToast(txToast, tx, "Confirmed", 'success')
            txToast.goAway(20000)
          })
          .catch(err => {
            console.log(err)
            txToast = this.$styleToast(txToast, tx, "Failed", 'failed')
            txToast.goAway(20000)
          })


      } catch (err) {
        console.log(err)
      }
    }
  },
  beforeMount() {
    if (!this.$store.state.ducks.zrc1owners.length) {
      this.$store.dispatch('ducks/fetchZRC1Owners')
      this.$store.dispatch('ducks/fetchZRC1Operators')
    }
  }
}
</script>
 

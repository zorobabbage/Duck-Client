<template>
  <div class="p-5 bg-gray-100 rounded-xl">
    <div class="flex flex-col">
      <h4 class="text-sm font-semibold text-gray-700">{{ from }} - {{ to }}</h4>
      <h4 class="text-sm font-semibold text-gray-400">Block {{ reward.epoch }}</h4>
    </div>
    <div class="flex flex-col mt-3 lg:flex-row min-h-12">
      <div class="flex flex-row mb-6 w-60 md:mb-0">

        <div class="flex flex-row self-center">
          <h4 class="text-lg font-extrabold text-gray-800 uppercase align-middle" style="color: #f1743a!important;">
              {{ (amount / 100).toFixed(2) }} DUCK
          </h4>
          <h4 class="self-center mr-2 ml-2 text-sm font-semibold text-gray-500 align-middle">≈ {{ (duckPrice.usd * amount/100).toFixed(2) }}$</h4>
        </div>
      </div>
      <button
        class="flex justify-center items-center px-3 py-2 ml-auto w-full text-sm font-medium text-white bg-gray-500 rounded-2xl transition-colors duration-200 transform md:max-w-min hover:bg-gray-400w focus:bg-gray-400 focus:outline-none disabled:opacity-50"
              @click="claim" :disabled="!isInState"
      >
        <a v-if="parseInt(amount) > 0">{{ isInState ? 'Claim' : 'Claimed' }}</a>
        <a v-if="parseInt(amount) == 0">Not elegible</a>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { pollTx } from '@/zilpay/poll-tx'
import { BN, Long } from '@zilliqa-js/util'
const environment = require('@/helpers/environment')

export default {
  props: {
    reward: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      wallet: (state) => state.wallet.wallet,
      duckPrice: (state) => state.wallet.duckPrice,
      userRewardsState: (state) => state.ducks.userRewardsState
    }),
    from () {
      return new Date(this.reward.fromUnixTime * 1000).toLocaleDateString()
    },
    to () {
      return new Date(this.reward.toUnixTime * 1000).toLocaleDateString()
    },
    amount () {
      const address = this.wallet.base16
      if (this.reward.rewards.filter(x => x.address.toLowerCase() == address.toLowerCase()).length > 0) {
        console.log()
        
        return this.reward.rewards.find(x => x.address.toLowerCase() == address.toLowerCase()).amount
      }
      return 0
    },
    isInState () {
      const address = this.wallet.base16
      return address.toLowerCase() in this.userRewardsState[this.reward.epoch] 
    }
  },
  methods: {
    async claim() {
      let amount = new BN('0')
      const gasLimit = Long.fromString('5000')
      const gasPrice = new BN('200000000')
      let contract
      if (process.browser) {
        contract = window.zilPay.contracts.at(environment.getContractAddress('REWARDS_CONTRACT')) 
      }

 
      try {
        const tx = await contract.call('userClaimRewardRow',
          [
            {
                vname: 'claim_block',
                type: 'BNum',
                value: String(this.reward.epoch)
            }
          ],
          {
            amount,
            gasPrice,
            gasLimit
          })


        let txToast = this.$toast.success("TX sending") 
        txToast = this.$styleToast(txToast, tx,   `Claiming rewards for block ${this.reward.epoch}`, 'pending')

        await pollTx(tx)
          .then(res => {
            console.log(res)
            txToast = this.$styleToast(txToast, tx, "Confirmed", 'success')
            this.approved = true
            txToast.goAway(20000)
          })
          .catch(err => {
            console.log(err)
            txToast = this.$styleToast(txToast, tx, "Claim failed", 'failed')
            txToast.goAway(20000)
          })


      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

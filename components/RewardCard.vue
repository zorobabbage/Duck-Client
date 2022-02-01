<template>
  <div class="bg-gray-100 p-5 rounded-xl">
    <div class="flex flex-col">
      <h4 class="text-sm font-semibold text-gray-700">{{ from }} - {{ to }}</h4>
      <h4 class="text-sm font-semibold text-gray-400">Block {{ reward.epoch }}</h4>
    </div>
    <div class="flex flex-col lg:flex-row min-h-12 mt-3">
      <div class="w-60 flex flex-row mb-6 md:mb-0">

        <div class="self-center flex flex-row">
          <h4 class="align-middle text-lg font-extrabold uppercase text-gray-800" style="color: #f1743a!important;">
              {{ (amount / 100).toFixed(2) }} DUCK
          </h4>
          <h4 class="align-middle self-center mr-2 text-sm font-semibold text-gray-500 ml-2">≈ {{ (duckPrice.usd * amount/100).toFixed(2) }}$</h4>
        </div>
      </div>
      <button
        class="
                flex
                w-full
                md:max-w-min
                ml-auto
                items-center
                justify-center
                px-3
                py-2
                text-sm
                font-medium
                text-white
                transition-colors 
                duration-200
                transform
                bg-gray-500
                rounded-2xl
                hover:bg-gray-400
                focus:bg-gray-400 focus:outline-none
              "
      >
        <span class="m-2 text-white" >
          Claim
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      duckPrice: (state) => state.wallet.duckPrice
    }),
    from () {
      return new Date(this.reward.fromUnixTime * 1000).toLocaleDateString()
    },
    to () {
      return new Date(this.reward.toUnixTime * 1000).toLocaleDateString()
    },
    amount () {
      const address = this.wallet.base16
      if (this.reward.rewards.filter(x => x.address == address.toLowerCase()).length > 0) {
        return this.reward.rewards.find(x => x.address == address.toLowerCase()).amount
      }
      return 0
    }
  }
}
</script>

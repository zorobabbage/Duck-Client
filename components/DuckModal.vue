
<template>
  <div
    v-if="show"
    class="
      modal
      fixed
      w-full
      h-full
      top-0
      left-0
      flex
      items-center
      justify-center
    "
  >
    <div
      @click.self="close_modal()"
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="
        modal-container
        bg-white
        w-11/12
        md:max-w-md
        mx-auto
        rounded-xl
        shadow-lg
        z-50
        overflow-y-auto
      "
    >
      <div class="modal-content text-left px-6">
        <div class="my-6">
          <h4 class="align-middle mr-2 text-lg font-semibold text-gray-600 ml-2">Your DUCK balance</h4>

          <div class="flex flex-row my-2">
            <h4 class="align-middle mr-2 text-3xl font-extrabold uppercase text-gray-800 ml-2" style="color: #f1743a!important;">
              {{ duckHeld / 100 }} DUCK
            </h4>
            <img class="h-10" src="https://meta.viewblock.io/ZIL.zil1c6akv8k6dqaac7ft8ezk5gr2jtxrewfw8hc27d/logo?t=dark"/>

            <h4 class="align-middle self-center mr-2 text-sm font-semibold text-gray-500 ml-2">≈ {{ (duckPriceUSD * duckHeld/100).toFixed(2) }}$</h4>
          </div>

          <h4 class="align-middle mr-2 mb-1 mt-6 text-sm font-semibold text-gray-600 ml-2">Claim rewards</h4>

          <RewardSection />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        duckPriceUSD: 0
    }
  },
  computed: {
    wallet() {
      return this.$store.state.wallet.wallet;
    },
    zilPay() {
      if (process.browser) {
        if (window.zilPay) return window.zilPay;
      }
    },
    duckHeld () {
        let amounts = this.$store.state.ducks.duckTokenOwnerAmounts
        const wallet = this.$store.state.wallet.wallet.base16.toLowerCase()
        let thisAmount = amounts[wallet]
        if (thisAmount === undefined) thisAmount = 0
        return thisAmount
    }
  },
  methods: {
    async getCurrentDuckPrice() {
        const data = await fetch("https://api.zilstream.com/tokens/zil1c6akv8k6dqaac7ft8ezk5gr2jtxrewfw8hc27d")
                            .then((response) => response.json())
        const { rate, rate_usd } = data
        this.duckPriceUSD = rate_usd
    },
    close_modal() {
      this.$emit("close");
    },
  },
  mounted() {
    this.getCurrentDuckPrice()
  },
  props: {
    show: Boolean,
  }
}
</script>

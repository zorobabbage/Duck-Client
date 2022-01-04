<template>
  <div>
    <button @click="showModal = true" class="px-2 font-medium flex items-center justify-center text-center">
        {{ (duckHeld/100).toFixed(2) }}
    </button>
    <slot />
    <DuckModal :show="showModal" @close="showModal = false"> </DuckModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      duckPriceUSD: 0
    };
  },
  methods: {

  },
  computed: {
    duckHeld () {
      let amounts = this.$store.state.ducks.duckTokenOwnerAmounts
      const wallet = this.$store.state.wallet.wallet.base16.toLowerCase()
      let thisAmount = amounts[wallet]
      if (thisAmount === undefined) thisAmount = 0
      return thisAmount
    }
  }
};
</script>


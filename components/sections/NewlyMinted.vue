<template>
  <section class="flex flex-col items-center">
    <H2 v-if="show" class="text-center max-w-lg xl:max-w-2xl 2xl:max-w-4xl">
      Latest ducks in the pond
    </H2>
    <div
      v-if="show"
      class="flex flex-col items-center lg:flex-row lg:justify-center"
    >
      <img
        v-for="duckUri in latestFiveDuckUris"
        :key="duckUri.id"
        :src="duckUri.uri"
        alt="Unkown duck"
        class="lg:w-48 xl:w-64 2xl:w-80"
      >
    </div>
    <Link
      v-if="show && latestFiveDuckUris.length > 0"
      target="_blank"
      href="https://app.duck.community/duckstore"
      class="mt-8"
    >
      Show me some more duckies please
    </Link>
    <P v-else-if="show" class="mt-8">
      There are no ducks yet :(
    </P>
    <div v-else class="flex flex-col items-center justify-center">
      <H2 class="text-center max-w-lg xl:max-w-2xl 2xl:max-w-4xl">
        {{ message }}
      </H2>
      <button class="p-4 bg-zilliqa rounded-2xl mt-4" @click="connect">
        Connect
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: 'Please connect your wallet to show newly minted ducks!'
    }
  },
  computed: {
    latestFiveDuckUris () {
      const duckUris = this.$store.state.ducks.duckUris
      if (duckUris.length <= 5) {
        return duckUris
      }
      return duckUris.slice(duckUris.length - 5, duckUris.length)
    }
  },
  mounted () {
    if (window.zilPay === undefined) {
      this.show = false
      this.message =
        'Please install the zilpay extension to show newly minted ducks'
      return
    }

    const networkStream = window.zilPay.wallet.observableNetwork()
    networkStream.subscribe((net) => {
      if (net !== process.env.zilliqaNetwork) {
        this.show = false
        this.message = `Please choose ${process.env.zilliqaNetwork} in your wallet`
        return
      }
      this.show = true
    })
  },
  methods: {
    connect () {
      if (window.zilPay === undefined) {
        this.show = false
        this.message =
          'Please install the zilpay extension to show newly minted ducks'
        return
      }
      if (window.zilPay.wallet.net !== process.env.zilliqaNetwork) {
        this.show = false
        this.message = `Please choose ${process.env.zilliqaNetwork} in your wallet`
      } else {
        this.$store.dispatch('ducks/fetchDuckUris')
        this.show = true
      }
    }
  }
}
</script>

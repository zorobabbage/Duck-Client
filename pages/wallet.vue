<template>
  <div class='bg-gray-50'>
    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden pt-12 px-4 min-h-screen'>
      <div class='flex flex-col space-y-1 '>
        <h1 class='text-4xl font-medium'>Your Wallet</h1>
        <h4 v-if="wallet.bech32.length" class="font-medium text-gray-600" > {{ wallet.bech32 }} </h4>
        <div v-else class="h-6 w-64 bg-gray-200 rounded-2xl mb-2"/>
      </div>
      <div v-if="userDucks.length > 0" class="my-8">
        <h4 class='text-3xl font-semibold text-gray-800 mt-12'>{{ userDucks.length }} ducks</h4>
        <div v-if="this.userDucks.length > 0" class='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 my-12'>
            <NFTCard v-for='duck in userDucks' :key='duck.id' :duck="duck" class='mb-6'/>
        </div>
      </div>
      <div v-else class="my-8">
        <div class="h-72 w-full rounded-2xl bg-gray-200 flex items-center">
            <p class="text-gray-700 m-auto self-center align-middle text-center text-2xl font-semibold">Connect your wallet to see your ducks</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>


export default {
    computed: {
        wallet () {
            return this.$store.state.wallet.wallet
        },
        zilPay () {
            if (process.browser) {
                if (window.zilPay) return window.zilPay
            }
        },
        userDucks () {
            return this.$store.state.store.userDucks
        }
    },
    methods: {
        fetchUserDucks () {
            this.$store.dispatch('explore/fetchUserDucks', this.$store.state.wallet.wallet.base16)
        }
    },
    async beforeMount () {
        const thisWallet = this.$store.state.wallet.wallet.base16
        if (thisWallet) this.fetchUserDucks()
    },
    created() {
        this.$nuxt.$on('walletConnected', () => {
            this.fetchUserDucks()
        })
    },
    beforeDestroy() {
        this.$nuxt.$off('walletConnected')
    },
}
</script>


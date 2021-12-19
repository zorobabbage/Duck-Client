<template>
  <div class='bg-gray-50'>
    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden pt-12 px-4 h-screen'>
      <div class='flex flex-col space-y-1 '>
        <h1 class='text-4xl font-medium'>Your Wallet</h1>
        <h4 class="font-medium text-gray-600"> {{ wallet.bech32 }} </h4>
      </div>
      <div v-if="userDucks.length > 0">
        <h4 class='text-3xl font-semibold text-gray-800 mt-12'>{{ userDucks.length }} ducks</h4>
        <div v-if="this.userDucks.length > 0" class='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 my-12'>
            <NFTCard v-for='duck in userDucks' :key='duck.id' :duck="duck" class='mb-6'/>
        </div>
      </div>
      <div v-else>
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
        async fetchTokenOwners () {
            await this.$store.dispatch('store/fetchTokenOwners')
            const thisWallet = this.wallet.base16

            const userDuckIDs = this.$store.state.store.tokenOwners.filter(x => x.address == thisWallet.toLowerCase()).map(x => x.id)
            if (userDuckIDs) this.fetchUserDucksFromIDs(userDuckIDs)
        },
        fetchUserDucksFromIDs (ids) {
            this.$store.dispatch('store/fetchUserDucks', ids)
        }
    },
    async beforeMount () {
        this.fetchTokenOwners()
    },
    created() {
        this.$nuxt.$on('walletConnected', () => {
            this.fetchTokenOwners()
        })
    },
    beforeDestroy() {
        this.$nuxt.$off('walletConnected')
    },
}
</script>


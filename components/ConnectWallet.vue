<template>
    <div>
        <button @click="handleClick" class="px-2 font-medium flex items-center justify-center text-center w-full">
            {{ zilPay ? wallet.bech32 ? `${wallet.bech32.slice(0, 6)}...${wallet.bech32.slice(-6)}` : 'Connect wallet' : 'Zilpay not found' }}
        </button>
        <slot />
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
        }
    },
    methods: {
        async handleClick() {
            if (this.wallet.isConnected) {
                this.$router.push({
                    path: '/wallet'
                })
            }

            if (!window.zilPay) return

            const isConnect = await window.zilPay.wallet.connect();
            if (isConnect) {
                this.$store.dispatch('wallet/setWallet', { 
                    bech32: window.zilPay.wallet.defaultAccount.bech32,
                    base16: window.zilPay.wallet.defaultAccount.base16,
                    isConnected: true
                })
                console.log(this.wallet)
                this.$nuxt.$emit('walletConnected')
            } else {
                throw new Error('user rejected');
            }
        }
    },
    mounted () {
        this.$store.dispatch('wallet/getZilpay')
    }
}
</script>

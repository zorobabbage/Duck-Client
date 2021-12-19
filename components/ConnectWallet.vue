<template>
    <div class="inline-flex self-center px-3 rounded-2xl bg-gray-100 text-gray-700 h-14 my-auto text-lg">
        <button @click="handleClick" class="px-2 ">
            {{ zilPay ? wallet.bech32 ? `${wallet.bech32.slice(0, 6)}...${wallet.bech32.slice(-6)}` : 'Connect wallet' : 'Zilpay not found' }}
        </button>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="self-center ml-auto text-gray-700">
                <path d="M17 13H5V9V5H17V13ZM1 3V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15V3C17 2.46957 16.7893 1.96086 16.4142 1.58579C16.0391 1.21071 15.5304 1 15 1L3 1C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3Z" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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
            if (this.wallet.isConnected) console.log('already connected') // goto(`/account/${$wallet.bech32}`)
            if (!window.zilPay) return
            const isConnect = await window.zilPay.wallet.connect();
            if (isConnect) {
                this.$store.dispatch('wallet/setWallet', { 
                    bech32: window.zilPay.wallet.defaultAccount.bech32,
                    base16: window.zilPay.wallet.defaultAccount.base16,
                    isConnected: true
                })
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

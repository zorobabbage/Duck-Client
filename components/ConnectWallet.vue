<template>
    <div>
        <button @click="showModal = true" class="px-2 font-medium flex items-center justify-center text-center w-full">
            {{ zilPay ? wallet.bech32 ? `${wallet.bech32.slice(0, 6)}...${wallet.bech32.slice(wallet.bech32.length-6, wallet.bech32.length)}` : 'Connect wallet' : 'Zilpay not found' }}
        </button>
        <slot />
        <ConnectWalletModal :show="showModal" @close="showModal = false"> </ConnectWalletModal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
    ...mapState({
      wallet: (state) => state.wallet.wallet
    }),
    zilPay() {
      if (process.browser) {
        if (window.zilPay) return window.zilPay;
      }
    },
  },
    data() {
        return {
            showModal: false,
        }
    },
}
</script>

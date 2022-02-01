<template>
  <div class="flex flex-col  lg:max-w-none mx-auto bg-grass-background overflow-hidden items-center">
    <Hero id="home" class="" />

    <div class="grid grid-cols-1 md:grid-cols-2 mt-24 lg:mt-48 container max-w-screen-xl">
      <div class="p-4 md:p-8 xl:pl-0">
        <DuckGif/>
      </div>
      
      <div class="p-4 md:p-8 xl:pr-0">

        <h4 class=" font-extrabold text-5xl mt-2 text-grass-muted">Mint A Duck</h4>
        <p class="mt-5 text-xl text-justify text-gray-800">8192 Duck NFTs with varying rarity levels. Price starts from 1200 to a maximum of 2877 zil. $DUCK token holders are able to regenerate their NFDs. NFD holders can transfer ownership, share and rename their ducks. Additional features may be added as the project progresses. </p>
        <div class="mt-10 flex flex-col md:flex-row">

         
          <div class="flex  flex-row  gap-1 mb-2">
                <input type="number" v-model="numberOfDucks" class="appearance-none font-medium block text-2xl h-16  rounded-2xl  w-full md:text-basecursor-default focus:outline-none text-center bg-gray-200  items-center hover:text-black  text-gray-700 focus:text-black  outline-none"/>
                <div class="w-16">
                  <button class="bg-gray-200 rounded-2xl h-16 w-16 outline-none focus:outline-none flex-grow-0" @click="decrementNumberOfDucks">
                      <span class="m-auto text-4xl font-thin">−</span>
                  </button>
                </div>
                <div class="w-16">
                  <button class="bg-gray-200 rounded-2xl h-16 w-16 outline-none focus:outline-none flex-grow-0" @click="incrementNumberOfDucks">
                    <span class="m-auto text-4xl font-thin">+</span>
                  </button>
                </div>
          </div>
          <ConnectWallet v-if="!wallet.isConnected" class="w-full md:ml-3 bg-sun rounded-3xl h-16  border-2 border-black  font-medium text-xl my-auto inline-flex items-center mx-auto"></ConnectWallet>
          <button v-if="wallet.isConnected" @click="buy" class="md:ml-3 bg-sun rounded-3xl h-16  border-2 border-black  w-full font-medium text-xl">{{`Mint (${zilToPay.zil} ZIL)`}} </button>
        <div>
        </div>
        </div>
        <h4 class="text-xl font-bold text-left flex self-start mt-8 mb-2">Ducks hatched</h4>
        <DucksSold class="mb-8" :currentDuck="currentDuck"/>
      </div>
    </div>
    <div class="container max-w-screen-xl items-start mt-8 md:mt-16 px-4 md:px-0">
      <h4 class="text-2xl font-bold text-left flex self-start mb-8">Fresh from the egg.</h4>
    </div>
    <NewlyMinted
        id="newly-minted"
        class="mb-24 self-center max-w-screen-xl"
      />
      <Team class="my-24"/>
    
  </div>
</template>

<script>
const environment = require('@/helpers/environment')
import Big from 'big.js'
import { pollTx } from '@/zilpay/poll-tx'
import { BN, Long } from '@zilliqa-js/util'


export default {
  data () {
    return {
      numberOfDucks: 1,
      zilToPay: {
        ducks: 1
      },
    }
  },
  methods: {
    incrementNumberOfDucks () {
      this.numberOfDucks++
    },
    decrementNumberOfDucks () {
      if (this.numberOfDucks > 1) {
        this.numberOfDucks--
      }
    },
    buy () {
      const numDucks = this.zilToPay.ducks
      const amount = this.zilToPay.qa
      let arrayOfIDs = Array.from({length: numDucks}, i => String(i + 1))

      if (this.zilToPay.ducks == 1) {
        this.doProxyMint(amount)
      } else {
        this.doProxyBatchMint(amount, arrayOfIDs)
      }
    },
    getPriceAtX (x) {
      const bx = new Big(x)
      const zil = (bx.pow(2).div(40000)).plus(1200)
      const qa = zil.mul(new Big(10).pow(12))
      return {
        zil: zil.toFixed(2),
        qa: qa.toFixed(0)
      }
    },
    getPricesBetweenXandY (x, y) {
      let btotal = new Big(0)
      for (let i = x; i <= y; i++) {
        let thisQa = this.getPriceAtX(i).qa
        btotal = btotal.plus(thisQa)
      }
      return Number(btotal)
    },
    integrateBetweenLimits (min, max) {
      if (max > 8192) max = 8192
      
      const qa = this.getPricesBetweenXandY(min, max)
      const bqa = new Big(qa)
      const zil = bqa.div(new Big(10).pow(12))
     
      const rt = {
        qa: qa.toFixed(0),
        zil: zil.toFixed(2),
        ducks: max - min + 1
      }
     
      this.zilToPay = rt
      return rt
    },
    async doProxyMint() {
      const gasLimit = Long.fromString('25000')
      const gasPrice = new BN('500000000')
      let amount = new BN('0')
      let contract
      if (process.browser) {
        contract = window.zilPay.contracts.at(environment.getContractAddress('PROXY_CONTRACT')) 
      }

      console.log(`proxymint ${amount}`)
      console.log(contract)
      try {
        
  
        const tx = await contract.call('ProxyMint', [], {
          amount,
          gasPrice,
          gasLimit
        })

        
 
        let txToast = this.$toast.success("TX 1 sending") 
        txToast = this.$styleToast(txToast, tx, "Minting", 'block')

        await pollTx(tx)
        
        txToast = this.$styleToast(txToast, tx, "Confirmed", 'check')
        txToast.goAway(10000)
      } catch (err) {
        console.log(err)
      }
    },
    async doProxyBatchMint(amount, dummy_list_count) {
      console.log(`ProxyBatchMint ${amount} ${dummy_list_count}`)
      const gasLimit = Long.fromString('70000')
      const gasPrice = new BN('500000000')
      let contract
      if (process.browser) {
        contract = window.zilPay.contracts.at(environment.getContractAddress('PROXY_CONTRACT')) 
      }

      console.log(`proxymint ${amount}`)
      console.log(contract)
      try {
        const tx = await contract.call('ProxyBatchMint',
          [
            {
              vname: "dummy_list_count",
              type: "List Uint256",
              value: dummy_list_count
            }
          ],
          {
            amount,
            gasPrice,
            gasLimit
          })


        let txToast = this.$toast.success("TX sending") 
        txToast = this.$styleToast(txToast, tx, "Minting", 'block')

        await pollTx(tx)
        
        txToast = this.$styleToast(txToast, tx, "Confirmed", 'check')
        txToast.goAway(10000)


      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    currentDuck () {
      return this.$store.state.ducks.currentDuck
    },
    wallet () {
      return this.$store.state.wallet.wallet
    }
  },
  watch: {
    numberOfDucks: function () {
      if ((parseInt(this.numberOfDucks) + this.currentDuck) > 8192) this.numberOfDucks = 8192 - this.currentDuck

      this.integrateBetweenLimits(this.currentDuck + 1, parseInt(this.numberOfDucks) + this.currentDuck)
    },
    currentDuck: function () {
      this.integrateBetweenLimits(this.currentDuck + 1, parseInt(this.numberOfDucks) + this.currentDuck)
    }
  },
  mounted () {
    this.$store.dispatch('ducks/getAttributeCounts')
    this.integrateBetweenLimits(this.currentDuck + 1, parseInt(this.numberOfDucks) + this.currentDuck)
  },
  beforeMount () {
    this.$store.dispatch('ducks/mainGetBlock')
  }
}
</script>

<style>
input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-number-input input:focus {
    outline: none !important;
  }

  .custom-number-input button:focus {
    outline: none !important;
  }
</style>








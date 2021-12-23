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
          <button v-if="wallet.isConnected" class="md:ml-3 bg-sun rounded-3xl h-16  border-2 border-black  w-full font-medium text-xl">{{`Mint (${zilToPay} ZIL)`}} </button>
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
    <Footer background = "grass" />
  </div>
</template>

<script>
import Big from 'big.js'
import helper from '../middleware/zilliqa'
export default {
  data () {
    return {
      numberOfDucks: 1,
      zilToPay: 1200,
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
    integrateBetweenLimits (min, max) {
      // 1/120,000x^3 + 1200x
      console.log(min, max)
      const minimum = new Big(min)
      const maximum = new Big(max)
      const zil = (maximum.pow(3).div(120000).plus(maximum.mul(1200))).minus(minimum.pow(3).div(120000).plus(minimum.mul(1200)))
      const qa = zil.mul(new Big(10).pow(12))
      const rt = {
        qa: qa.toFixed(0),
        zil: zil.toFixed(2)
      }
      this.zilToPay = zil.toFixed(2)
      return rt
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
      this.integrateBetweenLimits(this.currentDuck, parseInt(this.numberOfDucks) + this.currentDuck)
    }
  },
  mounted () {
    this.$store.dispatch('ducks/getAttributeCounts')
    console.log(this.integrateBetweenLimits(4000, 4010))
    for (let i = 4000; i <= 4010; i++) {
      const zil = new Big(i).pow(2).div(40000).plus(1200)
      const qa = zil.mul(new Big(10).pow(12))
      const rt = {
        qa: qa.toFixed(0),
        zil: zil.toFixed(2)
      }
      console.log(`${i} - ${JSON.stringify(rt)}`)
    }
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

<template>
  <div class="flex flex-col  lg:max-w-none mx-auto bg-grass-background overflow-hidden items-center">
    <Hero id="home" class="" />

    <div class="grid grid-cols-1 md:grid-cols-2 mt-24 lg:mt-48 container max-w-screen-lg">
      <div class="p-4 md:p-8">
        <DuckGif/>
      </div>
      <div class="p-4 md:p-8">
        <h4 class=" font-bold text-4xl">Non Fungible Ducks</h4>
        <p class="mt-5 text-xl text-gray-900">8192 Duck NFTs with varying rarity levels. Price starts from 1200 to a maximum of 2877 zil. $DUCK token holders are able to regenerate their NFDs. NFD holders can transfer ownership, share and rename their ducks. Additional features may be added as the project progresses. </p>
        <div class="mt-10 flex flex-col md:flex-row">
          <!--desktop-->
          <div class="hidden md:flex ml-2 gap-1">
            <input type="number" v-model="numberOfDucks" class="font-medium  text-2xl h-16 w-24 rounded-2xl  md:text-basecursor-default focus:outline-none text-center bg-gray-200  flex items-center hover:text-black  text-gray-700 focus:text-black  outline-none"/>
            <div class="flex-col gap-1">
              <div class="">
                <button class="bg-gray-200 rounded-lg  outline-none focus:outline-none w-7 h-7" @click="incrementNumberOfDucks">
                  <span class="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
              <div>
                <button class="bg-gray-200 rounded-lg  outline-none focus:outline-none w-7 h-7 mb-0 mt-auto" @click="decrementNumberOfDucks">
                  <span class="m-auto text-2xl font-thin">−</span>
                </button>
              </div>
            </div>
          </div>
          <!--mobile-->
          <div class="flex md:hidden flex-row  gap-1 mb-2">
                <input type="number" v-model="numberOfDucks" class="font-medium block text-2xl h-16  rounded-2xl  w-full md:text-basecursor-default focus:outline-none text-center bg-gray-200  items-center hover:text-black  text-gray-700 focus:text-black  outline-none"/>
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
          <button class="md:ml-3 bg-sun rounded-3xl h-16  border-2 border-black  w-full font-medium text-xl">Mint ( {{ zilToPay }} ZIL)</button>
        <div>
        </div>
        </div>
        <h4 class="text-xl font-bold text-left flex self-start mt-8 mb-2">Ducks hatched</h4>
        <DucksSold class="mb-8"/>
      </div>
    </div>
    <div class="container max-w-screen-xl items-start mt-8 md:mt-16 px-4 md:px-0">
      <h4 class="text-2xl font-bold text-left flex self-start mb-8">Latest Ducks in the pond</h4>
    </div>
    <NewlyMinted
        id="newly-minted"
        class="mb-24 ml-12 md:ml-0 self-center"
      />
    <Footer class="bg-grass-footer"/>
  </div>
</template>

<script>
import Big from 'big.js'
export default {
  data () {
    return {
      numberOfDucks: 1,
      zilToPay: 1200,
      currentDuck: 1
    }
  },
  methods: {
    incrementNumberOfDucks () {
      this.numberOfDucks++
      this.integrateBetweenLimits(this.currentDuck, this.numberOfDucks + this.currentDuck)
    },
    decrementNumberOfDucks () {
      if (this.numberOfDucks > 1) {
        this.numberOfDucks--
      }
      this.integrateBetweenLimits(this.currentDuck, this.numberOfDucks + this.currentDuck)
    },
    integrateBetweenLimits (min, max) {
      // 1/120,000x^3 + 1200x
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
    launchDate () {
      return this.$store.state.ducks.launchDate
    },
    currentDate () {
      return this.$store.state.ducks.currentDate
    }
  },
  beforeMount () {
    this.$store.dispatch('ducks/startCurrentDateInterval')
  },
  mounted () {
    console.log(this.integrateBetweenLimits(1, 8192))
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

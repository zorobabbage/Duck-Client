<template>
  <div class="flex flex-col items-center lg:max-w-none mx-auto bg-grass-background">
    <Hero id="home" class="" />

    <div class="grid grid-cols-1 md:grid-cols-2 mt-48 container max-w-screen-lg">
      <div class="p-8">
        <h4 class=" font-bold text-4xl">Non Fungible Ducks</h4>
        <p class="mt-5 text-xl text-gray-900">8192 Duck NFTs with varying rarity levels. Price starts from 1200 to a maximum of 2877 zil. $DUCK token holders are able to regenerate their NFDs. NFD holders can transfer ownership, share and rename their ducks. Additional features may be added as the project progresses. </p>
        <div class="mt-10 flex flex-col md:flex-row">
          <!--desktop-->
          <div class="hidden md:flex  gap-1 ml-2">
            <input type="number" v-model="numberOfDucks" class="font-medium  text-2xl h-16 w-24 rounded-2xl  md:text-basecursor-default focus:outline-none text-center bg-gray-200  flex items-center hover:text-black  text-gray-700 focus:text-black  outline-none"/>
            <div class="flex-col">
            <button class="bg-gray-200 rounded-lg h-7 w-7 outline-none focus:outline-none" @click="incrementNumberOfDucks">
              <svg xmlns="http://www.w3.org/2000/svg" class="p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button class="bg-gray-200 rounded-lg h-7 w-7 outline-none focus:outline-none" @click="decrementNumberOfDucks">
                  <svg xmlns="http://www.w3.org/2000/svg" class="p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
            </button>
            </div>
          </div>
          <!--mobile-->
          <div class="flex md:hidden flex-row  gap-1 mb-2">
                <input type="number" v-model="numberOfDucks" class="font-medium block text-2xl h-16  rounded-2xl  w-full md:text-basecursor-default focus:outline-none text-center bg-gray-200  items-center hover:text-black  text-gray-700 focus:text-black  outline-none"/>
                <div class="w-16">
                  <button class="bg-gray-200 rounded-2xl h-16 w-16 outline-none focus:outline-none flex-grow-0" @click="decrementNumberOfDucks">
                      <svg xmlns="http://www.w3.org/2000/svg" class="p-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                  </button>
                </div>
                <div class="w-16">
                  <button class="bg-gray-200 rounded-2xl h-16 w-16 outline-none focus:outline-none flex-grow-0" @click="incrementNumberOfDucks">
                  <svg xmlns="http://www.w3.org/2000/svg" class="p-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  </button>
                </div>
          </div>
          <button class="md:ml-3 bg-sun rounded-3xl h-16  border-2 border-black  w-full font-medium text-xl">Mint ( {{ zilToPay }} ZIL)</button>
        <div>
        </div>
        </div>
      </div>
    </div>

    <NewlyMinted
      id="newly-minted"
      class="bg-duck-blue-dark dark:bg-blue-900 w-11/12 p-8 rounded-3xl lg:m-8 lg:p-16"
    />
    <Footer />
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

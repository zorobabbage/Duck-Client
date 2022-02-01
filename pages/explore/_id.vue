<template>
  <div class='bg-gray-50'>
    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden md:pt-12 px-4'>
      <Prev to="/explore/"/>

      <div class='flex flex-row pr-4'>
        <h1 class='text-4xl self-center font-bold mr-auto align-middle'>Duck {{id}}</h1>
        <div v-if="yourDuck" class="ml-auto self-center text-emerald-500 flex flex-row">
          <svg class="w-8 h-8 text-emerald-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
          <h5  class="text-emerald-500 font-semibold text-xl ml-2 align-middle">Your duck</h5>
        </div>
      </div>
      <div class=" grid grid-cols-1 md:grid-cols-5 gap-4 my-12 rounded-3xlr">
        <img id="duck-image" class="rounded-3xl md:col-span-2" :src="quickImage" @load="quickDuckLoaded=true"/>
        <div class="flex flex-col p-2 md:p-4 gap-y-2 md:col-span-3">
          <h1 class='text-2xl font-bold mr-auto'>Attributes</h1>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-100 rounded-2xl p-8 md:col-span-2">
              <div class="flex flex-row border-b-1 border-gray-400 border-dotted">
                <h1 class='flex text-xl font-semibold text-gray-700 mt-4 mr-auto'>Background</h1>
                <h1 class='flex text-xl font-semibold text-gray-700 mt-4'>{{ background }}</h1>
              </div>
              <div class="flex flex-row border-b-1 border-gray-400 border-dotted mb-4">
                <h1 class='flex text-xl font-semibold text-gray-700 mt-4 mr-auto'>Rarity</h1>
                <h1 class='flex text-xl font-semibold text-gray-700 mt-4'>1 in {{ (rarity).toLocaleString("en-US") }}</h1>
              </div>
            </div>
            <Attribute v-for="attr in attributes" v-bind:key="attr.value" :attribute="attr"  />
          </div>

        </div>
      </div>
    </div>
    <Footer class='bg-gray-700'/>
  </div>
</template>

<script>

export default {
  data () {
    return {
      quickDuckLoaded: false,
      id: '',
      image: '',
      quickImage: '',
      duck: {},
      attributes: [],
      rarity: 0,
      background: '',
      duckOwner: ''
    }
  },
  beforeMount () {
    this.fetchTokenOwners()
    this.fetchDuck()
  },
  methods: {
    async fetchDuck () {
      this.id = this.$route.params.id
      this.duck = await this.$axios.$get(`/duck/${this.id}`)

      if (this.duck.message) {
        this.quickImage = '@/assets/images/unknown-duck.png'
      } else {
        this.handleDuckIfExsits()
      }
    },
    async fetchTokenOwners () {
      this.$store.dispatch('ducks/fetchTokenOwners')
    },
    handleDuckIfExsits () {
      this.image = this.duck.resource.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
      this.quickImage = this.duck.quick_resource
      this.attributes = this.duck.attributes.slice(0, 5)

      this.background = this.duck.attributes[5].value

      const baseRarity = this.duck.attributes[6].value.split('%')[0] / 100
      const beakRarity = this.duck.attributes[7].value.split('%')[0] / 100
      const eyesRarity = this.duck.attributes[8].value.split('%')[0] / 100
      const hatRarity = this.duck.attributes[9].value.split('%')[0] / 100 
      const outfitRarity = this.duck.attributes[10].value.split('%')[0] / 100

      this.rarity = parseInt((1 / (baseRarity * beakRarity * eyesRarity * hatRarity * outfitRarity)).toFixed(0))
      this.duckOwner = (this.$store.state.ducks.tokenOwners.find(x => x.id == this.id)).address
    },
    loadHighResImage () {
      let loadingFrame = new Image()
      loadingFrame.src = this.image
      loadingFrame.addEventListener('load', () => document.getElementById('duck-image').src = this.image)
    }
  },
  watch: {
    quickDuckLoaded: function (val) {
      this.loadHighResImage()
    }
  },
  computed: {
    attributeCounts () {
      return this.$store.ducks.attributeCounts
    },
    yourDuck () {
      const userWallet = this.$store.state.wallet.wallet.base16.toLowerCase()
      return userWallet == this.duckOwner.toLowerCase()
    }
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

  .square {
    width: 50%;
    padding-bottom: 50%;
    background-color: teal;
  }
</style>

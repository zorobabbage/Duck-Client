<template>
  <div class='bg-gray-50'>
    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden md:pt-12 px-4'>
      <Prev to="/explore/"/>

      <div class='flex flex-row'>
        <h1 class='text-4xl font-medium mt-4 mr-auto'>Duck {{id}}</h1>
      </div>
      <div class="bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4 my-12 rounded-3xl items-center">
        <img id="duck-image" class="rounded-3xl" :src="quickImage" @load="quickDuckLoaded=true"/>
        <div class="flex flex-col p-6 md:p-12 gap-y-2">
          <h1 class='text-2xl font-bold mt-4 mr-auto pb-8'>Attributes</h1>
          <div class="flex flex-row border-b-1 border-gray-400 border-dotted">
            <h1 class='flex text-lg font-medium mt-4 mr-auto'>Base</h1>
            <h1 class='flex text-lg font-normal mt-4'>{{base}}</h1>
          </div>
          <div class="flex flex-row border-b-1 border-gray-400 border-dotted">
            <h1 class='flex text-lg font-medium mt-4 mr-auto'>Beak</h1>
            <h1 class='flex text-lg font-normal mt-4'>{{beak}}</h1>
          </div>
          <div class="flex flex-row border-b-1 border-gray-400 border-dotted">
            <h1 class='flex text-lg font-medium mt-4 mr-auto'>Eyes</h1>
            <h1 class='flex text-lg font-normal mt-4'>{{eyes}}</h1>
          </div>
          <div class="flex flex-row border-b-1 border-gray-400 border-dotted">
            <h1 class='flex text-lg font-medium mt-4 mr-auto'>Hat</h1>
            <h1 class='flex text-lg font-normal mt-4'>{{ hat }}</h1>
          </div>
          <div class="flex flex-row border-b-1 border-gray-400 border-dotted">
            <h1 class='flex text-lg font-medium mt-4 mr-auto'>Outfit</h1>
            <h1 class='flex text-lg font-normal mt-4'>{{ outfit }}</h1>
          </div>
          <div class="flex flex-row border-b-1 border-gray-400 border-dotted">
            <h1 class='flex text-lg font-medium mt-4 mr-auto'>Background</h1>
            <h1 class='flex text-lg font-normal mt-4'>{{ background }}</h1>
          </div>
          <div class="flex flex-row border-b-1 border-gray-400 border-dotted">
            <h1 class='flex text-lg font-medium mt-4 mr-auto'>Rarity</h1>
            <h1 class='flex text-lg font-normal mt-4'>1 in 450,567</h1>
          </div>
        </div>
      </div>
    </div>
    <Footer class='bg-gray-700'/>
  </div>
</template>

<script>
import api from '@/mixins/api.js'
export default {
  data () {
    return {
      quickDuckLoaded: false,
      id: '',
      image: '',
      quickImage: '',
      duck: {},
      base: '',
      beak: '',
      eyes: '',
      hat: '',
      outfit: '',
      background: ''
    }
  },
  async mounted () {
    await this.fetchDuck()
  },
  methods: {
    async fetchDuck () {
      this.id = this.$route.params.id
      this.duck = await api.fetchDuck(this.id)
      console.log(this.duck.message)
      if (this.duck.message) {
        this.quickImage = '@/assets/images/unknown-duck.png'
      } else {
        this.handleDuckIfExsits()
      }
    },
    handleDuckIfExsits () {
      this.image = this.duck.resource.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
      this.quickImage = this.duck.quick_resource
      
      this.base = this.duck.attributes[0].value
      this.beak = this.duck.attributes[1].value
      this.eyes = this.duck.attributes[2].value
      this.hat = this.duck.attributes[3].value
      this.outfit = this.duck.attributes[4].value
      this.background = this.duck.attributes[5].value 
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

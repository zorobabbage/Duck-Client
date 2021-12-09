<template>
  <div class='bg-gray-50'>
    <div @click="scrollToTop" id="scrollTopButton" class="bg-gray-700 shadow-lg rounded-full text-center float-right cursor-pointer p-2 fixed right-5 bottom-5" style="display: none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
      </svg>
    </div>
    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden pt-12 px-4'>
      <div class='flex flex-col md:flex-row space-y-4 '>
        <h1 class='text-4xl font-medium mt-4 mr-auto '>Explore ducks</h1>
        <div class='rounded-3xl bg-gray-200 flex flex-row'>
          <input type='number' v-model='id' placeholder='Search ID' class='placeholder-gray-400 font-medium bg-gray-200 text-2xl h-16 w-full md:w-36 rounded-2xl  md:text-basecursor-default focus:outline-none text-center   flex items-center hover:text-black  text-gray-700 focus:text-black  outline-none'/>
          <NuxtLink :to="'/explore/'+id">
          <div class='bg-gray-900 rounded-3xl w-16 h-16 items-center flex'>
            <svg xmlns='http://www.w3.org/2000/svg' class='h-7 w-7 mx-auto my-auto self-center text-gray-200' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
          </NuxtLink>
        </div>
      </div>
      <div class='bg-gray-100 rounded-xl w-full h-90 my-8 p-4 md:p-12'>
        <h4 class='text-xl font-medium mb-4'>Filters</h4>
        <div class='grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-8'>
          <Dropdown :label='labels.bases' class='w-full' :list='filters.bases' @clicked="filterBases"/>
          <Dropdown :label='labels.beaks' class='w-full' :list='filters.beaks' @clicked="filterBeaks"/>
          <Dropdown :label='labels.eyes' class='w-full' :list='filters.eyes' @clicked="filterEyes"/>
          <Dropdown :label='labels.hats' class='w-full' :list='filters.hats' @clicked="filterHats"/>
          <Dropdown :label='labels.outfits' class='w-full' :list='filters.outfits' @clicked="filterOutfits"/>
          <Dropdown :label='labels.background' class='w-full' :list='filters.backgrounds' @clicked="filterBackground"/>
        </div>
        <h4 class='text-xl font-medium my-4'>Sort by</h4>
        <div class='grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8'>
          <Dropdown :label="labels.sort" class='w-full' :list='filters.sorts' @clicked="selectSort"/>
        </div>
      </div>
      <div v-if="this.allDucks.length > 0" class='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 my-12'>
        <NFTCard v-for='duck in allDucks' :key='duck.id' :duck="duck" class='mb-6'/>
      </div>
    </div>
    <Footer background="green"/>
  </div>
</template>

<script>
import filters from '@/assets/objects/filters'
export default {
  data () {
    return {
      id: "",
      currentDuck: 1,
      ducksPerPage: 24,
      searchQuery: {},
      labels: {
        bases: 'Bases',
        beaks: 'Beaks',
        eyes: 'Eyes',
        hats: 'Hats',
        outfits: 'Outfits',
        sort: 'Newest ducks',
        background: 'Backgrounds'
      },
      filters: {}
    }
  },
  computed: {
    allDucks () {
      return this.$store.state.store.ducks
    }
  },
  methods: {
    async filterBases (e) {
      this.labels.bases = e.name
      this.searchQuery.base = e.value
      this.fetchDucks(1, this.ducksPerPage)
    },
    filterBeaks (e) {
      this.labels.beaks = e.name
      this.searchQuery.beak = e.value
      this.fetchDucks(1, this.ducksPerPage)
    },
    filterEyes (e) {
      this.labels.eyes = e.name
      this.searchQuery.eyes = e.value
      this.fetchDucks(1, this.ducksPerPage)
    },
    filterHats (e) {
      this.labels.hats = e.name
      this.searchQuery.hat = e.value
      this.fetchDucks(1, this.ducksPerPage)
    },
    filterOutfits (e) {
      this.labels.outfits = e.name
      this.searchQuery.outfit = e.value
      this.fetchDucks(1, this.ducksPerPage)
    },
    filterBackground (e) {
      this.labels.background = e.name
      this.searchQuery.background = e.value
      this.fetchDucks(1, this.ducksPerPage)
    },
    async selectSort (e) {
      this.labels.sort = e.name
      const sortSelection = e.value
      const oldsearchQuery = this.searchQuery
      this.searchQuery = { ...oldsearchQuery, ...sortSelection }
      this.currentDuck = 1
      await this.fetchDucks(1, this.ducksPerPage, this.searchQuery)
    },
    clearDucks () {
      this.$store.dispatch('store/clearDucks')
    },
    async fetchDucks (from, to) {
      console.log('fetch ducks ' + from + ' to ' + to)
      Object.keys(this.searchQuery).forEach(key => {
        if (this.searchQuery[key] === null) {
          delete this.searchQuery[key]
        }
      })


      if (from == 1) this.clearDucks()
      await this.$store.dispatch('store/fetchDucks', { from, to, ...this.searchQuery })
      this.currentDuck = to
    },
    getInitialDucks () {
      this.searchQuery = { sortBy: 'ID', order: 'desc' }
      const from = 1
      const to = this.ducksPerPage - 1
      this.currentDuck = this.ducksPerPage
      this.$store.dispatch('store/fetchDucks', { from, to, ...this.searchQuery })
    },
    getNextDucksOnScroll () {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.fetchDucks(this.currentDuck, this.ducksPerPage + this.currentDuck, this.searchQuery)
        }
        if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
          document.getElementById('scrollTopButton').style.display = 'block'
        } else {
          document.getElementById('scrollTopButton').style.display = 'none'
        }
      }
    },
    scrollToTop () {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  },
  mounted () {
    this.filters = filters
    this.getInitialDucks()
    this.getNextDucksOnScroll()
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

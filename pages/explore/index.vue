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
          <Dropdown :label="labels.base" type="base" class='w-full' :list='filters.bases' @clicked="filter"/>
          <Dropdown :label='labels.beak' type="beak" class='w-full' :list='filters.beaks' @clicked="filter"/>
          <Dropdown :label='labels.eyes' type="eyes" class='w-full' :list='filters.eyes' @clicked="filter"/>
          <Dropdown :label='labels.hat' type="hat" class='w-full' :list='filters.hats' @clicked="filter"/>
          <Dropdown :label='labels.outfit' type="outfit" class='w-full' :list='filters.outfits' @clicked="filter"/>
          <Dropdown :label='labels.background' type="background" class='w-full' :list='filters.backgrounds' @clicked="filter"/>
        </div>
        <h4 class='text-xl font-medium my-4'>Sort by</h4>
        <div class='grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8'>
          <Dropdown :label="labels.sort" class='w-full' :list='filters.sorts' @clicked="selectSort"/>
        </div>
      </div>
      <h4 class='text-2xl font-medium mb-4'>{{ numberOfDucksInQuery }} results</h4>
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
      numberOfDucksInQuery: 0,
      searchQuery: { sortBy: 'ID', order: 'desc' },
      labels: {
        'base': 'Bases',
        'beak': 'Beaks',
        'eyes': 'Eyes',
        'hat': 'Hats',
        'outfit': 'Outfits',
        'sort': 'Newest ducks',
        'background': 'Backgrounds'
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
    filter(e) {
      this.labels[e.type] = e.attribute.name
      this.searchQuery[e.type] = e.attribute.value
      this.currentDuck = 1
      this.fetchDucks(this.currentDuck, this.ducksPerPage, this.searchQuery)
    },
    selectSort (e) {
      this.labels.sort = e.attribute.name
      this.searchQuery = { ...this.searchQuery, ...e.attribute.value }
      this.currentDuck = 1
      this.fetchDucks(this.currentDuck, this.ducksPerPage, this.searchQuery)
    },
    clearDucks () {
      this.$store.dispatch('store/clearDucks')
    },
    async fetchDucks (from, to) {
      Object.keys(this.searchQuery).forEach(key => {
        if (this.searchQuery[key] === null) {
          delete this.searchQuery[key]
        }
      })

      if (from == 1) this.clearDucks()
      //if theres no more ducks to fetch then dont needlessly get from api
      if (this.numberOfDucksInQuery > from || to <= this.ducksPerPage) {
        console.log('fetch ducks ' + from + ' to ' + to)
        this.numberOfDucksInQuery = await this.$store.dispatch('store/fetchDucks', { from, to, ...this.searchQuery }) 
      }
      this.currentDuck = to
    },
    getNextDucksOnScroll () {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight
      if (bottomOfWindow) {
        this.fetchDucks(this.currentDuck + 1, this.ducksPerPage + this.currentDuck, this.searchQuery)
      }
      if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        document.getElementById('scrollTopButton').style.display = 'block'
      } else {
        document.getElementById('scrollTopButton').style.display = 'none'
      }
    },
    scrollToTop () {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  },
  async mounted () {
    this.filters = filters
    await this.fetchDucks(this.currentDuck, this.ducksPerPage) 
    this.getNextDucksOnScroll()
  },
  beforeMount () {
    window.addEventListener('scroll', this.getNextDucksOnScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.getNextDucksOnScroll)
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

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
        <div class='grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8'>
          <Dropdown label='Bases' class='w-full' :list='bases' @clicked="filterBases"/>
          <Dropdown label='Beaks' class='w-full' :list='bases' @clicked="filterBeaks"/>
          <Dropdown label='Eyes' class='w-full' :list='bases' @clicked="filterEyes"/>
          <Dropdown label='Hats' class='w-full' :list='bases' @clicked="filterHats"/>
          <Dropdown label='Outfits' class='w-full' :list='bases' @clicked="filterOutfits"/>
        </div>
        <h4 class='text-xl font-medium my-4'>Sort by</h4>
        <div class='grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8'>
          <Dropdown :label="labels.sort" class='w-full' :list='sorts' @clicked="selectSort"/>
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
export default {
  data () {
    return {
      id: 0,
      currentDuck: 1,
      ducksPerPage: 24,
      searchResult: [],
      searchQuery: '',
      labels: {
        bases: 'bases',
        beaks: 'Beaks',
        eyes: 'Eyes',
        hats: 'Hats',
        outfits: 'Outfits',
        sort: 'ID - Newest ducks'
      },
      baseSelection: '',
      beakSelection: '',
      eyesSelection: '',
      hatSelection: '',
      outfitSelection: '',
      sortSelection: '',
      bases: [
        {
          name: 'Domestic Duck'
        },
        {
          name: 'Eider'
        },
        {
          name: 'Goldeneye'
        }
      ],
      sorts: [
        {
          name: 'ID - Newest ducks',
          value: { sortBy: 'ID', order: 'desc' }
        },
        {
          name: 'ID - Oldest ducks',
          value: { sortBy: 'ID', order: 'asc' }
        },
        {
          name: 'Rarity - High to Low',
          value: { sortBy: 'overallRarity', order: 'desc' }
        },
        {
          name: 'Rarity - Low to High',
          value: { sortBy: 'overallRarity', order: 'asc' }
        },
        {
          name: 'Rarest base',
          value: { sortBy: 'BaseRarity', order: 'desc' }
        },
        {
          name: 'Rarest beak',
          value: { sortBy: 'BeakRarity', order: 'desc' }
        },
        {
          name: 'Rarest eyes',
          value: { sortBy: 'EyesRarity', order: 'desc' }
        },
        {
          name: 'Rarest hats',
          value: { sortBy: 'HatsRarity', order: 'desc' }
        },
        {
          name: 'Rarest outfit',
          value: { sortBy: 'OutfitRarity', order: 'desc' }
        }
      ]
    }
  },
  computed: {
    allDucks () {
      return this.$store.state.store.ducks
    }
  },
  methods: {
    filterBases (e) {
      this.baseSelection = e
    },
    filterBeaks (e) {
      this.beakSelection = e
    },
    filterEyes (e) {
      this.eyesSelection = e
    },
    filterHats (e) {
      this.hatSelection = e
    },
    filterOutfits (e) {
      this.outfitSelection = e
    },
    async selectSort (e) {
      this.labels.sort = e.name
      this.sortSelection = e.value
      this.searchQuery = e.value
      this.clearDucks()
      await this.fetchDucks(1, this.ducksPerPage, this.sortSelection)
    },
    clearDucks () {
      this.$store.dispatch('store/clearDucks')
    },
    async fetchDucks (from, to, params) {
      console.log('fetch ducks ' + from + ' to ' + to)
      await this.$store.dispatch('store/fetchDucks', { from, to, ...params })
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

<template>
  <div class='bg-gray-50'>
    <div v-if="allDucks.length > 32" @click="scrollToTop" id="scrollTopButton" class="z-10 bg-gray-700 shadow-lg rounded-full text-center float-right cursor-pointer p-2 fixed right-5 bottom-5" style="display: none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
      </svg>
    </div>
    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden pt-12 px-4'>

      <Migration v-if="oldOwnedIDs.length > 0" />

      <div class='flex flex-col space-y-4 '>
        <h1 class='text-4xl font-medium mt-4 mr-auto '>Your ducks</h1>
        <div v-if="wallet.bech32" >
         <a target="_blank" :href="`https://viewblock.io/zilliqa/address/${wallet.bech32}`" class="flex flex-row">  <h4 class="text-sm mt-0 font-medium text-gray-600 self-center hover:underline">{{ wallet.bech32 }}  </h4> <IconLink class="ml-1 h-5 w-5 self-center text-gray-600"/></a>
        </div>
      </div>

      <div class='bg-gray-100 rounded-xl w-full h-90 my-8 p-4 md:p-12'>
        <h4 class='text-xl font-medium mb-4'>Filters</h4>
        <!-- mobile dropdowns -->
        <div v-if="breakpoint.is === 'sm'" class='grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-8'>
          <MobileDropdown :label="labels.base" type="base" class='w-full' :list='filters.bases' @clicked="filter"/>
          <MobileDropdown :label='labels.beak' type="beak" class='w-full' :list='filters.beaks' @clicked="filter"/>
          <MobileDropdown :label='labels.eyes' type="eyes" class='w-full' :list='filters.eyes' @clicked="filter"/>
          <MobileDropdown :label='labels.hat' type="hat" class='w-full' :list='filters.hats' @clicked="filter"/>
          <MobileDropdown :label='labels.outfit' type="outfit" class='w-full' :list='filters.outfits' @clicked="filter"/>
          <MobileDropdown :label='labels.background' type="background" class='w-full' :list='filters.backgrounds' @clicked="filter"/>
        </div>

        <!-- desktop dropdowns -->
        <div v-else class='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8'>
          <Dropdown :label="labels.base" type="base" class='w-full' :list='filters.bases' @clicked="filter"/>
          <Dropdown :label='labels.beak' type="beak" class='w-full' :list='filters.beaks' @clicked="filter"/>
          <Dropdown :label='labels.eyes' type="eyes" class='w-full' :list='filters.eyes' @clicked="filter"/>
          <Dropdown :label='labels.hat' type="hat" class='w-full' :list='filters.hats' @clicked="filter"/>
          <Dropdown :label='labels.outfit' type="outfit" class='w-full' :list='filters.outfits' @clicked="filter"/>
          <Dropdown :label='labels.background' type="background" class='w-full' :list='filters.backgrounds' @clicked="filter"/>
        </div>

        <h4 class='text-xl font-medium my-4'>Sort by</h4>
        <div v-if="breakpoint.is === 'sm' || breakpoint.is === 'md'" class='grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8'>
          <MobileDropdown  :label="labels.sort" class='w-full' :list='filters.sorts' @clicked="selectSort"/>
        </div>
        <div v-else class='grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-8'>
           <Dropdown  :label="labels.sort" class='w-full' :list='filters.sorts' @clicked="selectSort"/>
        </div>

      </div>
        
   
      <h4 class='text-2xl font-medium mb-4'>{{ numberOfDucksInQuery }} results</h4>
      <div v-if="this.allDucks.length > 0" class='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 my-12'>
        <NFTCard v-for='duck in allDucks' :key='duck.id' :duck="duck" class='mb-6'/>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import filters from '@/assets/objects/filters'
 
export default {
  data () {
    return {
      id: "",
      currentDuck: 1,
      fetchedDucks: {},
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
      filters: {},
      lastFetchTime: 0
    }
  },
  computed: {
    wallet() {
      return this.$store.state.wallet.wallet;
    },
    zilPay() {
      if (process.browser) {
        if (window.zilPay) return window.zilPay;
      }
    },
    allDucks () {
      return this.$store.state.explore.userDucks
    },
    breakpoint () {
      if (process.client) {
        return this.$breakpoint
      }
      return { is: '' }
    },
    oldOwnedIDs () {
      let pairs = this.$store.state.ducks.zrc1owners
      let owned = pairs.filter(x => x.address.toLowerCase() === this.wallet.base16.toLowerCase())
      let arrayOfIDs = owned.map(pair => pair.id)
      return arrayOfIDs
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
      this.fetchedDucks = {}
      this.$store.dispatch('explore/clearUserDucks')
    },
    async fetchDucks (from, to) {
      if (Date.now() - this.lastFetchTime < 300) return //rate limit api calling (prevent logitech mouse from spamming api)
      this.lastFetchTime = Date.now()

      Object.keys(this.searchQuery).forEach(key => {
        if (this.searchQuery[key] === null) {
          delete this.searchQuery[key]
        }
      })

      if (from == 1) this.clearDucks()
      //if theres no more ducks to fetch then dont needlessly get from api
      if ((this.numberOfDucksInQuery > from || to <= this.ducksPerPage) && (this.fetchedDucks[from] == undefined)) {
        console.log('fetch ducks ' + from + ' to ' + to)
        this.fetchedDucks[from] = true
        const thisWallet = this.$store.state.wallet.wallet.base16;
        if (thisWallet.length) this.numberOfDucksInQuery = await this.$store.dispatch('explore/fetchUserDucks', { from, to, ...this.searchQuery, ...{ owner: thisWallet } }) 
      }
      this.currentDuck = to
    },
    getNextDucksOnScroll () {
      const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement

      if (scrollTop + clientHeight >= scrollHeight - 250) {
        this.fetchDucks(this.currentDuck + 1, this.ducksPerPage + this.currentDuck, this.searchQuery)
      }

      if (this.allDucks.length > 32) {
          if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800 ) {
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
  async mounted () {
    this.$store.dispatch('wallet/fetchBalance', this.$store.state.wallet.wallet.bech32)
    this.filters = filters
    await this.fetchDucks(this.currentDuck, this.ducksPerPage) 
    this.getNextDucksOnScroll()
    
  },
  beforeMount () {
    window.addEventListener('scroll', this.getNextDucksOnScroll, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.getNextDucksOnScroll)
  },
  created() {
    this.$nuxt.$on("walletConnected", () => {
      this.$store.dispatch('wallet/fetchBalance', this.$store.state.wallet.wallet.bech32)
      this.fetchDucks(1, this.ducksPerPage)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off("walletConnected");
  },
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

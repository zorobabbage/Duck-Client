<template>
  <div class='bg-gray-50'>
    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden pt-12 px-4'>
      <div class='flex flex-col md:flex-row space-y-4 '>
        <h1 class='text-4xl font-medium mt-4 mr-auto '>Explore ducks</h1>
        <div class='rounded-3xl bg-gray-200 flex flex-row'>
          <input type='number' v-model='id' placeholder='Search ID' class='placeholder-gray-400 font-medium bg-gray-200 text-2xl h-16 w-full md:w-36 rounded-2xl  md:text-basecursor-default focus:outline-none text-center   flex items-center hover:text-black  text-gray-700 focus:text-black  outline-none'/>
          <div class='bg-gray-900 rounded-3xl w-16 h-16 items-center flex'>
            <svg xmlns='http://www.w3.org/2000/svg' class='h-7 w-7 mx-auto my-auto self-center text-gray-200' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
          </div>
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
      <div v-if="this.ducks.length > 0" class='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 my-12'>
        <NFTCard v-for='duck in ducks' :key='duck.id' :id='duck.id' :uri='duck.data["quick_resource"]' class='mb-6'/>
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
      ducksPerPage: 20,
      searchQuery: '',
      labels: {
        bases: 'bases',
        beaks: 'Beaks',
        eyes: 'Eyes',
        hats: 'Hats',
        outfits: 'Outfits',
        sort: 'ID - Oldest ducks'
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
          name: 'ID - Oldest ducks',
          value: ''
        },
        {
          name: 'ID - Newest ducks',
          value: ''
        },
        {
          name: 'Rarity - High to Low',
          value: 'sortBy=overallRarity&order=desc'
        },
        {
          name: 'Rarity - Low to High',
          value: 'sortBy=overallRarity&order=asc'
        }
      ]
    }
  },
  computed: {
    ducks () {
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
    selectSort (e) {
      this.labels.sort = e.name
      this.sortSelection = e.value
      this.searchQuery = e.value
      this.fetchDucks(1, this.ducksPerPage, this.searchQuery)
    },
    fetchDucks (from, to, options) {
      console.log('fetch ducks ' + from + ' to ' + to)
      this.$store.dispatch('store/fetchDucks', { from, to, options })
      this.currentDuck += (to - from)
    },
    getInitialDucks () {
      console.log('mounted')
      this.fetchDucks(1, this.ducksPerPage)
    },
    getNextDucksOnScroll () {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          console.log(this.currentDuck)
          this.fetchDucks(this.currentDuck, this.ducksPerPage + this.currentDuck, this.searchQuery)
        }
      }
    },
    findByMatchingProperties(set) {
      this.searchResult = []
      set = set.filter(element => element != undefined)

      let filter = {};

      if (
        this.selects.base_selection.length > 0 &&
        this.selects.base_selection != "_"
      ) {
        filter.duck_base_name = this.selects.base_selection;
      }
      if (
        this.selects.beak_selection.length > 0 &&
        this.selects.beak_selection != "_"
      ) {
        filter.duck_beak_name = this.selects.beak_selection;
      }
      if (
        this.selects.eyes_selection.length > 0 &&
        this.selects.eyes_selection != "_"
      ) {
        filter.duck_eyes_name = this.selects.eyes_selection;
      }
      if (
        this.selects.hats_selection.length > 0 &&
        this.selects.hats_selection != "_"
      ) {
        filter.duck_hats_name = this.selects.hats_selection;
      }
      if (
        this.selects.outfit_selection.length > 0 &&
        this.selects.outfit_selection != "_"
      ) {
        filter.duck_outfit_name = this.selects.outfit_selection;
      }
      if (
        this.selects.name_selection.length > 0 &&
        this.selects.name_selection != "_"
      ) {
        filter.duck_name = this.selects.name_selection;
      }
      const resultDucks = (allDucks, filters) => {
        var filterKeys = Object.keys(filters);
        return allDucks.filter(function(eachObj) {
          return filterKeys.every(function(eachKey) {
            if (!filters[eachKey].length) {
              return true;
            }
            return filters[eachKey].includes(eachObj[eachKey]);
          });
        });
      };
      const filteredDucks = resultDucks(set, filter);
      const getRarity = (duck) => {
        const BASE_CHANCE = duck.duck_base_occurrence_chance.split("%")[0] / 100
        const BEAK_CHANCE = duck.duck_beak_occurrence_chance.split("%")[0] / 100
        const EYES_CHANCE = duck.duck_eyes_occurrence_chance.split("%")[0] / 100
        const HATS_CHANCE = duck.duck_hats_occurrence_chance.split("%")[0] / 100
        const OUTFIT_CHANCE =duck.duck_outfit_occurrence_chance.split("%")[0] / 100
        const raw = BASE_CHANCE*BEAK_CHANCE*EYES_CHANCE*HATS_CHANCE*OUTFIT_CHANCE
        return raw
      }
      switch (this.sortSelects.sortSelection) {
        case 'RARITY_H_TO_L':
          this.searchResult = filteredDucks.sort((a, b) => getRarity(a) - getRarity(b))
          break;
        case 'RARITY_L_TO_H':
          this.searchResult = filteredDucks.sort((a, b) => getRarity(b) - getRarity(a))
          break;
        case 'ID_H_TO_L':
          this.searchResult = filteredDucks.sort((a, b) => b.duck_id - a.duck_id)
          break;
        case 'ID_L_TO_H':
          this.searchResult = filteredDucks.sort((a, b) => a.duck_id - b.duck_id)
          break;
        default:
          Object.assign(this.searchResult, filteredDucks)
      }
    },
    searchForDucks() {
      this.findByMatchingProperties(this.allDucks);
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

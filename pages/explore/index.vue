<template>
  <div class='bg-gray-50'>
    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden pt-12 px-4'>
      <div class='flex flex-col md:flex-row space-y-4 '>
        <h1 class='text-4xl font-medium mt-4 mr-auto '>Explore ducks</h1>
        <div class='rounded-3xl bg-gray-200 flex flex-row'>
          <input type='number' v-model='numberOfDucks' placeholder='Search ID' class='placeholder-gray-400 font-medium bg-gray-200 text-2xl h-16 w-full md:w-36 rounded-2xl  md:text-basecursor-default focus:outline-none text-center   flex items-center hover:text-black  text-gray-700 focus:text-black  outline-none'/>
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
          <Dropdown label='Bases' class='w-full' :list='bases' @clicked="sortBase"/>
          <Dropdown label='Beaks' class='w-full' :list='bases' @clicked="sortBase"/>
          <Dropdown label='Eyes' class='w-full' :list='bases' @clicked="sortBase"/>
          <Dropdown label='Hats' class='w-full' :list='bases' @clicked="sortBase"/>
          <Dropdown label='Outfits' class='w-full' :list='bases' @clicked="sortBase"/>
        </div>
      </div>
      <div class='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 my-12'>
        <NFTCard v-for='duck in ducks' :key='duck.id' :id='duck.id' :uri='duck.uri' class='mb-6'/>
      </div>
    </div>
    <Footer background="green"/>
  </div>
</template>

<script>

export default {
  data () {
    return {
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
      ducks: [
        {
          uri: 'https://d22rrd5cdtalai.cloudfront.net/DUCK_0001_bb3236c9cc9099ce.png',
          id: 1
        },
        {
          uri: 'https://d22rrd5cdtalai.cloudfront.net/DUCK_0002_b1388e49cec6cd66.png',
          id: 2
        },
        {
          uri: 'https://d22rrd5cdtalai.cloudfront.net/DUCK_0003_b38e9e313c9a4c66.png',
          id: 3
        },
        {
          uri: 'https://d22rrd5cdtalai.cloudfront.net/DUCK_0004_e33296ccc399c993.png',
          id: 4
        }
      ]
    }
  },
  methods: {
    sortBase (e) {
      console.log(e)
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
</style>

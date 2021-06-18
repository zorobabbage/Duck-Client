<template>
  <div class="flex flex-col items-center max-w-screen-md lg:max-w-none mx-auto">
    <Hero id="home" class="h-screen  max-w-[2400px] mt-16 lg:mt-0" />
    <Countdown
      v-if="launchDate > currentDate"
      id="countdown"
      class="bg-duck-blue-dark dark:bg-blue-900 w-11/12 p-8 rounded-3xl lg:m-8 lg:p-16"
    />
    <NewlyMinted
      v-else
      class="bg-duck-blue-dark dark:bg-blue-900 w-11/12 p-8 rounded-3xl lg:m-8 lg:p-16"
    />
    <WhatTheDuck id="what-the-duck" class="w-11/12 py-8" />
    <Roadmap
      id="roadmap"
      class="bg-duck-blue dark:bg-blue-600 w-11/12 py-8 rounded-3xl lg:m-8 lg:p-16"
    />
    <Tokenomics id="tokenomics" class="w-11/12 py-8 lg:py-24" />
    <PondPapers
      id="papers"
      class="bg-duck-blue-light dark:bg-blue-500 w-11/12 py-8 rounded-3xl lg:m-8 lg:p-16"
    />
    <Footer />
  </div>
</template>

<script>
export default {
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
  }
}
</script>

<style></style>

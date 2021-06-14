<template>
  <div class="flex flex-col items-center max-w-screen-md lg:max-w-none mx-auto">
    <Hero id="home" class="h-screen  max-w-[2400px]" />
    <NewlyMinted id="new-ducks" class="bg-blue-100 w-11/12 p-8 lg:rounded-3xl lg:m-8 lg:p-16" />
    <WhatTheDuck
      id="what-the-duck"
      class="w-11/12 max-w-screen-2xl p-8"
    />
    <Roadmap id="roadmap" class="bg-indigo-200 w-11/12 p-8 lg:rounded-3xl lg:m-8 lg:p-16" />
    <Tokenomics id="tokenomics" class="w-11/12 max-w-screen-2xl p-8 lg:py-24" />
    <PondPapers id="pond-papers" class="bg-green-100 w-11/12 p-8 lg:rounded-3xl lg:m-8 lg:p-16" />
    <Footer />
  </div>
</template>

<script>
export default {}
</script>

<style></style>

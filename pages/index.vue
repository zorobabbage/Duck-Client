<template>
  <div class="flex flex-col items-center max-w-screen-md lg:max-w-none mx-auto">
    <Hero id="home" class="h-screen  max-w-[2400px]" />
    <Countdown id="new-ducks" class="bg-duck-blue-dark w-11/12 py-8 rounded-3xl lg:m-8 lg:p-16" />
    <WhatTheDuck
      id="what-the-duck"
      class="w-11/12 py-8"
    />
    <Roadmap id="roadmap" class="bg-duck-blue w-11/12 py-8 rounded-3xl lg:m-8 lg:p-16" />
    <Tokenomics id="tokenomics" class="w-11/12 py-8 lg:py-24" />
    <PondPapers id="pond-papers" class="bg-duck-blue-light w-11/12 py-8 rounded-3xl lg:m-8 lg:p-16" />
    <Footer />
  </div>
</template>

<script>
export default {}
</script>

<style></style>

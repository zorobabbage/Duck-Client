<template>
  <div class="flex flex-col items-center max-w-screen-md lg:max-w-none mx-auto">
    {{ $breakpoint }}
    <Hero id="#home" class="max-w-[2400px]" />
    <NewlyMinted id="#new-ducks" class="mt-12 lg:mt-24" />
    <WhatTheDuck id="#what-the-duck" class="mt-4 w-full max-w-screen-2xl lg:mt-24" />
    <Roadmap id="#roadmap" class="w-full max-w-screen-2xl mt-24" />
    <Tokenomics id="#tokenomics" class="w-full max-w-screen-2xl mt-24" />
    <PondPapers id="#pond-papers" class="w-full max-w-screen-2xl mt-24" />
  </div>
</template>

<script>
export default {}
</script>

<style></style>

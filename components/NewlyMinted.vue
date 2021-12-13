<template>
<div>
  <section v-if="breakpoint.is === 'sm' || breakpoint.is === 'md'" class="flex flex-col overflow-x-scroll overflow-hidden pl-10 ml-12 md:ml-0 md:pl-0 container mx-auto noscroll sm:px-8  md:rounded-3xl">
    <div class="flex  bg-grass-foreground rounded-l-3xl px-5 noscroll">
        <div class="flex bg-grass-foreground noscroll">
            <div
                v-for="duck in latestFiveDucks"
                :key="duck.id"
                class="px-4 flex-shrink-0  p-8 bg-grass-foreground"
            >
              <NuxtLink :to="'/explore/'+duck.id">
                <img
                :src="duck.data.quick_resource"
                alt="Unkown duck"
                class="w-44 lg:w-48 xl:w-64 2xl:w-80 border-2 border-black rounded-3xl"
                >
                <h3 class="text-center mt-2 md:mt-4">
                #{{ duck.id }}
                </h3>
              </NuxtLink>
            </div>
        </div>
    </div>
  </section>
  <section v-else class="grid lg:grid-cols-4 xl:grid-cols-5 container mx-auto rounded-3xl bg-grass-foreground">
    <div
        v-for="duck in latestFiveDucks"
        :key="duck.id"
        class="flex-shrink-0  p-8 "
    >
      <NuxtLink :to="'/explore/'+duck.id">
        <img
        :src="duck.data.quick_resource"
        alt="Unkown duck"
        class="w-44 lg:w-48 xl:w-64 2xl:w-80 border-2 border-black rounded-3xl"
        >
        <h3 class="text-center mt-2 md:mt-4">
        #{{ duck.id }}
        </h3>
      </NuxtLink>
    </div>
  </section>
  <div class="container mx-auto items-center">
    <NuxtLink
      v-if="latestFiveDucks.length > 0"
      target="_blank"
      to="/explore"
    >
    <p class="mt-8 text-center">
      Show me some more duckies please
    </p>
    </NuxtLink>
    <p v-else class="mt-8 text-center">
      We can't find any ducks :(
    </p>
  </div>
</div>
</template>

<script>
export default {
  computed: {
    latestFiveDucks () {
      if (this.breakpoint.is === 'lg') {
        return this.$store.state.ducks.ducks.slice(0, 4)
      }
      return this.$store.state.ducks.ducks
    },
    breakpoint () {
      if (process.client) {
        return this.$breakpoint
      }
      return { is: '' }
    }
  },
  beforeMount () {
    this.$store.dispatch('ducks/fetchDucks', {from: 1, to: 5, sortBy: 'ID', order: 'desc'})
  }
}
</script>

<style scoped>
html {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
}

html::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}

.noscroll::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
</style>

<template>
  <section class="flex flex-col items-center">
    <H2 class="text-center max-w-lg xl:max-w-2xl 2xl:max-w-4xl">
      Latest ducks in the pond
    </H2>
    <div class="flex flex-col items-center lg:flex-row lg:justify-center">
      <div
        v-for="duckUri in latestFiveDuckUris"
        :key="duckUri.id"
        class="flex-col items-center justify-center"
      >
        <img
          :src="duckUri.uri"
          alt="Unkown duck"
          class="lg:w-48 xl:w-64 2xl:w-80"
        >
        <H3 class="text-center mt-4">
          #{{ duckUri.id }}
        </H3>
      </div>
    </div>
    <Link
      v-if="latestFiveDuckUris.length > 0"
      target="_blank"
      href="https://app.duck.community/duckstore"
      class="mt-8"
    >
      Show me some more duckies please
    </Link>
    <P v-else class="mt-8">
      There are no ducks yet :(
    </P>
  </section>
</template>

<script>
export default {
  computed: {
    latestFiveDuckUris () {
      const duckUris = this.$store.state.ducks.duckUris
      if (duckUris.length <= 5) {
        return duckUris
      }
      return duckUris.slice(duckUris.length - 5, duckUris.length).reverse()
    }
  },
  beforeMount () {
    this.$store.dispatch('ducks/fetchDuckUris')
  }
}
</script>

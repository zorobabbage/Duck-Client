<template>
  <section class="flex flex-col overflow-x-scroll overflow-hidden pl-10">
    <div class="flex  bg-grass-foreground rounded-l-3xl pl-10">
        <div class="flex bg-grass-foreground">
            <div
                v-for="duckUri in latestFiveDuckUris"
                :key="duckUri.id"
                class="px-4 flex-shrink-0  p-8 bg-grass-foreground"
            >
                <img
                :src="duckUri.uri"
                alt="Unkown duck"
                class="w-44 lg:w-48 xl:w-64 2xl:w-80"
                >
                <h3 class="text-center mt-4">
                #{{ duckUri.id }}
                </h3>
            </div>
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
      const fiveUris = duckUris
        .slice(duckUris.length - 5, duckUris.length)
        .reverse()
      return fiveUris.map((uri) => {
        return {
          uri: uri.uri.replace('gateway.pinata.cloud', 'cloudflare-ipfs.com'),
          id: uri.id
        }
      })
    }
  },
  beforeMount () {
    this.$store.dispatch('ducks/fetchDuckUris')
  }
}
</script>

<style>
html {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
}

html::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
</style>

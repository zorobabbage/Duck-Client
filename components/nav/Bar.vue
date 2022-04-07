<template>
  <div class="flex w-full" :style="{ backgroundColor: color }">
    <div class="container flex justify-center p-2 mx-auto max-w-screen-xl h-32">
      <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-12">
      <h4 class="self-center mr-auto ml-2 text-4xl font-bold text-black">
        <NuxtLink to="/">Duck</NuxtLink>
      </h4>

      <NavItem to="/explore" class="mr-0">
        Explore
      </NavItem>
      <NavItem to="/wallet" class="mr-0">
        My Ducks
      </NavItem>
      <DuckHeld class="inline-flex self-center px-3 h-12 text-lg text-gray-700 bg-gray-100 rounded-2xl border-2 border-gray-400">
        <img alt="$DUCK" class="self-center w-8 h-8" src="https://meta.viewblock.io/ZIL.zil1c6akv8k6dqaac7ft8ezk5gr2jtxrewfw8hc27d/logo?t=dark"/>
      </DuckHeld>
      <ConnectWallet class="inline-flex self-center px-3 ml-2 h-12 text-lg text-gray-700 bg-gray-100 rounded-2xl border-2 border-gray-400">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="self-center ml-auto text-gray-700">
            <path d="M17 13H5V9V5H17V13ZM1 3V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15V3C17 2.46957 16.7893 1.96086 16.4142 1.58579C16.0391 1.21071 15.5304 1 15 1L3 1C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3Z" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </ConnectWallet>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: 'white'
    }
  },
  mounted () {
    const path = this.$route.path
    if (path === '/') {
      this.color = '#90EBD0'
    }
  },
  watch: {
    $route (to, from) {
      const path = this.$route.path
      if (path === '/') {
        this.color = '#90EBD0'
      } else {
        this.color = 'white'
      }
    }
  }
}
</script>

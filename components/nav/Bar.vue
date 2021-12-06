<template>
  <div class="w-full  flex " :style="{ backgroundColor: color }">
    <div class="max-w-screen-xl flex justify-center p-2 container mx-auto h-32">
      <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-12">
      <h4 class="ml-2 text-4xl font-bold text-black self-center mr-auto">
        <NuxtLink to="/">Duck</NuxtLink>
      </h4>
      <NavItem to="/#home" class="ml-auto ">
        NFDs
      </NavItem>
      <NavItem to="/explore" class="mr-0">
        Explore
      </NavItem>
      <ConnectWallet/>
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

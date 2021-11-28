<template>
  <div class="w-full  flex " :style="{ backgroundColor: navbarColors[$route.path] }">
    <div class="max-w-screen-xl flex justify-center p-2 container mx-auto h-32">
      <h4 class=" text-4xl font-bold text-black self-center mr-auto">
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
      navbarColors: {
        '/': '#90EBD0',
        '/explore': 'white'
      }
    }
  }
}
</script>

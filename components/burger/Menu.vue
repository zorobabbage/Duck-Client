<template  >
  <div class="p-2" :style="{ backgroundColor: navbarColors[$route.path] }">
    <div
      class="flex justify-between w-full p-2 dark:bg-opacity-75 bg-opacity-75 backdrop-filter backdrop-blur-sm"
    >
      <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-12">
      <h4 class=" text-4xl font-bold text-black self-center mr-auto ml-3">
        <NuxtLink to="/">Duck</NuxtLink>
      </h4>
      <IconMenu
        class="w-12 cursor-pointer mr-4"
        @click.native="show = true"
      />
    </div>
    <transition name="slide">
      <div
        v-show="show"
        class="flex flex-col w-screen h-screen right-0 top-0 fixed items-center bg-gray-100 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 backdrop-filter backdrop-blur-md p-2"
      >
        <div class="flex w-full justify-between">
          <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-12 m-2">
          <IconX class="w-12 m-2 cursor-pointer" @click.native="show = false" />
        </div>
        <div class="flex flex-col h-full py-8 gap-y-8">
          <BurgerItem to="/#home" @click="show = false">
            Home
          </BurgerItem>
          <BurgerItem to="/explore" @click="show = false">
            Explore
          </BurgerItem>
          <ConnectWallet class="w-full text-center text-lg bg-gray-300"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    activeLink: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      show: false,
      navbarColors: {
        '/': '#90EBD0',
        '/explore': 'white'
      }
    }
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-in-out;
}

.slide-enter,
.slide-leave-active {
  right: -100%;
}
</style>

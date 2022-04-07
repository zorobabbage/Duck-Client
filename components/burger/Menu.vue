<template  >
  <div class="p-2" :style="{ backgroundColor: navbarColors[$route.path] }">
    <div
      class="flex justify-between p-2 w-full bg-opacity-75 backdrop-filter backdrop-blur-sm dark:bg-opacity-75"
    >
      <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-12">
      <h4 class="self-center mr-auto ml-3 text-4xl font-bold text-black">
        <NuxtLink to="/">Duck</NuxtLink>
      </h4>
      <IconMenu
        class="mr-4 w-12 cursor-pointer"
        @click.native="show = true"
      />
    </div>
    <transition name="slide">
      <div
        v-show="show"
        class="flex fixed top-0 right-0 flex-col items-center p-2 w-screen h-screen bg-gray-100 bg-opacity-95 backdrop-filter backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-95"
      >
        <div class="flex justify-between w-full">
          <img src="~/assets/icons/duck.svg" alt="Duck icon" class="m-2 w-12">
          <IconX class="m-2 w-12 cursor-pointer" @click.native="show = false" />
        </div>
        <div class="flex flex-col gap-y-8 py-8 h-full">
          
          <ConnectWallet class="inline-flex self-center px-3 h-14 text-lg text-gray-700 bg-gray-200 rounded-2xl border-2 border-gray-400">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="self-center ml-auto text-gray-700">
                <path d="M17 13H5V9V5H17V13ZM1 3V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15V3C17 2.46957 16.7893 1.96086 16.4142 1.58579C16.0391 1.21071 15.5304 1 15 1L3 1C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3Z" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </ConnectWallet>
          <DuckHeld alt="$DUCK" class="inline-flex self-center px-3 h-12 text-lg text-gray-700 bg-gray-100 rounded-2xl border-2 border-gray-400">
            <img class="self-center w-8 h-8" src="https://meta.viewblock.io/ZIL.zil1c6akv8k6dqaac7ft8ezk5gr2jtxrewfw8hc27d/logo?t=dark"/>
          </DuckHeld>
          <BurgerItem to="/#home" @click="show = false">
            Home
          </BurgerItem>
          <BurgerItem to="/explore" @click="show = false">
            Explore
          </BurgerItem>
          <BurgerItem to="/wallet" @click="show = false">
            My Ducks
          </BurgerItem>
          
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

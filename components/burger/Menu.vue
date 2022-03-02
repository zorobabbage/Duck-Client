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
        class="flex flex-col w-screen h-screen right-0 top-0 fixed items-center bg-gray-100 dark:bg-gray-800 dark:bg-opacity-95 bg-opacity-95 backdrop-filter backdrop-blur-md p-2"
      >
        <div class="flex w-full justify-between">
          <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-12 m-2">
          <IconX class="w-12 m-2 cursor-pointer" @click.native="show = false" />
        </div>
        <div class="flex flex-col h-full py-8 gap-y-8">
          
          <ConnectWallet class="inline-flex self-center px-3 rounded-2xl bg-gray-200 text-gray-700 h-14 text-lg border-2 border-gray-400">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="self-center ml-auto text-gray-700">
                <path d="M17 13H5V9V5H17V13ZM1 3V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15V3C17 2.46957 16.7893 1.96086 16.4142 1.58579C16.0391 1.21071 15.5304 1 15 1L3 1C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3Z" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </ConnectWallet>
          <DuckHeld class="inline-flex self-center px-3 rounded-2xl bg-gray-100 text-gray-700 h-12 text-lg border-2 border-gray-400">
            <img class="h-8 w-8 self-center" src="https://meta.viewblock.io/ZIL.zil1c6akv8k6dqaac7ft8ezk5gr2jtxrewfw8hc27d/logo?t=dark"/>
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

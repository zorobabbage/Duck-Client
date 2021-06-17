<template>
  <div class="m-2">
    <div
      v-if="!show"
      class="flex justify-between w-full p-2 top-0 left-0 fixed bg-gray-100 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 backdrop-filter backdrop-blur-sm"
    >
      <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-12">
      <img
        v-if="!show"
        src="~/assets/icons/menu.svg"
        alt="Menu"
        class="w-12 cursor-pointer mr-4"
        @click="show = true"
      >
      <img
        v-if="show"
        src="~/assets/icons/x.svg"
        alt="Close"
        class="w-12 cursor-pointer"
        @click="show = false"
      >
    </div>
    <transition name="slide">
      <div
        v-show="show"
        class="flex flex-col w-screen h-screen right-0 top-0 fixed items-center bg-gray-100 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 backdrop-filter backdrop-blur-md"
      >
        <div class="flex w-full justify-between">
          <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-12 m-2">
          <img
            src="~/assets/icons/x.svg"
            alt="Close"
            class="w-12 m-2 cursor-pointer"
            @click="show = false"
          >
        </div>
        <Socials class="w-full" />
        <div class="flex flex-col justify-between h-full py-8">
          <BurgerItem to="/#home" @click="show = false">
            Home
          </BurgerItem>
          <BurgerItem to="/#countdown" @click="show = false">
            Countdown
          </BurgerItem>
          <BurgerItem to="/#what-the-duck" @click="show = false">
            What the duck?
          </BurgerItem>
          <BurgerItem to="/#roadmap" @click="show = false">
            Roadmap
          </BurgerItem>
          <BurgerItem to="/#tokenomics" @click="show = false">
            Tokenomics
          </BurgerItem>
          <BurgerItem to="/#papers" @click="show = false">
            Papers
          </BurgerItem>
          <button
            v-if="launchDate > currentDate"
            class="text-l p-4 font-bold bg-duck-yellow dark:bg-yellow-500 rounded-md mt-4 w-56 lg:self-end xl:text-xl xl:w-64 2xl:text-2xl 2xl:w-80"
            @click="show = false"
          >
            <a href="/#countdown">Dapp launching soon</a>
          </button>
          <CallToAction v-else />
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
      show: false
    }
  },
  computed: {
    currentDate () {
      return this.$store.state.ducks.currentDate
    },
    launchDate () {
      return this.$store.state.ducks.launchDate
    }
  },
  watch: {
    activeLink (val) {
      const links = document.querySelectorAll('span > a')
      links.forEach((link) => {
        link.classList.remove('nuxt-link-exact-active')
      })
      const link = document.querySelector(`span > a[href='/${val}']`)
      link.classList.add('nuxt-link-exact-active')
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

<template>
  <div class="m-2">
    <div class="flex justify-between">
      <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-12">
      <img
        v-if="!show"
        src="~/assets/icons/menu.svg"
        alt="Menu"
        class="w-12 cursor-pointer"
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
        v-if="show"
        class="flex flex-col w-screen h-screen right-0 top-0 absolute items-center bg-blue-100"
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
          <BurgerItem to="/#new-ducks" @click="show = false">
            Newly Minted Ducks
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
          <BurgerItem to="/#pond-papers" @click="show = false">
            Pond papers
          </BurgerItem>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
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

<template>
  <div>
    <img
      v-if="!show"
      src="~/assets/icons/menu.svg"
      alt="Menu"
      class="w-12 absolute right-0 m-2 "
      @click="show = true"
    >
    <div
      v-if="show"
      class="flex flex-col w-screen h-screen absolute items-center"
    >
      <img src="~/assets/icons/duck.svg" alt="Duck icon" class="w-16 m-2">
      <div class="flex flex-col justify-evenly h-full">
        <BurgerItem to="/#new-ducks">
          Newly Minted Ducks
        </BurgerItem>
        <BurgerItem to="/#new-ducks">
          Newly Minted Ducks
        </BurgerItem>
        <BurgerItem to="/#new-ducks">
          Newly Minted Ducks
        </BurgerItem>
        <BurgerItem to="/#new-ducks">
          Newly Minted Ducks
        </BurgerItem>
        <BurgerItem to="/#new-ducks">
          Newly Minted Ducks
        </BurgerItem>
        <BurgerItem to="/#new-ducks">
          Newly Minted Ducks
        </BurgerItem>
      </div>
      <button class="text-xl font-bold p-4 mt-auto" @click="show = false">
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  }
}
</script>

<style lang="scss" scoped></style>

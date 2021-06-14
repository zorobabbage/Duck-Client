<template>
  <div>
    <BurgerMenu v-if="breakpoint.is === 'sm' || breakpoint.is === 'md'" />
    <NavBar v-else />
    <Nuxt />
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'bg-gray-50'
    }
  },
  computed: {
    breakpoint () {
      if (process.client) {
        return this.$breakpoint
      }
      return { is: '' }
    }
  }
}
</script>

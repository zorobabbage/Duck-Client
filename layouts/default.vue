<template>
  <div>
    <NavBar v-if="$breakpoint.is !== 'sm'" />
    <BurgerMenu v-if="$breakpoint.is === 'sm'" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'bg-blue-100'
    }
  }
}
</script>

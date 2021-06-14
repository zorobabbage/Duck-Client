<template>
  <div>
    <NavBar v-if="$breakpoint.is !== 'sm' && $breakpoint.is !== 'md'" />
    <BurgerMenu v-if="$breakpoint.is === 'sm' || $breakpoint.is === 'md'" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  head: {
    bodyAttrs: {
      class: 'bg-gradient-to-b from-blue-200 to-blue-50'
    }
  }
}
</script>

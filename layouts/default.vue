<template>
  <div>
    <NavBar v-if="$breakpoint.is !== 'sm'" />
    <BurgerMenu v-if="$breakpoint.is === 'sm'" />
    <Nuxt />
  </div>
</template>

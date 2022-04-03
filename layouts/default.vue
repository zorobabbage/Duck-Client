<template>
  <div class="">
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-RJ4ZEYV2FH"
    />

   
    <BurgerMenu
      v-if="breakpoint.is === 'sm' || breakpoint.is === 'md'"
      :active-link="activeLink"
      class=""
    />
    <NavBar v-else :active-link="activeLink" />
    <Nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      sectionObserver: undefined,
      activeLink: ''
    }
  },
  head: {
    bodyAttrs: {
      class: 'bg-gray-50 dark:bg-gray-900'
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

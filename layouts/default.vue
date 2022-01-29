<template>
  <div class="overflow-hidden">
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-RJ4ZEYV2FH"
    />
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag() {
      dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', 'G-RJ4ZEYV2FH')
    </script>
   
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
  },
  mounted () {
    this.observeSections()
  },
  methods: {
    observeSections () {
      try {
        this.sectionObserver.disconnect()
      } catch (error) {}

      const options = {
        rootMargin: '50px 50px',
        threshold: 0.25
      }
      this.sectionObserver = new IntersectionObserver(
        this.sectionObserverHandler,
        options
      )

      // Observe each section
      const sections = document.querySelectorAll('section')
      sections.forEach((section) => {
        this.sectionObserver.observe(section)
      })
    },
    sectionObserverHandler (entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          // Push sectionId to router here
          history.replaceState(null, null, `#${sectionId}`)
          this.activeLink = `#${sectionId}`
        }
      }
    }
  }
}
</script>

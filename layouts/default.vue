<template>
  <div>
    <div class="fixed right-0 h-screen mr-8 flex items-center justify-center">
      <Socials
        v-if="!(breakpoint.is === 'md' || breakpoint.is === 'sm')"
      />
    </div>
    <BurgerMenu
      v-if="breakpoint.is === 'sm' || breakpoint.is === 'md'"
      :active-link="activeLink"
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

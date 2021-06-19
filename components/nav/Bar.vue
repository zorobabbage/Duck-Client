<template>
  <div class="fixed w-full p-2 bg-gray-100 dark:bg-gray-800 dark:bg-opacity-75 bg-opacity-75 backdrop-filter backdrop-blur-sm flex justify-center">
    <NavItem to="/#home" class="ml-auto">
      Home
    </NavItem>
    <NavItem to="/#newly-minted">
      Newly Minted
    </NavItem>
    <NavItem to="/#what-the-duck">
      What the duck?
    </NavItem>
    <img src="~/assets/icons/duck.svg" alt="Duck icon">
    <NavItem to="/#roadmap">
      Roadmap
    </NavItem>
    <NavItem to="/#tokenomics">
      Tokenomics
    </NavItem>
    <NavItem to="/#papers">
      Papers
    </NavItem>
    <ToggleDarkmode class="ml-auto mr-2 self-center" />
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

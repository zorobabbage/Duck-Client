<template>
  <div class="fixed w-full p-2 bg-gray-100 bg-opacity-75 backdrop-filter backdrop-blur-sm flex justify-center">
    <NavItem to="/#home">
      Home
    </NavItem>
    <NavItem to="/#countdown">
      Countdown
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

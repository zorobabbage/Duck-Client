<template>
  <div class="w-full  flex bg-sky  ">
    <div class="max-w-screen-xl flex justify-center p-2 container mx-auto h-32">
      <h4 class=" text-4xl font-bold text-black self-center mr-auto">Duck</h4>
      <NavItem to="/#home" class="ml-auto ">
        NFDs
      </NavItem>
      <NavItem to="/#newly-minted" class="mr-0">
        Explore
      </NavItem>
    </div>
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

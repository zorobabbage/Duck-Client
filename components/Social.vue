<template>
  <img :src="require(`~/assets/icons/${icon}.svg`)" :alt="name" class="w-12 md:w-16">
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>

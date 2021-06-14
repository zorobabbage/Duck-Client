<template>
  <article class="flex flex-col items-center">
    <img class="w-48" :src="require(`~/assets/images/${img}`)" :alt="alt">
    <P class="text-center">
      <slot />
    </P>
  </article>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <article class="flex flex-col items-center">
    <H2 class="font-semibold">
      <slot name="title" />
    </H2>
    <img
      :src="require(`~/assets/images/${img}`)"
      class="mt-16 h-48"
      :alt="alt"
    >
    <div class="flex flex-col items-center mt-8">
      <slot name="items" />
    </div>
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

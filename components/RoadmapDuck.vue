<template>
  <article class="flex flex-col items-center">
    <H2 class="font-semibold">
      <slot name="title" />
    </H2>
    <img
      :src="require(`~/assets/images/${imgSrc}`)"
      class="w-48"
      :alt="imgAlt"
    >
    <div class="flex flex-col items-center">
      <slot name="items" />
    </div>
  </article>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    imgAlt: {
      type: String,
      required: true
    }
  }
}
</script>

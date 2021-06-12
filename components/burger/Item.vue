<template>
  <span class="p-4 w-full text-center text-lg">
    <NuxtLink :to="to"><slot /> </NuxtLink>
  </span>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>

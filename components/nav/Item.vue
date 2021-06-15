<template>
  <span class="p-4">
    <NuxtLink :to="to" class="text-lg"><slot /> </NuxtLink>
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

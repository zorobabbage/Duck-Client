<template>
  <span class="p-4">
    <NuxtLink :to="to" class="text-lg text-gray-900 dark:text-gray-50"><slot /> </NuxtLink>
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

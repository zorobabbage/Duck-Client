<template>
  <span class="w-full text-center text-lg" @click="$emit('click')">
    <NuxtLink :to="to" class="text-gray-900 dark:text-gray-50"><slot /> </NuxtLink>
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

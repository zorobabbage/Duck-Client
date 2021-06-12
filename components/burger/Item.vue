<template>
  <span class="w-full text-center text-lg" @click="$emit('click')">
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

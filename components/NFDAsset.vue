<template>
  <div class="rounded-3xl bg-gray-300">
    <img :src="img" class="rounded-3xl" />
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    rarity: {
      type: String
    }
  }
}
</script>

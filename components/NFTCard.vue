<template>
  <div>
    <img :src="uri" class="rounded-t-3xl"/>
    <div class="flex flex-row w-full bg-gray-100 rounded-b-3xl p-4">
      <h4 class="text-2xl font-semibold mr-auto">Duck name</h4>
      <h2 class="text-4xl font-semibold text-right">#{{id}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uri: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  }
}
</script>

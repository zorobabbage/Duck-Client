<template>
<div>
  <NuxtLink :to="'/explore/'+duck.id">
    <img :src="duck.data.quick_resource" class="rounded-t-3xl"/>
    <div class="flex flex-row w-full bg-gray-100 rounded-b-3xl p-4">
      <h4 class="text-2xl font-semibold mr-auto">Duck name</h4>
      <h2 class="text-4xl font-semibold text-right">#{{duck.id}}</h2>
    </div>
  </NuxtLink>
</div>
</template>

<script>
export default {
  props: {
    duck: {
      type: Object,
      required: true
    }
  }
}
</script>

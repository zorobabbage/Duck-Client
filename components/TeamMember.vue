<template>
    <div>
        <img class="rounded-full" :src="img"/>
    </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      required: true
    }
  }
}
</script>

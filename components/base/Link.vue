<template>
  <a
    :href="href"
    class="text-xl text-blue-500 underline lg:text-2xl 2xl:text-3xl font-medium"
  ><slot /></a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  }
}
</script>

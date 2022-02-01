<template>
  <div class="w-full rounded-lg p-12 flex flex-col justify-center items-center">
    <div class="mb-8">
      <img
        class="
          object-center object-cover
          border-2 border-black
          bg-white
          rounded-full
          h-36
          w-36
        "
        :src="require('@/assets/images/unknown-duck-small.png')"
        v-if="!this.duckURL"
      />
      <img
        class="
          object-center object-cover
          border-2 border-black
          bg-white
          rounded-full
          h-36
          w-36
        "
        :src="duckURL"
        v-if="this.duckURL"
      />
    </div>
    <div class="text-center">
      <p class="text-xl text-gray-900 font-bold mb-2 self-center">{{ name }}</p>
      <div class="flex flex-row gap-2" v-if="twitter">
        <a
          class="text-base text-gray-800 font-normal"
          target="_blank"
          :href="'https://twitter.com/' + twitter"
          >@{{ twitter }}</a
        >
        <IconTwitter />
      </div>
      <p class="text-base text-gray-800 font-normal self-center">{{ role }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'twitter', 'id', 'role'],
  data () {
    return {
      duckURL: ''
    }
  },
  async beforeMount () {
    if (this.id) {
      const { quick_resource } = await this.$axios.$get(`/duck/${this.id}`)
      this.duckURL = quick_resource
    }
  }
}
</script>


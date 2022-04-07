<template>
  <div class="flex flex-col justify-center items-center p-12 w-full rounded-lg">
    <div class="mb-8">
      <img
        class="object-cover object-center w-36 h-36 bg-white rounded-full border-2 border-black"
        alt="Placeholder duck"
        :src="require('@/assets/images/unknown-duck-small.png')"
        v-if="!this.duckURL"
      />
      <img
        class="object-cover object-center w-36 h-36 bg-white rounded-full border-2 border-black"
        alt="Team member's duck"
        :src="duckURL"
        v-if="this.duckURL"
      />
    </div>
    <div class="text-center">
      <p class="self-center mb-2 text-xl font-bold text-gray-900">{{ name }}</p>
      <div class="flex flex-row gap-2" v-if="twitter">
        <a
          class="text-base font-normal text-gray-800"
          target="_blank"
          :href="'https://twitter.com/' + twitter"
          >@{{ twitter }}</a
        >
        <IconTwitter :link="'https://twitter.com/' + twitter"/>
      </div>
      <p class="self-center text-base font-normal text-gray-800">{{ role }}</p>
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
      this.duckURL = quick_resource.replace('.png', '.webp')
    }
  }
}
</script>


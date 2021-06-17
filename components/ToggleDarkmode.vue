<template>
  <div class="">
    <button
      class="dark:bg-gray-700 bg-gray-100 p-2 rounded-lg flex justify-between"
      @click="toggleDarkmode"
    >
      <span class="p-2 rounded-lg dark:bg-gray-900">dark</span>
      <span class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">light</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    darkmode () {
      return this.$store.state.ducks.darkmode
    }
  },
  methods: {
    ...mapActions({ toggleDarkmode: 'ducks/toggleDarkmode' })
  }
}
</script>

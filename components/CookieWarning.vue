<template>
  <div v-if="show" class="flex items-center justify-center">
    <div
      class="flex flex-col bg-gray-100 bg-opacity-75 backdrop-filter backdrop-blur-md p-8 rounded-3xl"
    >
      <P>
        On this site we make use of cookies for a better user experience and
        analytics.
      </P>
      <div class="lg:mx-auto mt-4">
        <button
          class="bg-green-400 p-4 px-8 rounded-xl font-bold"
          value="true"
          @click="setCookieSettings"
        >
          Ok
        </button>
        <button
          class="bg-red-400 p-4 px-8 rounded-xl font-bold"
          value="false"
          @click="setCookieSettings"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  beforeMount () {
    const cookies = localStorage.getItem('cookies')
    if (cookies === 'true') {
      this.show = false
    } else {
      this.show = true
    }
  },
  methods: {
    setCookieSettings (event) {
      localStorage.setItem('cookies', event.target.value)
      this.show = false
    }
  }
}
</script>

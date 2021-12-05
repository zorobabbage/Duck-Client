<template>
    <div class= " w-full" :class="bg">
        <div class="container px-8 md:px-0 mx-auto max-w-screen-xl py-14">
            <div class="flex ">
                <img src="~/assets/icons/duck.svg" alt="Duck icon" class="mr-2 self-center">
                <h2 class=" font-semibold text-4xl text-gray-300 self-center">Duck</h2>
            </div>
        </div>
        <div style="border-top: 1px; border-style: solid;" :style="{'border-color': line}">
            <div class="container px-8 md:px-0 mx-auto max-w-screen-xl flex  h-28">
                <h5 class= "text-base text-gray-300 my-auto self-center">&copy; Duck Team 2021</h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      line: '#6b7280',
      bg: 'bg-gray-700'
    }
  },
  props: {
    background: {
      type: String
    }
  },
  mounted () {
    if (this.background === 'grass') {
      console.log('reeeeeeeeeeee')
      this.line = '#3C4B33'
      this.bg = 'bg-grass-footer'
    }
  }
}
</script>

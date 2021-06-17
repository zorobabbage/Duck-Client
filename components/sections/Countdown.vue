<template>
  <section class="flex flex-col items-center">
    <H2 class="text-center max-w-lg lg:max-w-screen-2xl">
      Countdown Until Non-Fungible Ducks' Launch
    </H2>
    <div class="flex flex-col items-center mt-16 lg:flex-row lg:justify-center">
      <H2 class="font-normal text-center">
        {{ timeLeft }}
      </H2>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    launchDate () {
      return this.$store.state.ducks.launchDate
    },
    currentDate () {
      return this.$store.state.ducks.currentDate
    },
    timeLeft () {
      const seconds = Math.floor((this.launchDate - this.currentDate) / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      const daysLeft = days
      const hoursLeft = hours % 24
      const minutesLeft = minutes % 60
      const secondsLeft = seconds % 60

      const a = daysLeft ? `${days} ${this.endWithS(daysLeft, 'day')}, ` : ''
      const b = hoursLeft
        ? `${hoursLeft} ${this.endWithS(hoursLeft, 'hour')}, `
        : ''
      const c = minutesLeft
        ? `${minutesLeft} ${this.endWithS(minutesLeft, 'minute')}, `
        : ''
      const d = secondsLeft
        ? `${secondsLeft} ${this.endWithS(secondsLeft, 'second')}`
        : ''

      return `${a}${b}${c}${d}`
    }
  },
  methods: {
    endWithS (num, string) {
      return num === 1 ? `${string}` : `${string}s`
    }
  }
}
</script>

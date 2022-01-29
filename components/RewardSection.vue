<template>
  <div v-if="rewards">
    <RewardCard 
      class="mb-1"
      v-for="reward in rewards" 
      v-bind:key="reward.epoch" 
      :reward="reward" 
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      rewards: [],
    };
  },
  methods: {
    async fetchRewards() {
      const data = await this.$axios.$get("/rewards")
      this.rewards = data
      console.log(this.rewards)
    },
  },
  mounted() {
    this.fetchRewards()
  },
}
</script>


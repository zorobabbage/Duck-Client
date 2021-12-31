<template>
  <div>
    <button @click="showModal = true" class="px-2 font-medium flex items-center justify-center text-center">
        {{duckHeld}}
    </button>
    <slot />
    <DuckModal :show="showModal" @close="showModal = false"> </DuckModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      duckPriceUSD: 0
    };
  },
  methods: {

  },
  computed: {
    duckHeld () {
      return 1.98
    }
  },
  mounted() {

  },
};
</script>


<template>
  <div class="flex justify-between p-2">
    <button
      @click="to"
      class="
        hover:underline
        flex
        font-light
        text-gray-700
        dark:text-gray-300
        text-md
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 self-center text-gray-700 dark:text-gray-300"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <a class="self-center"> {{ text }}</a>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Back'
    }
  },
  methods: {
      to() {
        this.$router.go(-1);
      },
    }
}
</script>

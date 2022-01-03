<template>
  <div class="bg-gray-100 p-5 rounded-xl">
    <div class="flex flex-row">
      <h4 class="text-sm font-semibold text-gray-700">{{ from }} - {{ to }}</h4>
    </div>
    <div class="flex flex-col md:flex-row h-12">
      <div class="w-60 flex flex-row mb-6 md:mb-0">

        <div class="self-center flex flex-col lg:flex-row">
          <h4 class="align-middle text-lg font-extrabold uppercase text-gray-800" style="color: #f1743a!important;">
              {{ (2 / 100).toFixed(2) }} DUCK
          </h4>
          <h4 class="align-middle self-center mr-2 text-sm font-semibold text-gray-500 ml-2">≈ {{ (960 * 2/100).toFixed(2) }}$</h4>
        </div>
      </div>
      <button
        class="
                flex
                ml-auto
                items-center
                justify-center
                px-3
                py-2
                text-sm
                font-medium
                text-white
                transition-colors
                duration-200
                transform
                bg-gray-500
                rounded-2xl
                hover:bg-gray-400
                focus:bg-gray-400 focus:outline-none
              "
      >
        <span class="m-2 text-white" @click="handleClick()">
          Claim
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['from', 'to', 'block']
}
</script>

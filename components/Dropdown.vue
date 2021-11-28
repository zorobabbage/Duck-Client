<template>
  <div
    class="inline-block text-left text-gray-800"
  >
    <div>
      <span
      class="rounded-lg shadow-sm"
      >
        <button
          v-click-outside="hide"
          @click="toggle"
          type="button"
          class="inline-flex items-center justify-between w-full rounded-lg border  h-10 px-4 py-4 bg-gray-50 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none active:bg-gray-100 active:text-gray-800 transition ease-in-out duration-150 btn-focus"
        >
          <span> {{ label }} </span>
          <img
            src="https://s.svgbox.net/hero-solid.svg?ic=chevron-down&fill=grey-800"
            class="-mr-1 ml-2 h-5 w-5"
          />
        </button>
      </span>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isMenuOpen"
        class="absolute mt-2 w-10/12 rounded-lg shadow-lg text-sm overflow-hidden border"
      >
        <div
          class="rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div>
            <div class="bg-gray-50 p-2 flex items-center">
              <div class="w-full">
                <div class="p-2 hover:bg-gray-200 rounded-md cursor-pointer" v-for="attribute in list" :key="attribute.name" v-on:click="onClickButton(attribute)">
                  <p v-on:click="onClickButton(attribute)">{{attribute.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  data () {
    return {
      isMenuOpen: false
    }
  },
  props: {
    label: {
      type: String
    },
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    onClickButton (attribute) {
      this.$emit('clicked', attribute)
    },
    hide () {
      this.isMenuOpen = false
    },
    show () {
      this.isMenuOpen = true
    },
    toggle () {
      this.isMenuOpen = !this.isMenuOpen
    }
  },
  directives: {
    ClickOutside
  }
}
</script>

<template>
  <div
    class="inline-block text-left text-gray-800"
    @click.prevent
  >
    <div>
      <span
      @click.prevent
      class="rounded-lg shadow-sm"
      >
        <button
          @click="toggle"
          type="button"
          class="inline-flex items-center justify-between w-full rounded-lg border  h-10 px-4 py-4 bg-gray-50 text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none active:bg-gray-100 active:text-gray-800 transition ease-in-out duration-150 btn-focus"
        >
          <span @click.prevent> {{ label }} </span>
          <img
            src="https://s.svgbox.net/hero-solid.svg?ic=chevron-down&fill=grey-800"
            class="-mr-1 ml-2 h-5 w-5"
          />
        </button>
      </span>
    </div>
    <transition
      name="slide-in-up"
    >
      <div
        v-if="isMenuOpen"
        class="md:w-56 mt-2 w-full rounded-lg shadow-lg text-sm  border z-20"
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
                <div class="p-2 hover:bg-gray-200 rounded-md cursor-pointer" :class="{'bg-amber-100': selected === attribute}" v-for="attribute in list" :key="attribute.name" v-on:click="onClickButton(attribute)">
                  <p>{{attribute.name}}</p>
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

export default {
  data () {
    return {
      isMenuOpen: false,
      selected: {}
    }
  },
  props: {
    label: {
      type: String
    },
    list: {
      type: Array
    },
    type: {
      type: String
    }
  },
  methods: {
    onClickButton (attribute) {
      let type = this.type
      this.selected = attribute
      this.$emit('clicked', {type, attribute})
      this.hide()
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
  }
}
</script>

<style scoped>
.slide-in-up-enter-active, .slide-in-up-leave-active {
  transition: all .5s;
  transform: translateY(0);
}
.slide-in-up-enter, .slide-in-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
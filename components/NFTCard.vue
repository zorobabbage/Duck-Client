<template>
<div>
  <NuxtLink :to="'/explore/'+duck.id">
    <div class="relative aspect-square">
      <transition name="fade">
        <img v-bind:src="duck.data.quick_resource" v-on:load="onLoaded" v-show="loaded" class="aspect-square rounded-t-3xl absolute top-0 left-0"/>
      </transition>
      <div class="box w-full rounded-t-3xl aspect-square " v-show="!loaded"></div>
      <img :src="require('@/assets/images/unknown-duck-small.png')" v-show="!loaded" class="aspect-square rounded-t-3xl absolute top-0 left-0"/>
      
    </div>
    <div class="flex flex-row w-full bg-gray-100 rounded-b-3xl p-4">
      <h4 class="text-xl font-semibold mr-auto">{{duck.data.name}}</h4>
      <h2 class="text-2xl font-semibold text-right">#{{duck.id}}</h2>
    </div>
  </NuxtLink> 
</div>
</template>

<script>
export default {
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    onLoaded() {
      this.loaded = true
    }
  },
  props: {
    duck: {
      type: Object,
      required: true
    }
  }
}
</script>

<style >
.box {
  -webkit-mask:
    linear-gradient(rgb(95, 95, 95) 0 0) top         /100% 100%;
  -webkit-mask-repeat:no-repeat;
  background:linear-gradient(60deg,#ccca 40%,#fffa ,#ccca 60%) right/300% 100% ;
  animation: m 1s linear infinite;
}
@keyframes m {
  to {background-position:left;}
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
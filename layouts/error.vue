<template>
  <div class="container items-center m-auto mx-8 mt-12 max-w-screen-md h-screen lg:mx-auto md:mt-24">
    <div class="flex flex-row p-8 pt-16 bg-gray-100 rounded-2xl lg:p-16">
        <div>
            <h1 class="text-7xl font-black">{{ error.statusCode }}</h1>
            <h1 class="text-7xl font-black text-gray-700" v-if="error.statusCode === 404">Page not found</h1>
            <h1 class="text-7xl font-black text-gray-700" v-else>An error occurred <a class="text-lg">{{error.message}}</a></h1>
            <NuxtLink to="/"><h4 class="mt-8 text-lg font-medium text-gray-900 underline">Home page</h4></NuxtLink>
        </div>
        <img class="hidden lg:flex" src="@/assets/images/engineer-duck-small.png">
    </div>
    <img class="lg:hidden" src="@/assets/images/engineer-duck-small.png">
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

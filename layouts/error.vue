<template>
  <div class="container mx-8 lg:mx-auto max-w-screen-md h-screen items-center m-auto mt-12 md:mt-24 ">
    <div class="bg-gray-200 rounded-2xl p-8 lg:p-16 pt-16 flex flex-row">
        <div>
            <h1 class="font-black text-7xl" v-if="error.statusCode === 404">404 <a class="text-gray-700">Page not found</a></h1>
            <h1 v-else>An error occurred</h1>
            <NuxtLink to="/"><h4 class="text-lg font-medium text-gray-900 underline mt-8">Home page</h4></NuxtLink>
        </div>
        <img class="hidden lg:flex" src="@/assets/images/engineer-duck.png">
    </div>
    <img class="lg:hidden" src="@/assets/images/engineer-duck.png">
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

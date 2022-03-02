<template>
  <div class='bg-gray-50'>

    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden pt-12 px-4'>
      <div class='flex flex-col md:flex-row space-y-4'>
        <h1 class='text-4xl font-medium mt-4 mr-auto '>Duck blog</h1>
      </div>
      
      <nuxt-content :document="article" />

      <div>
        <h6 class="text-gray-700 font-medium my-4">Articles</h6>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
        </div>
 

    
      </div>
    </div>
    <Footer class="mt-24"/>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    console.log(params)
    const article = await $content('blog', params.slug).fetch()
    console.log(article)
    return {
      article
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en", options);
    },
  },
};
</script>

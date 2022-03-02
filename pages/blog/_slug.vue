<template>
  <div class='bg-gray-50'>

    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden pt-12 px-4'>

      <Prev />
      <nuxt-content :document="article" class="prose  mx-auto max-w-3xl"/>

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
 
    const article = await $content('blog', params.slug).fetch()
 
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

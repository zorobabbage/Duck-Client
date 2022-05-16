<template>
  <div class='bg-gray-50'>

    <div class='flex flex-col container max-w-screen-xl mx-auto overflow-hidden pt-12 px-4'>

      <Prev />
      <nuxt-content :document="article" class="prose  mx-auto w-full max-w-full lg:max-w-3xl"/>

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

<template>
    <div class="container max-w-screen-xl items-start mt-8 md:mt-16 px-4 md:px-0 mb-16">
        <h4 class="text-2xl font-bold text-left flex self-start mb-8 text-gray-900">Our new blog!</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div 
                v-for="(article, index) in articles.slice(0, 3)"
                :key="index"
                class="w-full rounded-xl bg-grass-card-900 h-36 p-4"
            >
              <nuxt-link :to="article.path">
                <h6 class="font-semibold text-lg">{{ article.title }}</h6>
                <p class="font-light">{{ new Date(article.createdAt).toLocaleString() }}</p>
                <p>{{ article.description }}</p>
              </nuxt-link>
            </div>
        </div>
        <NuxtLink to="/blog">
        <button class="flex my-4 mx-auto px-4 py-3 bg-grass-card-900 outline-2 shadow-md rounded-3xl text-xl font-bold">Blog Home</button>
        </NuxtLink>
    </div>
</template>


<script>
export default {
  data () {
    return {
      articles: []
    }
  },
  methods: {
    async getAll () {
      this.articles = await this.$content(`blog`)
        .sortBy('date')
        .fetch()
        
    }
  },
  mounted () {
      this.getAll()
  }
}
</script>



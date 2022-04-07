<template>
    <div class="container items-start px-4 mt-8 mb-16 max-w-screen-xl md:mt-16 md:px-0">
        <h4 class="flex self-start mb-8 text-2xl font-bold text-left text-gray-900">Our new blog!</h4>
        
        <div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
            <div 
                v-for="(article, index) in articles.slice(0, 3)"
                :key="index"
                class="p-4 w-full h-36 rounded-xl bg-grass-card-900"
            >
              <nuxt-link :to="article.path">
                <h5 class="text-lg font-semibold">{{ article.title }}</h5>
                <p class="font-light">{{ new Date(article.createdAt).toLocaleString() }}</p>
                <p class="truncate overflow-ellipsis">{{ article.description }}</p>
              </nuxt-link>
            </div>
        </div>
        <NuxtLink to="/blog">
        <button class="flex px-4 py-3 mx-auto my-4 text-xl font-bold rounded-3xl shadow-md bg-grass-card-900 outline-2">Blog Home</button>
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



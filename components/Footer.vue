<template>
    <div class= " w-full" :class="bg">
        <div class="container px-8 md:px-0 mx-auto max-w-screen-xl pt-14">
            <div class="flex ">
                <img src="~/assets/icons/duck.svg" alt="Duck icon" class="mr-2 self-center">
                <h2 class=" font-semibold text-4xl text-gray-300 self-center">Duck</h2>
            </div>
        </div>
        <div class="container px-8 md:px-0 mx-auto max-w-screen-xl">
          <div class="flex flex-col md:flex-row py-8 space-4">
            <div class="flex flex-col space-y-4">
              <a class= "text-base text-gray-300 my-auto" href="https://zilstream.com/tokens/duck">Zilstream</a>
              <a class= "text-base text-gray-300 my-auto" href="https://viewblock.io/zilliqa/address/zil1c6akv8k6dqaac7ft8ezk5gr2jtxrewfw8hc27d">Viewblock</a>
            </div>
            <div class="flex flex-col space-y-4 mt-4 md:mt-0 md:ml-16">
              <a class= "text-base text-gray-300 my-auto" href="https://coinmarketcap.com/currencies/duckduck/">Coingecko</a>
              <a class= "text-base text-gray-300 my-auto" href="https://www.coingecko.com/en/coins/duckduck-token">CoinMarketCap</a>
            </div>
          </div>
        </div>
        <div style="border-top: 1px; border-style: solid;" :style="{'border-color': line}">
            <div class="container px-8 md:px-0 mx-auto max-w-screen-xl flex  h-28">
                <h5 class= "text-base text-gray-300 my-auto self-center">&copy; Duck Team {{ new Date().getFullYear() }}</h5>
                <div class="ml-auto self-center flex flex-row space-x-6 md:space-x-2">
                    <IconDiscord />
                    <IconTwitter link="https://twitter.com/zilduck"/>
                    <IconTelegram />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      line: '#6b7280',
      bg: 'bg-gray-700'
    }
  },
  props: {
    background: {
      type: String
    }
  },
  mounted () {
    if (this.background === 'grass') {
      this.line = '#3C4B33'
      this.bg = 'bg-grass-footer'
    }
  }
}
</script>

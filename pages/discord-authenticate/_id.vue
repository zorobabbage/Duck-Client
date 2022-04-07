<template>
  <div class='bg-gray-50'>
    <div class='container flex overflow-hidden flex-col px-4 mx-auto max-w-screen-xl md:pt-12'>
      <h1 class="text-3xl font-medium">Discord Verify</h1>
      <p class="mt-2">You will be asked to submit a transaction which allows us to verify you hold a Non Fungible Duck. 
        <br>
        <br>We will then give you the 'Non Fungible Ducks' role which gives exclusive access to:
      </p>
      <ul class="list-disc list-inside">
        <li>Premium Pond chat</li>
        <li>Premium Bot (new Zilswap listings)</li>
      </ul>
      
      <div class="p-4 my-5 bg-gray-100 rounded-2xl">
        <h4 class="text-xl font-medium">Send transaction</h4>

      </div>
    </div>
    <Footer class='bg-gray-700'/>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  beforeMount () {

  },
  methods: {

  },
  watch: {
    quickDuckLoaded: function (val) {
      this.loadHighResImage()
    }
  },
  computed: {
    attributeCounts () {
      return this.$store.ducks.attributeCounts
    },
    yourDuck () {
      const userWallet = this.$store.state.wallet.wallet.base16.toLowerCase()
      return userWallet == this.duckOwner.toLowerCase()
    },
    ZRC1Duck () {
      return '0xdaaf7e1479ef28ba7818b48ae5664b59b738dc97'.toLowerCase() == this.duckOwner.toLowerCase() ? true : false
    },
    duckOwners () {
      return this.$store.state.ducks.duckOwners
    }
  }
}
</script>

 
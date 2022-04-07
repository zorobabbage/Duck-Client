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
        <img alt="Running duck cartoon" class="p-4 w-48" src="@/assets/images/running-duck-2.png"/>
        <button @click="checkOwnership" class="px-6 py-2 mt-4 text-gray-50 bg-gray-400 rounded-2xl">Authenticate</button>
      </div>
    </div>
    <Footer class='bg-gray-700'/>
  </div>
</template>

<script>
const environment = require('@/helpers/environment')
import { BN, Long } from '@zilliqa-js/util'
import { pollTx } from '@/zilpay/poll-tx'
import { scillaJSONVal } from "@zilliqa-js/scilla-json-utils"
import bcrypt from "bcryptjs"

export default {
    data() {
    return {
      id: ""
    };
  },
  beforeMount() {
    this.id = this.$route.params.id;
  },
  methods: {
    async checkOwnership () {
      let amount = new BN('0')
      const gasLimit = Long.fromString('5000')
      const gasPrice = new BN('200000000')
      let contract
      if (process.browser) {
        contract = window.zilPay.contracts.at(environment.getContractAddress('OWNERSHIP_CONTRACT')) 
      }

      //bcrypt logic
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(this.id, salt);
 
      try {
        const tx = await contract.call('CheckOwnership',
          [
            
            {
              vname: "hash",
              type: "String",
              value: scillaJSONVal("String", hash)
            }
          ],
          {
            amount,
            gasPrice,
            gasLimit
          })


        let txToast = this.$toast.success("TX sending") 
        txToast = this.$styleToast(txToast, tx,   "Checking duck ownsership", 'pending')

        await pollTx(tx)
          .then(res => {
            console.log(res)
            txToast = this.$styleToast(txToast, tx, "Confirmed", 'success')
            this.approved = true
            txToast.goAway(20000)
          })
          .catch(err => {
            console.log(err)
            txToast = this.$styleToast(txToast, tx, "Check failed", 'failed')
            txToast.goAway(20000)
          })


      } catch (err) {
        console.log(err)
      }
    },
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

 
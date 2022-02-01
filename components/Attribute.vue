<template>
    <div class="">
        <div class="flex flex-row bg-gray-100 rounded-2xl p-4">
            <div class="p-2">
                <h4 class="text-lg text-gray-600 font-semibold">{{ attribute.trait_type }}</h4>
                <h4 class="text-2xl text-gray-800 font-semibold">{{ attribute.value }}</h4>
                <h4 class="text-xl text-gray-800 font-semibold mt-1">{{ attributeCounts }} <a class="text-gray-600">ducks have this</a></h4>
            </div>
            <div class="bg-gray-100 h-44 ml-auto">
                <img :src="require('@/assets/images/attributes/'+attributeString+'.png')" class="p-2 mx-auto object-center object-scale-down h-44 w-44"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        attributeString () {
            return this.attribute.value.split(' ').join('_')
        },
        attributeCounts () {
            let allCounts = this.$store.state.ducks.attributeCounts
            let allAttributes = {...allCounts.bases, ...allCounts.beaks, ...allCounts.eyes, ...allCounts.outfits, ...allCounts.hats}
            return allAttributes[this.attribute.value]
        }
    },
    props: {
        attribute: {
            type: Object
        }
    },
    beforeMount () {
        if (this.$store.state.ducks.attributeCounts.bases === undefined) this.$store.dispatch('ducks/getAttributeCounts')
    }
}
</script>

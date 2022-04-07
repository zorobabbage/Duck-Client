<template>
    <div class="px-10 py-8 rounded-3xl bg-grass-card-900">
        <div class="grid grid-cols-2">
            <div>
                <h4 class="text-2xl font-medium">{{ percentageSold }}%</h4>
                <div class="pt-1 mt-auto align-bottom">
                    <div class="flex overflow-hidden mb-4 h-3 text-xs bg-gray-200 rounded-full border-black border-1">
                        <div :style="{'width': percentageSold + '%'}" class="flex flex-col justify-center text-center text-white whitespace-nowrap bg-black rounded-full shadow-none"></div>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-5xl font-medium text-right">{{currentDuck}}</h2>
                <a class="text-lg font-normal text-right">out of 8192</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentDuck: {
            type: Number
        }
    },
    computed: {
        percentageSold () {
            return ((this.currentDuck / 8192) * 100).toFixed(2)
        }
    }
}
</script>

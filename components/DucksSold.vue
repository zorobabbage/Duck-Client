<template>
    <div class="bg-grass-foreground px-10 py-8 rounded-3xl">
        <div class="grid grid-cols-2">
            <div>
                <h4 class="text-2xl font-medium">{{ percentageSold }}%</h4>
                <div class=" pt-1 align-bottom mt-auto">
                    <div class="overflow-hidden h-3 mb-4 text-xs flex rounded-full border-1 border-black bg-gray-200">
                        <div :style="{'width': percentageSold + '%'}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black rounded-full"></div>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-5xl font-medium text-right">{{currentDuck}}</h2>
                <h4 class="text-lg font-normal text-right">out of 8192</h4>
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

<template>
    <div>
        <div class="hidden overflow-x-hidden mx-auto bg-indigo-700 md:flex">
                <div class="self-center py-2 mx-auto whitespace-nowrap">
                    <span class="mr-1 text-indigo-50 text-md" v-for="word in text"  :key="word" > 
                        {{ word }}
                    </span>
                </div>
        </div>
        <div class="flex overflow-x-hidden relative mx-auto bg-indigo-700 md:hidden px-auto pause-animations-on-children-on-hover">
                <div class="py-2 whitespace-nowrap animate-marquee">
                    <span class="mr-1 text-indigo-50 text-md" v-for="word in text"  :key="word" > 
                        {{ word }}
                    </span>
                </div>

                <div class="absolute top-0 py-2 whitespace-nowrap animate-marquee2">
                    <span class="mr-1 text-indigo-50 text-md" v-for="word in text"  :key="word" > 
                        {{ word }}
                    </span>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            now: new Date(),
            text: []
        }
    },
    mounted: function () {
        window.setInterval(() => {
            this.setText()
        }, 1000)
    },
    methods: {
        getDiffString (distance) {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return `${days}d ${hours}h ${minutes}m ${seconds}s`
        },
        setText () {
            let start = new Date(1649980800 * 1000)
            let end = new Date(1650240000 * 1000)
            let current = new Date()
        
            let text
            if (current < start) {
                const countdown = this.getDiffString(start-current)
                text = `Buy one get one free weekend starting in ${countdown}`
            } else if (current >= start && current < end) {
                const countdown = this.getDiffString(end-current)
                text = `Buy one get one free weekend ending in ${countdown}`
            } else {
                text = `Somethings brewing...`
            }

            text += '.'
            this.text = text.split(' ')
        }
    },
    computed: {
        
    }
}
</script>

<style scoped>
.pause-animations-on-children-on-hover:hover * {
  animation-play-state: paused;
}
</style>

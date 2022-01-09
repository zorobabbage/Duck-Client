<template>
    <ul class="fixed z-50 w-full p-0 pl-6 m-0 list-none md:w-auto top-6 right-8">
        <transition-group :name="transitionName" :mode="transitionMode">
            <ToastItem v-for="item in toast" v-bind:key="item.id" />
        </transition-group>
    </ul>
</template>

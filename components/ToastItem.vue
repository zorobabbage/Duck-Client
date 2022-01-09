<script>
  function close() {
    item.remove()
    item.callback && item.callback()
  }
</script>

<template>
    <div
    class="w-full space-x-5 min-h-[5.5rem] m-5 p-0 flex relative rounded-lg shadow-md overflow-hidden items-center will-change-transform bg-gray-900 md:w-96"
    >
    <div class="w-5 min-h-[5.5rem] {item.type}" />
    <div class="flex-auto text-white">
        <h6 class="capitalize">{{item.type}}</h6>
        {{item.message}}
    </div>
    <div
        class="self-start pt-2 pr-2 text-white"
        role="button"
        tabindex="-1"
        on:click={close}
    >
        <div class="bg-black p-2.5 py-1 rounded-lg">✕</div>
    </div>
    </div>
</template>

<style type="text/scss">
  .success {
    background-color: #64b886;
  }
  .error {
    background-color: #d87070;
  }
  .warning {
    background-color: #d8a270;
  }
  .info {
    background-color: #709ad8;
  }
</style>
<template>
  <section class="flex flex-col items-center">
    <H2 class="text-center max-w-lg xl:max-w-2xl 2xl:max-w-4xl">
      Yes we are incredibly retarded, here are some newly minted ducks:
    </H2>
    <div class="flex flex-col items-center lg:flex-row lg:justify-center">
      <img
        v-for="n in 5"
        :key="n"
        src="~/assets/images/unkown-duck.png"
        alt="Unkown duck"
        class="lg:w-48 xl:w-64 2xl:w-80"
      >
    </div>
    <Link href="#" class="mt-8">
      Show me some more duckies please
    </Link>
  </section>
</template>

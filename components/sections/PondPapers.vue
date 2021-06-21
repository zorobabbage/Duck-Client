<template>
  <section class="flex flex-col items-center justify-center">
    <H2>Papers</H2>
    <div
      class="flex flex-col items-center w-full max-w-screen-2xl mt-16 lg:flex-row lg:justify-evenly"
    >
      <div class="flex flex-col justify-center items-center lg:w-1/3">
        <Link target="_blank" href="papers/DUCK - Pondpaper.pdf">
          <H2>NFDs</H2>
        </Link>
        <Link class="mt-8" target="_blank" href="papers/DUCK - NFTDeployer.pdf">
          <H2>NFT Deployer</H2>
        </Link>
      </div>
      <img
        src="~/assets/images/duck-reading.png"
        alt="Duck holding and reading a piece of paper"
        class="my-16 lg:my-0 lg:w-1/3"
      >
      <div class="flex flex-col justify-center items-center lg:w-1/3">
        <Link target="_blank" href="papers/DUCK - Widepaper.pdf">
          <H2>Widepaper</H2>
        </Link>
      </div>
    </div>
  </section>
</template>

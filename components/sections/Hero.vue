<template>
  <section class="flex flex-col items-center lg:flex-row lg:justify-center">
    <div class="m-4 flex flex-col lg:w-1/2">
      <H1 class="text-duck-gradient">
        Duck
      </H1>
      <H2>Disrupt, Buidl, Scale.</H2>
      <P class="mt-4">
        We are a self-funded, agile team of individuals that aim to create an
        engaging and valuable suite of tools for the
        <span class="text-zilliqa">Zilliqa</span> ecosystem. In this quarter, we
        have developed in-house designed NFTs and participated in a
        <Link
          href="https://gitcoin.co/hackathon/zilliqa-nfts/?"
          target="_blank"
        >
          Zilliqa hackathon.
        </Link>
      </P>

      <button
        class="text-l p-4 font-bold bg-duck-yellow rounded-md mt-4 w-56 lg:self-end xl:text-xl xl:w-64 2xl:text-2xl 2xl:w-80"
      >
        <a href="/#countdown">Dapp launching soon</a>
      </button>
    </div>
    <img
      src="~/assets/images/computer-duck.png"
      alt="Duck with glasses sitting by a computer"
      class="lg:w-1/2"
    >
  </section>
</template>

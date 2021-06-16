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

      <CallToAction />
    </div>
    <img
      src="~/assets/images/computer-duck.png"
      alt="Duck with glasses sitting by a computer"
      class="lg:w-1/2"
    >
  </section>
</template>

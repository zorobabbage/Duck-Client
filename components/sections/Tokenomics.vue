<template>
  <section class="flex flex-col lg:flex-row lg:items-center lg:justify-evenly">
    <article
      class="flex flex-col lg:w-1/2  lg:rounded-3xl lg:p-16 lg:bg-blue-100 lg:max-w-screen-lg 2xl:w-4/12"
    >
      <H2>Tokenomics</H2>
      <P class="mt-8">
        <Link href="https://zilstream.com/tokens/duck" target="_blank">
          $DUCK
        </Link>
        has a total supply of 420.69, with a circulating supply of 305.
      </P>
      <P class="mt-8">
        The
        <Link
          target="_blank"
          href="https://viewblock.io/zilliqa/address/zil14jct2x5nw73rnwdy8g0kjs99k8z29mu0eccspg"
        >
          community wallet
        </Link>
        holds a majority of the non-circulating supply. The purpose of the
        community wallet is to actively engage and compensate members of the
        Zilliqa ecosystem through airdrops, LP rewards and giveaways.
      </P>
      <P class="mt-8">
        The team collectively holds around 10 $DUCK; the majority of which is
        pooled. Through successfully executed projects five percent of the funds
        go to $DUCK buy back.
      </P>
    </article>
    <div
      class="flex flex-col items-center lg:w-1/2 lg:flex-row  lg:max-w-screen-lg lg:justify-evenly 2xl:w-8/12"
    >
      <TokenomicsDuck
        img="duck-egg-feet.png"
        alt="Duck cracking its legs out of the egg"
      >
        Initial supply<br>
        420.69
      </TokenomicsDuck>
      <TokenomicsDuck
        class="mt-16 lg:mt-0"
        img="duck-egg-crack.png"
        alt="Duck cracking the top of the egg"
      >
        Max supply<br>
        391
      </TokenomicsDuck>
      <TokenomicsDuck
        class="mt-16 lg:mt-0"
        img="duck-egg-head.png"
        alt="Duck cracking its head out of the egg"
      >
        Circulating supply<br>
        315
      </TokenomicsDuck>
    </div>
  </section>
</template>

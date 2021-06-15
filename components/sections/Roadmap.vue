<template>
  <section class="flex flex-col items-center justify-center">
    <H2>Roadmap</H2>
    <div class="w-full flex flex-col justify-evenly mt-16 lg:flex-row">
      <RoadmapDuck img="standing-duck.png" alt="Duck walking">
        <template slot="title">
          Q1
        </template>
        <template slot="items">
          <P>Token mint</P>
        </template>
      </RoadmapDuck>
      <RoadmapDuck
        img="running-duck-1.png"
        alt="Duck walking"
        class="mt-8 lg:mt-0"
      >
        <template slot="title">
          Q2
        </template>
        <template slot="items">
          <P>NFDs</P>
          <P>Duck Sniper</P>
          <P>Governance</P>
          <P>NFD Platform</P>
        </template>
      </RoadmapDuck>
      <RoadmapDuck
        img="running-duck-2.png"
        alt="Duck starting to sprint"
        class="mt-8 lg:mt-0"
      >
        <template slot="title">
          Q3
        </template>
        <template slot="items">
          <P>Merch</P>
          <P>ZilLotto</P>
          <P>Hatchling Charts</P>
        </template>
      </RoadmapDuck>
      <RoadmapDuck
        img="running-duck-3.png"
        alt="Duck starting to sprint"
        class="mt-8 lg:mt-0"
      >
        <template slot="title">
          Q4
        </template>
        <template slot="items">
          <P>Limit Orders</P>
          <P>Deep Duck Render</P>
        </template>
      </RoadmapDuck>
    </div>
  </section>
</template>

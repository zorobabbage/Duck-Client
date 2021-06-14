<template>
  <section class="flex flex-col w-full justify-evenly lg:flex-row">
    <RoadmapDuck img="standing-duck.png" alt="Duck walking">
      <template slot="title">
        Q1
      </template>
      <template slot="items">
        <P>Token mint</P>
      </template>
    </RoadmapDuck>
    <RoadmapDuck img="running-duck-1.png" alt="Duck walking" class="mt-8 lg:mt-0">
      <template slot="title">
        Q2
      </template>
      <template slot="items">
        <P>NFDs</P>
        <P>NFD Platform</P>
        <P>Governance</P>
        <P>Duck Sniper</P>
      </template>
    </RoadmapDuck>
    <RoadmapDuck img="running-duck-2.png" alt="Duck starting to sprint" class="mt-8 lg:mt-0">
      <template slot="title">
        Q3
      </template>
      <template slot="items">
        <P>Hatchling Charts</P>
        <P>Merch</P>
        <P>ZilLotto</P>
      </template>
    </RoadmapDuck>
    <RoadmapDuck img="running-duck-3.png" alt="Duck starting to sprint" class="mt-8 lg:mt-0">
      <template slot="title">
        Q4
      </template>
      <template slot="items">
        <P>Deep Duck Render</P>
        <P>Limit Orders</P>
      </template>
    </RoadmapDuck>
  </section>
</template>

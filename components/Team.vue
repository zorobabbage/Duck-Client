<template>
  <section class="">
    <div class="text-center pb-12">
      <h1
        class="
          font-bold
          text-3xl
          md:text-4xl
          lg:text-5xl
          font-heading
          text-gray-900
        "
      >
        Meet the team
      </h1>
    </div>
    <div
      class="
        grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
    >
      <TeamMember name="Nines" twitter="CryptoNines" :id="8" role="Developer" />

      <TeamMember
        name="Neeko"
        twitter="neeko_zilduck"
        :id="2374"
        role="Developer"
      />

      <TeamMember
        name="Buckaroo"
        twitter="BuckaroniCheese"
        role="Lead Artist"
        :id="32"
      />

      <TeamMember
        name="GreenWeeny"
        twitter="0x_Greeny"
        :id="1"
        role="Marketing"
      />

      <TeamMember 
        name="Rich" 
        :id="280" 
        role="Developer" 
      />

      <TeamMember 
        name="Prodpeak" 
        role="Developer" 
        :id="3074"
      />

      <TeamMember 
        name="50Cal" 
        role="Designer" 
        :id="3115"
      />

      <TeamMember 
        name="nicfusc" 
        role="Developer" 
        :id="3945" 
      />

    </div>
  </section>
</template>

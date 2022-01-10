<template>
  <div>
    <span>{{perso.name}} - </span>
    <span>lvl {{perso.level}}</span>
    <div>
      <!-- add a picture -->
      <span>{{perso.life}} / {{perso.vitality}} ❤️</span>

      <span>{{perso.strength}} 💪</span>
      <span>{{perso.armor}}🛡️</span>
      <span>{{perso.gold}}🪙</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "PersoCaracs",
  props: {
    perso: Object
  }
}
</script>

<style scoped>

</style>
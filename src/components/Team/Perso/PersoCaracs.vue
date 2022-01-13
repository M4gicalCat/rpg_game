<template>
  <div id="perso-caracs">
    <div id="head">
      <span id="name">{{perso.name}}</span>
      <span id="level">lvl {{perso.level}}</span>
    </div>
    <div id="body">
      <!-- add a picture -->
      <span id="life">{{perso.life}} / {{perso.vitality}} ❤️</span>
      <span id="strength">{{perso.strength}} 💪</span>
      <span id="armor">{{perso.armor}}🛡️</span>
      <span id="gold">{{perso.gold}}🪙</span>
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
#perso-caracs {
  height: 200px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}
#perso-caracs > * {
  padding: 1em;
  background: #FF754422;
}
#head {
  width: min(200px, 100%);
  display: flex;
  justify-content: space-between;
}
#name {
  font-weight: bold;
}
#body {
  width: min(200px, 100%);
  display: flex;
  flex-direction: column;
}
#body > * {
  align-self: center;
}

</style>
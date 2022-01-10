<template>
  <div id="team">
    <perso-selector
      :persos="players"
      @perso="$emit('perso', $event)"
    />

    <perso
      :perso="player"
      :shop="shop"
      :item-to-buy="itemToBuy"
      @undefine-item="$emit('undefine-item')"

    />

  </div>
</template>

<script lang="ts">
import PersoSelector from "@/components/Team/PersoSelector.vue";
import Perso from "@/components/Team/Perso/Perso.vue";
export default {
  name: "Team",
  components: {Perso, PersoSelector},
  props: {
    player: Object,
    players: Array,
    shop: Object,
    itemToBuy: Object
  }
}
</script>

<style scoped>
#team {
  grid-column-start: 1;
  grid-column-end: 2;
}
</style>
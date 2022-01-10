<template>
  <div>
    <perso-caracs
      :perso="perso"
    />
    <perso-slots
      :perso="perso"
    />
    <perso-ops
      :perso="perso"
      :shop="shop"
      :itemToBuy="itemToBuy"
      @undefine-item="$emit('undefine-item')"
    />
  </div>
</template>

<script lang="ts">
import PersoCaracs from "@/components/Team/Perso/PersoCaracs.vue";
import PersoSlots from "@/components/Team/Perso/PersoSlots.vue";
import PersoOps from "@/components/Team/Perso/PersoOps.vue";
export default {
  name: "Perso",
  components: {
    PersoOps,
    PersoSlots,
    PersoCaracs
  },
  props: {
    perso: Object,
    shop: Object,
    itemToBuy: Object
  },
  emits: ["undefine-item"],
}
</script>

<style scoped>

</style>
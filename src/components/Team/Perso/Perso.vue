<template>
  <div>
    <perso-caracs
      :perso="perso"
    />
    <perso-slots
      :perso="perso"
      @slot="this.slot=$event;"
      @item="this.currentObject=$event"
    />
    <perso-ops
      :perso="perso"
      :bought-item="currentObject"
      :shop="shop"
      :itemToBuy="itemToBuy"
      :assignedSlot="slot"
      @undefine-item="$emit('undefine-item')"
    />
  </div>
</template>

<script lang="ts">
import PersoCaracs from "@/components/Team/Perso/PersoCaracs.vue";
import PersoSlots from "@/components/Team/Perso/PersoSlots.vue";
import PersoOps from "@/components/Team/Perso/PersoOps.vue";
import Item from "@/Entities/Item";
import Slot from "@/Entities/Slot";
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
  data: () :{currentObject: Item, slot: Slot} => {
    return {
      currentObject: undefined as unknown as Item,
      slot: undefined as unknown as Slot
    }
  }
}
</script>

<style scoped>

</style>
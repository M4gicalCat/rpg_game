<template>
  <div>
    <shop-ops
        v-if="shop!==undefined && itemToBuy!==undefined"
        :item="itemToBuy"
        @buy="perso.buy($event, shop); $emit('undefine-item')"
    />
  </div>
</template>

<script>
import ShopOps from "@/components/Team/Perso/ShopOps";
export default {
  name: "PersoOps",
  components: {ShopOps},
  props: {
    perso: Object,
    shop: Object,
    itemToBuy: Object,
  },
  emits: ["undefine-item"]
}
</script>

<style scoped>

</style>
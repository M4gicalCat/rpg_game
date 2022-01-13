<template>
  <div>
    <shop-ops
        v-if="shop!==undefined && (itemToBuy!==undefined || itemToOrder !== undefined)"
        :item-to-buy="itemToBuy"
        :item-to-order="itemToOrder"
        @order="shop.order(shop.itemOrder.indexOf($event)); $emit('undefine-item')"
        @buy="perso.buy($event, shop); $emit('undefine-item')"
    />
  </div>
</template>

<script lang="ts">
import ShopOps from "@/components/Team/Perso/ShopOps.vue";
export default {
  name: "PersoOps",
  components: {ShopOps},
  props: {
    perso: Object,
    shop: Object,
    itemToBuy: Object,
    itemToOrder: Object
  },
  emits: ["undefine-item"]
}
</script>

<style scoped>

</style>
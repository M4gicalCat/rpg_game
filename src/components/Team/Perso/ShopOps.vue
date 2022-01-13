<template>
  <div>
    <span v-if="itemToBuy!==undefined">{{ itemToBuy.name }} : {{itemToBuy.price}}🪙</span>
    <button v-if="itemToBuy!==undefined" @click="$emit('buy', itemToBuy)">Buy</button>
    <span v-if="itemToOrder!==undefined">{{itemToOrder.name}} : {{itemToOrder.price}}</span>
    <button v-if="itemToOrder!==undefined" @click="$emit('order', itemToOrder)">Order</button>
  </div>

</template>

<script>
export default {
  name: "ShopOps",
  props: {
    itemToBuy: Object,
    itemToOrder: Object
  },
  emits: ['buy', 'order']
}
</script>

<style scoped>

</style>
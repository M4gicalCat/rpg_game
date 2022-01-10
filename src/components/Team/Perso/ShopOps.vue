<template>
  <div>
    <span>{{ item.name }} : {{item.price}}🪙</span>
    <button @click="$emit('buy', item)">Buy</button>
  </div>

</template>

<script>
export default {
  name: "ShopOps",
  props: {
    item: Object
  },
  emits: ['buy']
}
</script>

<style scoped>

</style>
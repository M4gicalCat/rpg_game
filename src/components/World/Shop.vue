<template>
  <div id="shop">
    <div id="stock">
      <table>
        <thead>
        <tr>
          <th>Item name</th> <th>Item price</th> <th>Item category</th>
        </tr>
        </thead>
        <tbody>
        <tr :key="item" v-for="item in shop.itemStock" @click="$emit('item', item)" class="buy-item">
          <td>{{item.name}}</td><td>{{item.price}}</td><td>{{item.category}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div id="order"></div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  props: {
    shop: Object
  },
  emits: ['item']
}
</script>

<style scoped>
.buy-item {
  cursor: pointer;
}
</style>
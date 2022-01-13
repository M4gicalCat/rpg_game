<template>
  <div id="shop">
    <div>
      <h1>Buy</h1>
      <div id="stock">
      <table>
        <thead>
        <tr>
          <th>Name</th> <th>Price</th> <th>Category</th>
        </tr>
        </thead>
        <tbody>
        <tr :key="item" v-for="item in shop.itemStock" @click="$emit('item', item)" class="buy-item">
          <td>{{item.name}}</td><td>{{item.price}}</td><td>{{item.category}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    </div>
    <div>
      <h1>Order</h1>
      <div id="order">
      <table>
        <thead>
        <tr>
          <th>Item</th> <th>Price</th> <th>Category</th>
        </tr>
        </thead>
        <tbody>
        <tr :key="i" v-for="i in shop.itemOrder" @click="$emit('itemOrder', i);">
          <td>{{i.name}}</td><td>{{i.price}}</td><td>{{i.category}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  props: {
    shop: Object
  },
  emits: ['item', 'itemOrder']
}
</script>

<style scoped>
.buy-item {
  cursor: pointer;
}

#shop {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
<template>
  <select v-model="id">
    <option :key="shop.id" :value="shop.id" v-for="shop in shops" v-bind="shop.id">{{shop.msg}}</option>
  </select>
</template>

<script lang="ts">
export default {
  name: "ShopSelector",
  props: {
    shops: Array
  },
  data: (): { id: number; } => ({
  id: 0
}),
    emits: ["shop"],
    watch: {
  id(): void {
    console.log(this.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.$emit("shop", this.id);
  }
}
}
</script>

<style scoped>

</style>
<template>
  <select v-model="id">
    <option :key="town.id" :value="town.id" v-for="town in towns" v-bind="town.id">{{town.msg}}</option>
  </select>
</template>

<script lang="ts">

export default {
  name: "TownSelector",
  props: {
    towns: Array
  },
  data: (): { id: number; } => ({
    id: 0
  }),
  emits: ["town"],
  watch: {
    id(): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.$emit("town", this.id);
    }
  }
};
</script>

<style scoped>

</style>
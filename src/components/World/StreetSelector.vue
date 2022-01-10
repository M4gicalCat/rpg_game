<template>
  <select v-model="id">
    <option :key="street.id" :value="street.id" v-for="street in streets" v-bind="street.id">{{street.msg}}</option>
  </select>
</template>

<script lang="ts">
export default {
  name: "StreetSelector",
  props: {
    streets: Array
  },
  data: (): { id: number; } => ({
    id: 0
  }),
  emits: ["street"],
  watch: {
    id(): void {
      console.log(this.id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.$emit("street", this.id);
    }
  }
}
</script>

<style scoped>

</style>
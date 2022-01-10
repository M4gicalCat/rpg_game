<template>
  <select v-model="id">
    <option :key="perso.id" :value="perso.id" v-for="perso in persos" v-bind="perso.id">{{perso.msg}}</option>
  </select>
</template>

<script lang="ts">

export default {
  name: "PersoSelector",
  props: {
    persos: Array,
  },
  data: (): {id: number} => {
    return {
      id: 1
    }
  },
  emits: ["perso"],
  watch: {
    id(): void {
      console.log(this.id);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$emit("perso", this.id);
    }
  }
}
</script>

<style scoped>

</style>
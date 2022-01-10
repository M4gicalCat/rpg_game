<template>
  <div>

    <!-- affichage des slots -->

    <div>
      <span class="slot-name">Slots</span><span class="slot-items">Items</span>
      <div v-for="s in perso.slots" :key="s.id" class="slots">
        <span @click="assignedSlot=s" class="pointer slot-name">{{ s.name }}</span>
        <div v-if="s.items.length === 0" class="slot-items">empty</div>
        <div v-else v-for="i in s.items" :key="i.id" class="slot-items" @click="item=i">
          <span>{{ i.name }}</span>
          <span>{{ i.category }}</span>
        </div>
      </div>
    </div>

    <!-- affichage des items achetés -->

    <div @click="assignedSlot=undefined">
      <span>Bought items</span>
      <table>
        <thead>
          <tr>
            <th>Item</th> <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in perso.boughtItems" :key="i.id"  @click="item=i" class="pointer">
            <td>{{i.name}}</td><td>{{i.category}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <bag-ops
      :perso="perso"
      :item="item"
      :assignedSlot="assignedSlot"
      @item-undefined="item=undefined;"
  />
</template>

<script lang="ts">
import BagOps from "@/components/Team/Perso/BagOps.vue";
import Item from "@/Entities/Item";
import Slot from "@/Entities/Slot";
export default {
  name: "PersoSlots",
  components: {BagOps},
  props: {
    perso: Object
  },
  data: () :{assignedSlot: Slot, item: Item} => {
    return {
      assignedSlot : undefined as unknown as Slot,
      item : undefined as unknown as Item,
    }
  }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px;
}

.slots {
  width: 500px;
  display: grid;
  grid-template-columns: auto 10px auto;
}

.slot-name {
  grid-column-start: 1;
  grid-column-end: 2;
}

.slot-items {
  grid-column-start: 3;
  grid-column-end: 4;
  text-align: left;
}

.pointer {
  cursor: pointer;
}
</style>
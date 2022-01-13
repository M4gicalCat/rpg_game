<template id="perso-slot">
  <div>

    <!-- affichage des slots -->

    <div>
      <div class="slots strong">
        <span class="slot-name">Slots</span><span class="slot-items">Items</span>
      </div>
      <div v-for="s in perso.slots" :key="s.id" class="slots bordered">
        <span @click="assignedSlot=s" class="pointer slot-name">{{ s.name }}</span>
        <div v-if="s.items.length === 0" class="slot-items bordered-left">empty</div>
        <div v-else v-for="i in s.items" :key="i.id" class="slot-items bordered-left" @click="item=i">
          <span>{{ i.name }}</span>
          <span>{{ i.category }}</span>
        </div>
      </div>
    </div>

    <!-- affichage des items achetés -->

    <div @click="assignedSlot=undefined">
      <table v-if="perso.boughtItems.length > 0">
        <caption class="strong">Bought Items</caption>
        <thead>
          <tr>
            <th>Item</th> <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in perso.boughtItems" :key="i.id"  @click="item=i" class="pointer">
            <td class="no-border-right">{{i.name}}</td><td class="no-border-left text-right">{{i.category}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <bag-ops
      :perso="perso"
      :item="item"
      :shop="shop"
      :assignedSlot="assignedSlot"
      @item="item=undefined"
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
    perso: Object,
    shop: Object
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
  grid-template-columns: 50% 50%;
}

.slot-name {
  grid-column-start: 1;
  grid-column-end: 2;
}

.slot-items {
  grid-column-start: 2;
  grid-column-end: 3;
  text-align: left;
}

.strong {
  font-weight: bold;
}

.bordered {
  border: 1px solid black;
}

.bordered > * {
  padding: 1em;
}

.bordered-left {
  border-left: 1px solid black;
}

.pointer {
  cursor: pointer;
}

.no-border-right {
  border-right: unset;
}

.no-border-left {
  border-left: unset;
}

.text-right {
  text-align: right;
}

#perso-slot > * {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
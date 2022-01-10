<template>
  <table>
    <thead>
      <tr>
        <th>slot</th> <th>item</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td v-if="assignedSlot!==undefined">{{assignedSlot.name}}</td><td v-else>Please select a slot</td>
      <td v-if="item!==undefined">{{item.name}}</td><td v-else>Please select an item</td>
    </tr>
    </tbody>
  </table>
  <button v-if="assignedSlot!==undefined && item!==undefined" @click="this.assign(item)">Assign</button>
  <span class="error" v-if="err !== undefined">{{err}}</span>
</template>

<script lang="ts">
import Item from "@/Entities/Item";
import Perso from "@/Entities/Perso";
import Slot from "@/Entities/Slot";

export default {
  name: "BagOps",
  props: {
    perso: Object as unknown as Perso,
    item: Object as unknown as Item,
    assignedSlot: Object as unknown as Slot
  },
  methods: {
    assign: function (item: Item): void {
      /*I love typescript (not here)*/
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.perso.assign(this.perso.boughtItems.indexOf(item), this.perso.slots.indexOf(this.assignedSlot));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.$emit('item-undefined');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.err=undefined;
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.err = e.message;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        setTimeout(function () {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          that.err = undefined;
        }, 10000);
      }
    }
  },
  data: (): { err: string; } => {
    return {
      err: undefined as unknown as string
    };
  }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px;
}

.error {
  color: red;
}
</style>
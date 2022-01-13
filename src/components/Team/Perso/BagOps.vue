<template>
  <table id="bag-ops">
    <thead>
      <tr>
        <th>slot</th> <th>item</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td v-if="assignedSlot!==undefined">{{assignedSlot.name}}</td><td v-else>Bought items</td>
      <td v-if="item!==undefined">{{item.name}}</td><td v-else>Please select an item</td>
    </tr>
    </tbody>
  </table>
  <button v-if="item!==undefined" @click="this.assign(item)">Assign</button>
  <span class="error" v-if="err !== undefined">{{err}}</span>
  <button v-if="shop !== undefined && item !== undefined" @click="sell()">Sell for {{price}}</button>
</template>

<script lang="ts">
/* eslint-disable */
import Item from "@/Entities/Item";
import Perso from "@/Entities/Perso";
import Slot from "@/Entities/Slot";
import Shop from "@/Entities/Shop";

export default {
  name: "BagOps",
  props: {
    perso: Object as unknown as Perso,
    item: Object as unknown as Item,
    assignedSlot: Object as unknown as Slot,
    shop: Object as unknown as Shop
  },
  methods: {
    assign: function (item: Item): void {
      /*I love typescript (not here)*/
      try {
        //@ts-ignore
        this.perso.assignAgain(item, this.assignedSlot ? this.perso.slots.indexOf(this.assignedSlot) : -1);
        // @ts-ignore
        this.err=undefined;
        return;
      } catch (e) {}
      try {
        //@ts-ignore
        this.perso.assign(this.perso.boughtItems.indexOf(item), this.perso.slots.indexOf(this.assignedSlot));
        //@ts-ignore
        this.err=undefined;
      } catch (e) {
        //@ts-ignore
        this.err = e.message;
        const that = this;
        setTimeout(function () {
          //@ts-ignore
          that.err = undefined;
        }, 10000);
      }
    },
    sell: function (): void {
      //@ts-ignore
      this.shop.buy(this.item);
      //@ts-ignore
      this.perso.sell(this.price, this.item);
      //@ts-ignore
      this.$emit('item');
    }
  },
  data: (): { err: string, price: number} => {
    return {
      err: undefined as unknown as string,
      price: undefined as unknown as number
    };
  },
  emits: ['item'],
  watch: {
    item() {
      //@ts-ignore
      if (this.item !== undefined && this.shop !== undefined) {
        //@ts-ignore
        this.price = this.shop.estimate(this.item);
      }
    },
    shop() {
      //@ts-ignore
      if (this.item !== undefined && this.shop !== undefined) {
        //@ts-ignore
        this.price = this.shop.estimate(this.item);
      }
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

.error {
  color: red;
}

#bag-ops {margin-top: 1em}
</style>
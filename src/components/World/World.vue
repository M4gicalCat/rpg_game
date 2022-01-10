<template>
  <div id="world">

    <h1 v-if="currentTown !== undefined">Welcome to {{currentTown.name}}</h1>

    <town-selector
        :towns="towns"
        @town="$emit('town', $event)"/>

    <h1 v-if="currentStreet !== undefined">Welcome to {{currentStreet.name}}</h1>

    <street-selector
        v-if="currentTown !== undefined"
        :streets="currentTown.streets.map(s => {return {id: s.id, msg: `${s.name} : ${s.shops.length} shops`}})"
        @street="$emit('street', $event)"
    />

    <shop-selector
        v-if="currentStreet !== undefined"
        :shops="currentStreet.shops.map(s => {return {id: s.id, msg: `Shop ${s.name}`}})"
        @shop="$emit('shop', $event)"
    />

    <shop
        v-if="currentShop !== undefined"
        :shop="currentShop"
        @item="$emit('item', $event)"
    />

  </div>
</template>

<script>
import TownSelector from "@/components/World/TownSelector";
import StreetSelector from "@/components/World/StreetSelector";
import ShopSelector from "@/components/World/ShopSelector";
import Shop from "@/components/World/Shop";

export default {
  name: "World",
  props: {
    towns: Array,
    currentTown: Object,
    currentStreet: Object,
    currentShop: Object
  },
  components: {
    Shop,
    StreetSelector,
    TownSelector,
    ShopSelector
  },
  emits: ['item', 'shop', 'street', 'town']
}
</script>

<style scoped>
#world {
  grid-column-start: 2;
  grid-column-end: 3;
}
</style>
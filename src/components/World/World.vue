<template>
  <div id="world">

    <h1 v-if="currentTown !== undefined">Welcome to {{currentTown.name}}</h1><h1 v-else>Select a town</h1>

    <town-selector
        :towns="towns"
        @town="$emit('town', $event)"/>

    <h1 v-if="currentStreet !== undefined">Welcome to {{currentStreet.name}}</h1><h1 v-else-if="currentTown!==undefined">Select a street</h1>

    <street-selector
        v-if="currentTown !== undefined"
        :streets="currentTown.streets.map(s => {return {id: s.id, msg: `${s.name} : ${s.shops.length} shops`}})"
        @street="$emit('street', $event)"
    />

    <h1 v-if="currentShop !== undefined">Welcome to {{currentShop.name}}</h1><h1 v-else-if="currentStreet!==undefined">Select a shop</h1>

    <shop-selector
        v-if="currentStreet !== undefined"
        :shops="currentStreet.shops.map(s => {return {id: s.id, msg: `Shop ${s.name}`}})"
        @shop="$emit('shop', $event)"
    />

    <shop
        v-if="currentShop !== undefined"
        :shop="currentShop"
        @item="$emit('item', $event)"
        @itemOrder="$emit('itemOrder', $event)"
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
  emits: ['item', 'shop', 'street', 'town', 'itemOrder']
}
</script>

<style scoped>
#world {
  grid-column-start: 2;
  grid-column-end: 3;
}
</style>
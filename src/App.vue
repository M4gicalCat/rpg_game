<template id="app">
  <team
      :player="currentPerso"
      :players="team.map(p => {return {id: p.id, msg: `${p.name} - lvl ${p.level} - gold ${p.gold}`}})"
      :shop="currentShop"
      :itemToBuy="itemToBuy"
      :itemToOrder="itemToOrder"
      @perso="currentPerso = team.filter(p => p.id === $event)[0];"
      @undefine-item="this.itemToBuy=undefined;this.itemToOrder=undefined"
  />
  <world
      :towns="towns.map(town => {return {id: town.id, msg: `${town.name} : ${town.streets.length} streets`}})"
      :current-town="currentTown" :current-street="currentStreet" :current-shop="currentShop"
      @town="currentTown = this.towns.filter(t => t.id === $event)[0]; currentStreet=undefined; currentShop=undefined;"
      @street="currentStreet=currentTown.streets.filter(s => s.id === $event)[0]; currentShop=undefined;"
      @shop="currentShop=currentStreet.shops.filter(s => s.id === $event)[0];"
      @item="itemToBuy=$event"
      @itemOrder="itemToOrder=$event"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import World from "@/components/World/World.vue";
import {team, towns} from "@/model";
import Town from "@/Entities/Town";
import Street from "@/Entities/Street";
import Shop from "@/Entities/Shop";
import Team from "@/components/Team/Team.vue";
import Item from "@/Entities/Item";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const music = require("/public/music.mp3");
const audio = new Audio(music);

document.onclick = () => {
  if (
      audio.currentTime > 0
      && !audio.paused
      && !audio.ended
      && audio.readyState > 2
  ) return;
  audio.play();
}
@Options({
  components: {
    Team,
    World
  },
  data: () => {
    return {
      team,
      towns,
      currentPerso: team[0],
      currentTown: undefined as unknown as Town,
      currentStreet: undefined as unknown as Street,
      currentShop: undefined as unknown as Shop,
      itemToBuy: undefined as unknown as Item,
      itemToOrder: undefined as unknown as Item
    };
  }
})
export default class App extends Vue {}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}

#app {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 50% 50%;
}

select {
  padding: 0.5em;
}
</style>

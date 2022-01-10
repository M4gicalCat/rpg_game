import {Type} from "@/Entities/Type";
import Item from "@/Entities/Item";
import Town from "@/Entities/Town";
//https://simplemaps.com/data/fr-cities
import cities from '../public/cities.json';
//https://getfakedata.com/address/fake-street-generator/fr_FR
import street_names from "../public/streets.json";
//http://names.drycodes.com/100
import shop_names from "../public/shops.json";
//https://github.com/dominictarr/random-name/blob/master/names.json
import names from "../public/names.json";
import Street from "@/Entities/Street";
import Shop from "@/Entities/Shop";
import Perso from "@/Entities/Perso";


const itemLimits = [
    {slot: "head", limit: 1, types: [Type.HELMET, Type.CROWN]},
    {slot: "body", limit: 1, types: [Type.ARMOR, Type.CLOTHES]},
    {slot: "hands", limit: 2, types: [Type.WEAPON, Type.LIGHTER]},
    {slot: "belt", limit: 3, types: [Type.WEAPON, Type.PURSE]},
    {
        slot: "bag",
        limit: 10,
        types: [Type.HELMET, Type.CROWN, Type.CLOTHES, Type.LIGHTER, Type.POTION, Type.SPELL, Type.FOOD, Type.PURSE]
    },
];

const items = [
    new Item('conic helmet', Type.HELMET, 200, 'A+10'),
    new Item('great crown of apologia', Type.CROWN, 200, 'A+20'),
    new Item('band of joy', Type.CROWN, 100, 'L+10'),
    new Item('leather armor', Type.ARMOR, 100, 'A+10'),
    new Item('broigne', Type.ARMOR, 200, 'A+20'),
    new Item('hauberk', Type.ARMOR, 500, 'A+40'),
    new Item('plate armor', Type.ARMOR, 1000, 'A+60'),
    new Item('tuxedo', Type.CLOTHES, 600, 'L+1'),
    new Item('cursed swimsuit', Type.CLOTHES, 10, 'A-10'),
    new Item('unicorn cosplay', Type.CLOTHES, 200, 'L+10'),
    new Item('dagger', Type.WEAPON, 100, 'S+5'),
    new Item('cursed dagger', Type.WEAPON, 100, 'S-5'),
    new Item('short sword', Type.WEAPON, 200, 'S+10'),
    new Item('cursed short sword', Type.WEAPON, 200, 'S-10'),
    new Item('long sword', Type.WEAPON, 300, 'S+20'),
    new Item('cursed long sword', Type.WEAPON, 300, 'S-20'),
    new Item('axe', Type.WEAPON, 100, 'S+10'),
    new Item('cursed axe', Type.WEAPON, 100, 'S-10'),
    new Item('great axe', Type.WEAPON, 200, 'S+20'),
    new Item('cursed great axe', Type.WEAPON, 200, 'S-20'),
    new Item('torch', Type.LIGHTER, 2, ''),
    new Item('oil lamp', Type.LIGHTER, 10, ''),
    new Item('leather purse', Type.PURSE, 10, ''),
    new Item('protection potion', Type.POTION, 100, 'a+10'),
    new Item('health potion', Type.POTION, 100, 'l+10'),
    new Item('strength potion', Type.POTION, 100, 's+10'),
    new Item('fireball', Type.SPELL, 1000, ''),
    new Item('ice cone', Type.SPELL, 1000, ''),
    new Item('total healing', Type.SPELL, 1000, ''),
    new Item('invisibility', Type.SPELL, 1000, ''),
    new Item('levitation', Type.SPELL, 1000, ''),
    new Item('apple', Type.FOOD, 1, 'l+1'),
    new Item('chicken', Type.FOOD, 10, 'l+5'),
    new Item('beef', Type.FOOD, 15, 'l+10'),
    new Item('wine', Type.FOOD, 2, 'l+2')
];

const towns: Town[] = [];

const nbVilles = Math.floor(Math.random() * 12 + 3);
for (let i = 0; i < nbVilles; i++) {
    towns.push(new Town(cities[Math.floor(Math.random() * cities.length)].city));
}

towns.sort((t1, t2) => {
    return ([t1.name, t2.name].sort()[0] === t1.name) ? -1 : 1;
});

towns.forEach(function (town: Town) {
    const r = Math.random() * 4 + 1;
    for (let i = 0; i < r; i++) {
        town.addStreet(new Street(street_names[Math.floor(Math.random() * street_names.length)]));
    }

    town.streets.sort((s1, s2) => {
        return ([s1.name, s2.name].sort()[0] === s1.name) ? -1 : 1;
    });

    town.streets.forEach(function (s) {
        const r = Math.random() * 3 + 1;
        for (let i = 0; i < r; i++) {
            const types: Type[] = [];
            //2 to 6 different types
            const nbTypes = Math.floor(Math.random() * 4 + 2);
            const t: Type[] = [];
            for (let a = 0; a < 10; a++)
                t.push(a);
            for (let j = 0; j < nbTypes; j++) {
                types.push(t.splice(Math.floor(Math.random() * t.length), 1)[0]);
            }
            s.addShop(new Shop(shop_names[Math.floor(Math.random() * shop_names.length)].split('_').join(" "), types));

            s.shops.sort((s1, s2) => {
                return ([s1.name, s2.name].sort()[0] === s1.name) ? -1 : 1;
            });
        }
    });
});

const team: Perso[] = [];
const r = Math.random() * 7 + 3;
for (let i = 0; i < r; i++) {
    team.push(new Perso(names[Math.floor(Math.random() * names.length)], Math.floor(Math.random() * 150 + 1)));
}
team.sort();

export {itemLimits, items, towns, team};
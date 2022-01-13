import Slot from "@/Entities/Slot";
import Item from "@/Entities/Item";
import {itemLimits} from "@/model";
import {Type} from "@/Entities/Type";
import Shop from "@/Entities/Shop";

export default class Perso {
    private static counter = 0;
    private readonly _id: number;
    private _name: string;
    private _level: number;
    private _vitality: number;
    private _life: number;
    private _strength: number;
    private _armor: number;
    private _gold: number;
    private _slots: Slot[];
    private _boughtItems: Item[];

    constructor(name: string, level: number) {
        Perso.counter ++;
        this._id = Perso.counter;
        this._name = name;
        this._level = level;
        this._vitality = 50 * level;
        this._life = this._vitality;
        this._strength = 20 * level;
        this._armor = 0;
        this._gold = Math.floor(Math.random() * 100 * level);
        this._slots = [
            new Slot(1, "head"),
            new Slot(2, "body"),
            new Slot(3, "hands"),
            new Slot(4, "belt"),
            new Slot(5, "bag")
        ];
        this._boughtItems = [];
    }

    public buy(item: Item, shop: Shop) :void{
        if (item.price > this.gold) {
            throw new Error("You don't have enough gold.");
        }
        this.gold -= item.price;
        this.boughtItems.push(shop.itemStock.splice(shop.itemStock.indexOf(item), 1)[0]);
    }

    public assign(item: number, slot: number): boolean {
        if (slot === -1) return false;
        if (!this.boughtItems[item] || !this.slots[slot]) {
            throw new Error("Wrong index to assign");
        }
        const i = this.boughtItems[item];
        const s = this.slots[slot];
        if (i.type !== Type.POTION && i.type !== Type.FOOD){
            for (const limit of itemLimits)
                if (limit.slot === s.name)
                    if (limit.limit === s.items.length) {
                        throw new Error("limit reached for the slot " + s.name);
                    } else if (!limit.types.includes(i.type)) {
                        throw new Error("This type is not assignable.");
                    }
        }
        if (i.effect[0] === 'a' || i.effect[0] === 's')
            if (s.name !== "bag")
                throw new Error("You can only assign this item in the Bag");
        if (s.name !== "bag" || i.effect[0] === 'a' || i.effect[0] === 's' || i.type === Type.POTION || i.type === Type.FOOD)
        this.addEffect(i, true);
        this.slots.forEach(s => {
            s.items.filter(i => i.effect !== "used");
        });
        this.boughtItems.filter(i => i.effect !== "used");
        s.addItem(this.boughtItems.splice(item, 1)[0]);
        return true;
    }

    /**
     * Change the item of place
     * @param item
     * @param slot
     * >= 0 for a slot, <0 for boughtItems
     */
    public assignAgain(item: Item, slot: number): void {
        let oldSlot = null;
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].items.includes(item)) {
                oldSlot = this.slots[i];
                break;
            }
        }
        if (oldSlot === null)
            throw new Error("Couldn't find the item in your slots");
        this.boughtItems.push(oldSlot.items.splice(oldSlot.items.indexOf(item), 1)[0]);
        if (oldSlot.name !== "bag")
            this.addEffect(item, false);
        if (slot >= 0)
            this.assign(this.boughtItems.indexOf(item), slot);
    }

    /**
     * Adds or removes the effect of the given item
     * @param item
     * @param add
     * true to add the effect, false to remove it
     * @private
     */
    private addEffect(item: Item, add: boolean): void {

            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;
            let nb = +((item.effect.split('').map((i:string, index:number) => {return index >= 2 ? i : ""})).join(""));
            nb *= (item.effect.split('')[1] === "+" ? 1 : -1);
            nb *= (add ? 1 : -1);
            switch (item.effect.split("")[0]) {
                case 'a':
                    this.armor += nb;
                    setTimeout(function() {
                        that.armor -= nb;
                        item.effect = 'used';
                    }, 1000 * 60 * 5);
                    break;
                case 'A':
                    this.armor += nb;
                    break;
                case 'l':
                    if (this.life < this.vitality) {
                        this.life = Math.min(this.life + nb, this.vitality);
                        item.effect = 'used'
                    }
                    else throw new Error("Your health is already full")
                    break;
                case 'L':
                    this.vitality += nb;
                    break;
                case 's':
                    if (item.type === Type.POTION){
                        this.strength += nb;
                        item.effect = 'used'
                    } else {
                        this.strength += nb;
                        setTimeout(function () {
                            that.strength -= nb;
                            item.effect = 'used';
                        }, 1000 * 60 * 5);
                    }
                    break;
                case 'S':
                    this.strength += nb;
                    if (item.type === Type.POTION)
                        item.effect = 'used'
                    break;
            }
    }

    public sell(price: number, item: Item): void {
        this.gold += price;
        // removes the item from its slot
        try {
            this.assignAgain(item, -1);
        } catch (e) {
            console.log("")
        }
        this.boughtItems.splice(this.boughtItems.indexOf(item), 1);
    }

    public static fromJSON(json: string): Perso{
        const obj = JSON.parse(json);
        const p = new Perso(obj.name, obj.level);
        p.vitality = obj.vitality;
        p.life = obj.life;
        p.strength = obj.strength;
        p.armor = obj.armor;
        p.gold = obj.gold;
        obj.slots.forEach(function(s: string) {
            p.slots.push(Slot.fromJSON(s));
        });
        obj.boughtItems.forEach(function (i: string) {
            p.boughtItems.push(Item.fromJSON(i));
        });

        return p;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get vitality(): number {
        return this._vitality;
    }

    set vitality(value: number) {
        this._vitality = value;
    }

    get life(): number {
        return this._life;
    }

    set life(value: number) {
        this._life = value;
    }

    get strength(): number {
        return this._strength;
    }

    set strength(value: number) {
        this._strength = value;
    }

    get armor(): number {
        return this._armor;
    }

    set armor(value: number) {
        this._armor = value;
    }

    get gold(): number {
        return this._gold;
    }

    set gold(value: number) {
        this._gold = value;
    }

    get slots(): Slot[] {
        return this._slots;
    }

    set slots(value: Slot[]) {
        this._slots = value;
    }

    get boughtItems(): Item[] {
        return this._boughtItems;
    }

    set boughtItems(value: Item[]) {
        this._boughtItems = value;
    }
}
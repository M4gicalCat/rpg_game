import {Type} from "@/Entities/Type";
import Item from "@/Entities/Item";
import {items} from "@/model";

export default class Shop {
    private static _counter = 0;
    private _id: number;
    private _name: string;
    private _itemCat: Type[];
    private _itemOrder: Item[];
    private _itemStock: Item[];
    constructor(name: string, itemCat: Type[]) {
        Shop._counter++;
        this._id = Shop._counter;
        this._name = name;
        this._itemCat = itemCat;
        this._itemStock = [];
        this._itemOrder = [];
        this.fillStock();
        this.fillOrder();
    }

    /**
     * Fills the stock with 10 different (random) items (or less if 10 different are not available)
     * @public
     */
    public fillStock(): void {
        const it = items.filter(it => this.itemCat.includes(it.type));
        for (let i = 0; i < 10 && it.length > 0; i++) {
            this.itemStock.push(Item.clone(it.splice(Math.floor(Math.random() * it.length), 1)[0]));
        }
        this.itemStock.sort((i1, i2) => {
            if (i1.type === i2.type) return 0;
            const sort: Type[] = [i1.type, i2.type].sort();
            return (sort[0] === i1.type) ? -1 : 1;
        });
    }

    /**
     * Fills the order list with 5 different (random) items (or less)
     * @public
     */
    public fillOrder(): void {
        let it = items.filter(it => this.itemCat.includes(it.type));

        /*
        Somehow, it.filter wasn't working
        Don't ask me why, I wouldn't know.
         */
        const newIt = [];
        for (let i = 0; i < it.length; i++) {
            for (let j = 0; j < this.itemStock.length; j++) {
                if (this.itemStock[j].name === it[i].name && i < it.length && j < this.itemStock.length) {
                    i++;
                    j = i < it.length ? 0 : Number.MAX_VALUE;
                }
            }
            if (it[i])
                newIt.push(it[i]);
        }
        it = newIt;
        console.log(it)

        for (let i = 0; i < 5 && it.length > 0; i++) {
            this.itemOrder.push(Item.clone(it.splice(Math.floor(Math.random() * it.length), 1)[0]));
        }
        this.itemOrder.sort((i1, i2) => {
            if (i1.type === i2.type) return 0;
            const sort: Type[] = [i1.type, i2.type].sort();
            return (sort[0] === i1.type) ? -1 : 1;
        });
    }

    public sell(id: number): void {
        if (!this.itemStock[id])return;
        this.itemStock.splice(id, 1);
    }

    public estimate(item: Item): number {
        if (!this.itemCat.includes(item.type)) return -1;
        return Math.max(Math.round(item.price - Math.random() * 0.9 * item.price), 0);
    }

    public buy(item: Item): void {
        this.itemStock.push(item);
    }

    public order(id: number): void {
        if (!this.itemOrder[id]) throw new Error(`Wrong id : ${id}`);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        setTimeout(function () {
            that.itemStock.push(...that.itemOrder.splice(id, 1))
        }, 30_000);
    }

    public static fromJSON(json: string): Shop {
        return JSON.parse(json) as Shop;
    }


    static get counter(): number {
        return this._counter;
    }

    static set counter(value: number) {
        this._counter = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get itemCat(): Type[] {
        return this._itemCat;
    }

    set itemCat(value: Type[]) {
        this._itemCat = value;
    }

    get itemOrder(): Item[] {
        return this._itemOrder;
    }

    set itemOrder(value: Item[]) {
        this._itemOrder = value;
    }

    get itemStock(): Item[] {
        return this._itemStock;
    }

    set itemStock(value: Item[]) {
        this._itemStock = value;
    }
}
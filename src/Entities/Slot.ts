import Item from "@/Entities/Item";

export default class Slot {
    private _name: string;
    private readonly _id: number;
    private _items: Item[];
    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
        this._items = [];
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get id(): number {
        return this._id;
    }

    get items(): Item[] {
        return this._items;
    }

    addItem(item: Item): void {
        this._items.push(item);
    }

    public static fromJSON(json: string): Slot {
        const j = JSON.parse(json);
        const s = new Slot(j.id, j.name);
        j.items.forEach((i: string) => {
            s.addItem(Item.fromJSON(i));
        });
        return s;
    }
}
import Shop from "@/Entities/Shop";

export default class Street {
    private _id: number;
    private static _counter = 0;
    private _name: string;
    private _shops: Shop[];

    public constructor(name: string) {
        this._name = name;
        Street._counter++;
        this._id = Street._counter;
        this._shops = [];
    }

    public addShop(shop: Shop): void {
        this._shops.push(shop);
    }

    public static fromJSON(json: string): Street {
        const s = JSON.parse(json);
        const street = new Street(s.name);
        street.id = s.id;
        s.shops.forEach(function (s: string) {
            street.addShop(Shop.fromJSON(s));
        });
        return street;
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

    get shops(): Shop[] {
        return this._shops;
    }

    set shops(value: Shop[]) {
        this._shops = value;
    }
}
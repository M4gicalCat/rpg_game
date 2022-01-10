import Street from "@/Entities/Street";

export default class Town {
    private _id: number;
    private static _counter = 0;
    private _name: string;
    private _streets: Street[];

    constructor(name: string) {
        Town._counter ++;
        this._id = Town._counter;
        this._name = name;
        this._streets = [];
    }

    public addStreet(street: Street): void {
        this._streets.push(street);
    }

    public static fromJSON(json: string): Town {
        const o = JSON.parse(json);
        const town = new Town(o.name);
        town.id = o.id;
        o.streets.forEach(function (s: string) {
            town.streets.push(Street.fromJSON(s));
        });
        return town;
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    static get counter(): number {
        return this._counter;
    }

    static set counter(value: number) {
        this._counter = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get streets(): Street[] {
        return this._streets;
    }

    set streets(value: Street[]) {
        this._streets = value;
    }
}
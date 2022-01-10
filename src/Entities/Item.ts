import {Type} from "@/Entities/Type";

export default class Item {
    private static counter = 0;
    private readonly _id: number;
    private _name: string;
    private _type: Type;
    private _price: number;
    private _effect: string;

    public constructor(name: string, type: Type, price: number, effect: string) {
        Item.counter++;
        this._id = Item.counter;
        this._name = name;
        this._type = type;
        this._price = Math.max(price, 0);
        this._effect = effect;
    }

    get id(): number {
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): Type {
        return this._type;
    }

    set type(value: Type) {
        this._type = value;
    }

    get effect(): string {
        return this._effect;
    }

    set effect(value: string) {
        this._effect = value;
    }

    get category(): string {
        switch (this._type) {
            case Type.ARMOR: return "🛡"
            case Type.CLOTHES: return "👕"
            case Type.CROWN: return "👑"
            case Type.POTION: return "🍹"
            case Type.SPELL: return "🪄"
            case Type.FOOD: return "🧁"
            case Type.HELMET: return "🪖"
            case Type.LIGHTER: return "🪔"
            case Type.PURSE: return "👛"
            case Type.WEAPON: return "🗡️"

            default: return "❌"
        }
    }

    get description() :string {
        if (this.effect === "used") return 'used item';
        if (this.effect === "") return this.name;
        let string = this.effect.split("")[1] === "+" ? "Adds " : "Removes ";
        string +=  `${(this.effect.split('').map((i, index) => {return index >= 2 ? i : ""})).join("")}`;
        string += " to your "
        switch (this.effect.split('')[0]) {
            case 'a':
                string += "armor temporarily";
                break;
            case 'A':
                string += "armor permanently";
                break;
            case 's':
                string += "strength temporarily";
                break;
            case 'S':
                string += "strength permanently";
                break;
            case 'l':
                string += "life";
                break;
            case 'L':
                string += "vitality (max life)";
                break;
        }
        return string
    }

    public static fromJSON(json :string) :Item{
        return JSON.parse(json) as Item
    }
}
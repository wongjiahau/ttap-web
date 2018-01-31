import { IStringDicionary } from "../interfaces/dictionary";
import { Identifiable } from "../interfaces/identifiable";

export class ObjectStore<T extends Identifiable> {
    private dict: IStringDicionary<T>;
    public constructor(data: T[]) {
        this.dict = {};
        data.forEach((x) => {
            if (this.dict[x.Uid] !== undefined) {
                throw new Error("Cannot have duplicated Uids in ObjectStore");
            }
            this.dict[x.Uid] = x;
        });
    }

    public GetDict() : IStringDicionary<T> {
        return this.dict;
    }

    public GetOne(key: number) : T {
        return this.dict[key];
    }

    public GetBunch(keys: number[]) : T[] {
        const results = [];
        let data : T;
        for (let i = 0; i < keys.length; i++) {
            data = this.dict[keys[i]];
            if (data === undefined) {
                throw new Error("No item have the key of " + keys[i]);
            }
            results.push(data);
        }
        return results;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectStore {
    constructor(data) {
        this.dict = {};
        data.forEach((x) => {
            if (this.dict[x.Uid] !== undefined) {
                throw new Error("Cannot have duplicated Uids in ObjectStore");
            }
            this.dict[x.Uid] = x;
        });
    }
    GetDict() {
        return this.dict;
    }
    GetOne(key) {
        return this.dict[key];
    }
    GetBunch(keys) {
        const results = [];
        let data;
        for (let i = 0; i < keys.length; i++) {
            data = this.dict[keys[i]];
            if (data !== undefined) {
                results.push(data);
            }
        }
        return results;
    }
    GetAll() {
        return Object.keys(this.dict).map((key) => this.dict[key]);
    }
}
exports.ObjectStore = ObjectStore;
//# sourceMappingURL=objectStore.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const objectStore_1 = require("./../objectStore");
class MockClass {
    constructor(Uid, Label) {
        this.Uid = Uid;
        this.Label = Label;
    }
}
describe("ObjectStore", () => {
    describe("constructor", () => {
        it("should take a list of identifiables as argument and build the lookup dictionary", () => {
            const data = [new MockClass(1), new MockClass(2)];
            const objectStore = new objectStore_1.ObjectStore(data);
            chai_1.expect(objectStore.GetDict()).to.deep.eq({
                1: new MockClass(1),
                2: new MockClass(2)
            });
        });
        it("should throw error if the data contains duplicated Uids", () => {
            const data = [new MockClass(1), new MockClass(1)];
            chai_1.expect(() => {
                const x = new objectStore_1.ObjectStore(data);
            }).to.throw();
        });
    });
    describe("GetOne", () => {
        it("should take a key and return the corresponding data", () => {
            const data = [new MockClass(1, "bob"), new MockClass(2, "ali")];
            const objectStore = new objectStore_1.ObjectStore(data);
            chai_1.expect(objectStore.GetOne(1)).to.deep.eq(new MockClass(1, "bob"));
        });
        it("should return undefined if the key match no data", () => {
            const data = [new MockClass(1, "bob"), new MockClass(2, "ali")];
            const objectStore = new objectStore_1.ObjectStore(data);
            chai_1.expect(objectStore.GetOne(999)).to.eq(undefined);
        });
    });
    describe("GetBunch", () => {
        it("should take a list of keys and return the matching data", () => {
            const data = [
                new MockClass(1, "bob"),
                new MockClass(2, "ali"),
                new MockClass(3, "mari")
            ];
            const objectStore = new objectStore_1.ObjectStore(data);
            chai_1.expect(objectStore.GetBunch([1, 3])).to.deep.eq([
                new MockClass(1, "bob"),
                new MockClass(3, "mari")
            ]);
        });
        it("should ignore non-matching key", () => {
            const data = [
                new MockClass(1, "bob"),
                new MockClass(2, "ali"),
                new MockClass(3, "lili")
            ];
            const objectStore = new objectStore_1.ObjectStore(data);
            const result = objectStore.GetBunch([1, 99, 3]);
            chai_1.expect(result).to.deep.eq([
                new MockClass(1, "bob"),
                new MockClass(3, "lili")
            ]);
        });
    });
    describe("GetAll", () => {
        it("should return all values of the dict as a list", () => {
            const data = [
                new MockClass(1, "bob"),
                new MockClass(2, "ali"),
                new MockClass(3, "lili")
            ];
            const x = new objectStore_1.ObjectStore(data);
            chai_1.expect(x.GetAll()).to.deep.eq(data.slice());
        });
    });
});
//# sourceMappingURL=_objectStore.test.js.map
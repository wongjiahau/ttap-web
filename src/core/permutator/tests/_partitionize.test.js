"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const partitionize_1 = require("../partitionize");
const partitionize_2 = require("./../partitionize");
describe("Partitionize", () => {
    it("case 1", () => {
        const item1 = {
            PartitionKey: 1
        };
        const item2 = {
            PartitionKey: 1
        };
        const input = [item1, item2];
        const actual = partitionize_1.Partitionize(input);
        const expected = [input.slice()];
        // console.log(actual);
        // console.log(expected);
        chai_1.expect(actual.length).to.eq(expected.length);
        chai_1.expect(isEqual(expected, actual)).to.eq(true);
    });
    it("case 2", () => {
        const item1 = {
            PartitionKey: 1
        };
        const item2 = {
            PartitionKey: 2
        };
        const input = [item1, item2];
        const actual = partitionize_1.Partitionize(input);
        const expected = [
            [input[0]],
            [input[1]]
        ];
        chai_1.expect(actual.length).to.eq(expected.length);
        chai_1.expect(isEqual(expected, actual)).to.eq(true);
    });
    it("case 3", () => {
        const item1 = {
            PartitionKey: 1
        };
        const item2 = {
            PartitionKey: 2
        };
        const item3 = {
            PartitionKey: 3
        };
        const input = [item1, item2, item3];
        const actual = partitionize_1.Partitionize(input);
        const expected = [
            [input[0]],
            [input[1]],
            [input[2]]
        ];
        chai_1.expect(actual.length).to.eq(expected.length);
        chai_1.expect(isEqual(expected, actual)).to.eq(true);
    });
    it("case 4", () => {
        const item1 = {
            PartitionKey: 1
        };
        const item2 = {
            PartitionKey: 2
        };
        const item3 = {
            PartitionKey: 3
        };
        const item4 = {
            PartitionKey: 3
        };
        const input = [item1, item2, item3, item4];
        const actual = partitionize_1.Partitionize(input);
        const expected = [
            [input[0]],
            [input[1]],
            [input[2], input[3]]
        ];
        chai_1.expect(actual.length).to.eq(expected.length);
        chai_1.expect(isEqual(expected, actual)).to.eq(true);
    });
    it("case 5", () => {
        const item1 = {
            PartitionKey: 1
        };
        const item2 = {
            PartitionKey: 2
        };
        const item3 = {
            PartitionKey: 3
        };
        const item4 = {
            PartitionKey: 3
        };
        const item5 = {
            PartitionKey: 2
        };
        const input = [item1, item2, item3, item4, item5];
        const actual = partitionize_1.Partitionize(input);
        const expected = [
            [input[0]],
            [input[1], input[4]],
            [input[2], input[3]]
        ];
        chai_1.expect(actual.length).to.eq(expected.length);
        chai_1.expect(isEqual(expected, actual)).to.eq(true);
    });
    it("case 6", () => {
        const item1 = {
            PartitionKey: 1
        };
        const item2 = {
            PartitionKey: 2
        };
        const item3 = {
            PartitionKey: 1
        };
        const item4 = {
            PartitionKey: 2
        };
        const item5 = {
            PartitionKey: 1
        };
        const item6 = {
            PartitionKey: 2
        };
        const input = [item1, item2, item3, item4, item5, item6];
        const actual = partitionize_1.Partitionize(input);
        const expected = [
            [input[0], input[2], input[4]],
            [input[1], input[3], input[5]],
        ];
        chai_1.expect(actual.length).to.eq(expected.length);
        chai_1.expect(isEqual(expected, actual)).to.eq(true);
    });
});
describe("PartitionizeByKey", () => {
    it("case 1", () => {
        const a = {
            customKey: "koko"
        };
        const b = {
            customKey: "koko"
        };
        const c = {
            customKey: "jojo"
        };
        const result = partitionize_2.PartitionizeByKey([a, b, c], "customKey");
        chai_1.expect(result.length).to.eq(2);
        chai_1.expect(result[0].length).to.eq(1);
        chai_1.expect(result[1].length).to.eq(2);
    });
    it("case 2", () => {
        const rawSlots = heng_2017_apr_1.HENG_2017_APR().filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.ACD);
        chai_1.expect(rawSlots).to.have.lengthOf(1);
        const result = partitionize_2.PartitionizeByKey(rawSlots, "SubjectCode");
        chai_1.expect(result).to.have.lengthOf(1);
    });
});
//# sourceMappingURL=_partitionize.test.js.map
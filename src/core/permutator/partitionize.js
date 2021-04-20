"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortBy = require("lodash.sortby");
function Partitionize(input) {
    return PartitionizeByKey(input, "PartitionKey");
}
exports.Partitionize = Partitionize;
function PartitionizeByKey(input, keyName) {
    if (input.length === 0) {
        return [];
    }
    const result = new Array();
    let column = new Array();
    const copy = sortBy(input, [keyName]);
    column.push(copy[0]);
    let currentKey = copy[0][keyName];
    for (let i = 1; i < copy.length; i++) {
        if (copy[i][keyName] === currentKey) {
            column.push(copy[i]);
        }
        else {
            currentKey = copy[i][keyName];
            result.push(column.slice());
            column = [];
            column.push(copy[i]);
        }
        if (i === copy.length - 1) {
            result.push(column);
        }
    }
    if (result.length === 0) {
        result.push(column);
    }
    return result;
}
exports.PartitionizeByKey = PartitionizeByKey;
function BinaryPartition(input, check) {
    const right = [];
    const left = [];
    for (let i = 0; i < input.length; i++) {
        if (check(input[i])) {
            left.push(input[i]);
        }
        else {
            right.push(input[i]);
        }
    }
    return [left, right];
}
exports.BinaryPartition = BinaryPartition;
//# sourceMappingURL=partitionize.js.map
const sortBy = require("lodash.sortby");
export interface IPartitionable {
    PartitionKey: number;
}

export function Partitionize < T extends IPartitionable > (input: T[]): T[][] {
    return PartitionizeByKey(input, "PartitionKey");
}

export function PartitionizeByKey<T>(input : T[], keyName: string) : T[][] {
    const result = new Array < T[] > ();
    let column = new Array < T > ();
    const copy = sortBy(input, [keyName]);
    column.push(copy[0]);
    let currentKey = copy[0][keyName];
    for (let i = 1; i < copy.length; i++) {
        if (copy[i][keyName] === currentKey) {
            column.push(copy[i]);
        } else {
            currentKey = copy[i][keyName];
            result.push(column.slice());
            column = [];
            column.push(copy[i]);
        }
        if (i === copy.length - 1) {
            result.push(column);
        }
    }
    return result;

}

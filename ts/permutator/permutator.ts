import {
    IntersectWith,
    ISlot
} from "../model/slot";
import {
    GenerateIndices
} from "./generateIndices";
import {
    Increment
} from "./increment";
import {
    Partitionize
} from "./partitionize";

export function Permutator(input: ISlot[]): ISlot[][] {
    if (input.length === 0) {
        throw new Error("Input slots should not be an empty array");
    }
    const result = [];
    const partitioned = Partitionize(input);
    let indices = GenerateIndices(partitioned);
    let prototype = new Array(partitioned.length);

    while (true) {
        prototype.push(partitioned[0][indices[0].Value]);
        let gotIntersection = false;
        for (let i = 1; i < indices.length; i++) {
            const current = partitioned[i][indices[i].Value];
            for (let j = 0; j < prototype.length; j++) {
                if (IntersectWith(prototype[j], current)) {
                    gotIntersection = true;
                    break;
                }
            }
            if (!gotIntersection) {
                prototype.push(current);
            }
        }
        if (!gotIntersection) {
            result.push(prototype.slice());
        }
        indices = Increment(indices);
        if (indices == null) {
            break;
        }
        prototype = [];
    }
    return result;
}

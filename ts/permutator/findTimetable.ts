import {
    GenerateIndices
} from "./generateIndices";
import {
    Increment
} from "./increment";
import {
    Partitionize
} from "./partitionize";
import {
    TinySlot
} from "./tinySlot";

export function FindTimetable(input: TinySlot[]): number[][] {
    if (input.length === 0) {
        throw new Error("Input slots should not be an empty array");
    }
    const result = [];
    const partitioned = Partitionize(input);
    let indices = GenerateIndices(partitioned);
    let candidate = new Array < number > (partitioned.length);
    let state = [0, 0, 0, 0, 0, 0, 0];
    while (true) {
        const first = partitioned[0][indices[0].Value];
        state = Append(state, first.State);
        candidate = first.HashIds;
        let gotIntersection = false;
        for (let i = 1; i < indices.length; i++) {
            const current = partitioned[i][indices[i].Value];
            if (GotIntersection(state, current.State)) {
                gotIntersection = true;
                break;
            } else {
                state = Append(state, current.State);
                candidate = candidate.concat(current.HashIds);
            }
        }
        if (!gotIntersection) {
            result.push(candidate.slice());
        }
        indices = Increment(indices);
        if (indices === null) {
            break;
        }
        candidate = [];
        state = [0, 0, 0, 0, 0, 0, 0];
    }
    return result;
}

export function Append(originalState: number[], newState: number[]): number[] {
    if (originalState.length !== 7 || newState.length !== 7) {
        throw new Error("State lengths should be 7");
    }
    const result = originalState.slice();
    for (let i = 0; i < 7; i++) {
        result[i] |= newState[i];
    }
    return result;
}

export function GotIntersection(a: number[], b: number[]): boolean {
    if (a.length !== 7 || b.length !== 7) {
        throw new Error("State lengths should be 7");
    }
    return (
        (a[0] & b[0]) +
        (a[1] & b[1]) +
        (a[2] & b[2]) +
        (a[3] & b[3]) +
        (a[4] & b[4]) +
        (a[5] & b[5]) +
        (a[6] & b[6])
    ) > 0;
}

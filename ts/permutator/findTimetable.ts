import {
    Timetable
} from "../model/timetable";
import {
    BoundedInt
} from "./boundedInt";
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

export function FindTimetable(input: TinySlot[]): Timetable[] {
    if (input.length === 0) {
        throw new Error("Input slots should not be an empty array");
    }
    if (input.length === 1) {
        let resultState = [0, 0, 0, 0, 0, 0, 0];
        resultState = Append(resultState, input[0].State);
        return [new Timetable(input[0].HashIds, resultState)];
    }
    const result = new Array < Timetable > ();
    const partitioned = Partitionize(input);
    let indices = GenerateIndices(partitioned);
    let candidate = new Array < number > (partitioned.length);
    let state = [0, 0, 0, 0, 0, 0, 0];
    while (true) {
        const first = partitioned[0][indices[0].Value];
        state = Append(state, first.State);
        candidate = first.HashIds;
        let gotIntersection = false;
        const length = indices.length;
        for (let i = 1; i < length; i++) {
            const current = partitioned[i][indices[i].Value];
            if (GotIntersection(state, current.State)) {
                const newIndices = IncrementSpecificIndex(indices, i);
                if (newIndices !== null) {
                    indices = newIndices;
                    i--;
                } else {
                    gotIntersection = true;
                    break;
                }
            } else {
                state = Append(state, current.State);
                candidate = candidate.concat(current.HashIds);
            }
        }
        if (!gotIntersection) {
            result.push(new Timetable(candidate.slice(), state));
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

export function IncrementSpecificIndex(indices: BoundedInt[], position: number): BoundedInt[] {
    // note : this function have side effects
    const result = indices.slice();
    result[position].Value++;
    if (result[position].Value > result[position].UpperLimit) {
        result[position].Value--;
        return null;
    }
    return result;
}

import {
    min
} from "lodash";

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
    const minLength = min([a.length, b.length]);
    let result = 0;
    for (let i = 0; i < minLength; i++) {
        result += ( a[i] & b[i] );
    }
    return result > 0;
}

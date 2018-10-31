const min = require("lodash.min");

export function Append(originalState: number[], newState: number[]): number[] {
    const result = originalState.slice();
    const length = originalState.length;
    for (let i = 0; i < length; i++) {
        result[i] |= newState[i];
    }
    return result;
}

export function GotIntersection(a: number[], b: number[]): boolean {
    let sum = 0;
    const length = a.length;
    for (let i = 0; i < length; i++) {
        sum += (a[i] & b[i]);
    }
    return sum > 0;
}

import {
    min
} from "lodash";

export function Append(originalState: number[], newState: number[]): number[] {
    // if (originalState.length !== 7 || newState.length !== 7) {
    //     throw new Error("State lengths should be 7");
    // }
    const result = originalState.slice();
    for (let i = 0; i < 7; i++) {
        result[i] |= newState[i];
    }
    return result;
    // const minLength = min([originalState.length, newState.length]);
    // const result = originalState.length > newState.length ?  originalState.slice() : newState.slice();
    // const toBeAppended = originalState.length > newState.length ? newState.slice() : originalState.slice();
    // for (let i = 0; i < minLength; i++) {
    //     result[i] |= toBeAppended[i];
    // }
    // return result;
}

export function GotIntersection(a: number[], b: number[]): boolean {
    return ( a[0] & b[0]) +
    ( a[1] & b[1]) +
    ( a[2] & b[2]) +
    ( a[3] & b[3]) +
    ( a[4] & b[4]) +
    ( a[5] & b[5]) +
    ( a[6] & b[6]) > 0;
    // const minLength = min([a.length, b.length]);
    // let result = 0;
    // for (let i = 0; i < minLength; i++) {
    //     result += ( a[i] & b[i] );
    // }
    // return result > 0;
}

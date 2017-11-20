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

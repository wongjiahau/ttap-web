const min = require("lodash.min");

export function AppendMatrix(originalMatrix: number[], newMatrix: number[]): number[] {
    const result = originalMatrix.slice();
    const length = originalMatrix.length;
    for (let i = 0; i < length; i++) {
        result[i] |= newMatrix[i];
    }
    return result;
}

export function GotIntersection(matrix1: number[], matrix2: number[]): boolean {
    let sum = 0;
    const length = matrix1.length;
    for (let i = 0; i < length; i++) {
        sum += (matrix1[i] & matrix2[i]);
    }
    return sum > 0;
}

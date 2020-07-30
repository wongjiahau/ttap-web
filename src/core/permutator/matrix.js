"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const min = require("lodash.min");
function AppendMatrix(originalMatrix, newMatrix) {
    const result = originalMatrix.slice();
    const length = originalMatrix.length;
    for (let i = 0; i < length; i++) {
        result[i] |= newMatrix[i];
    }
    return result;
}
exports.AppendMatrix = AppendMatrix;
function GotIntersection(matrix1, matrix2) {
    let sum = 0;
    const length = matrix1.length;
    for (let i = 0; i < length; i++) {
        sum += (matrix1[i] & matrix2[i]);
    }
    return sum > 0;
}
exports.GotIntersection = GotIntersection;
//# sourceMappingURL=matrix.js.map
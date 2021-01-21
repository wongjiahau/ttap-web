"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Increment(indices) {
    let pointer = indices.length - 1;
    const x = indices.slice();
    while (true) {
        x[pointer].Value++;
        if (x[pointer].Value > x[pointer].UpperLimit) {
            x[pointer].Value = 0;
            pointer--;
            if (pointer < 0) {
                return [];
            }
        }
        else {
            return x;
        }
    }
}
exports.Increment = Increment;
//# sourceMappingURL=increment.js.map
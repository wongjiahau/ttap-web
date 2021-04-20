"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function DecToBin(digit, outputBinaryLength) {
    let out = "";
    while (outputBinaryLength--) {
        out += (digit >> outputBinaryLength) & 1;
    }
    return out;
}
exports.DecToBin = DecToBin;
//# sourceMappingURL=decToBin.js.map
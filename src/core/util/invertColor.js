"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invert = require("invert-color");
// Memoization to improve performance
const memo = {};
function invertColor(color) {
    const result = memo[color];
    if (result) {
        return result;
    }
    else {
        // @ts-ignore
        const temp = invert(color, true);
        memo[color] = temp;
        return temp;
    }
}
exports.invertColor = invertColor;
//# sourceMappingURL=invertColor.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function colorhash(seed) {
    return new (require("color-hash"))({
        // lightness: 0.75,
        // saturation: 0.5,
        hash: (x) => customHashFunction(x, seed),
    });
}
// Memoization to improve performance
const memo = {};
function ColorHash(input, seed = 32, memoize = true) {
    // why the default seed is 32?
    // it is based on heuristics, a test is run to try numbers between 1 - 999
    // and the number 32 resulted in the least duplciated hashes
    // that's why the seed is defaulted to 32
    // refer seedThatResultedInTheLeastHashesDuplicates from _colorhash.test.ts
    const result = memo[input];
    if (memoize && result) {
        return result;
    }
    else {
        const temp = colorhash(seed).hex(input); // eslint-disable-line no-undef
        memo[input] = temp;
        return temp;
    }
}
exports.ColorHash = ColorHash;
function customHashFunction(input, seed) {
    const seed2 = 137;
    let hash = 0;
    // make hash more sensitive for short string like 'a', 'b', 'c'
    const str = input;
    for (let i = 0; i < str.length; i++) {
        if (hash > Number.MAX_SAFE_INTEGER) {
            hash = hash / seed2 + hash % seed2;
        }
        else {
            hash = hash * seed + str.charCodeAt(i);
        }
    }
    return hash;
}
exports.customHashFunction = customHashFunction;
//# sourceMappingURL=colorhash.js.map
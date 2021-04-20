"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boundedInt_1 = require("./boundedInt");
function GenerateIndices(x) {
    const result = new Array();
    const bi = new boundedInt_1.BoundedInt(0, 0);
    bi.Value = 0;
    for (let i = 0; i < x.length; i++) {
        bi.UpperLimit = x[i].length - 1;
        result.push(bi.Duplicate());
    }
    return result;
}
exports.GenerateIndices = GenerateIndices;
//# sourceMappingURL=generateIndices.js.map
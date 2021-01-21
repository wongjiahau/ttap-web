"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortBy = require("lodash.sortby");
const uniqBy = require("lodash.uniqby");
const colors_1 = require("./colors");
function GenerateColorScheme(slots) {
    const result = new Array();
    const subjectCodes = uniqBy(slots, (s) => s.SubjectCode).map((s) => s.SubjectCode);
    sortBy(subjectCodes).forEach((s, index) => {
        result.push({ Color: colors_1.ChosenColors[index % colors_1.ChosenColors.length], SubjectCode: s });
    });
    return result;
}
exports.GenerateColorScheme = GenerateColorScheme;
//# sourceMappingURL=generateColorScheme.js.map
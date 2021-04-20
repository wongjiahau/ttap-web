"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const str_1 = require("./str");
function BeautifySubjectName(input) {
    return input
        .toLowerCase()
        .replace(/ dan /gi, " & ")
        .replace(/ and /gi, " & ")
        .split(" ")
        .map((word) => new str_1.Str(word).Capitalize().Value())
        .join(" ")
        .replace(/ ii/gi, " II")
        .replace(/ii /gi, "II ")
        .replace(/ iii/gi, " III")
        .replace(/iii /gi, "III ");
}
exports.BeautifySubjectName = BeautifySubjectName;
//# sourceMappingURL=beautifySubjectName.js.map
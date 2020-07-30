"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const str_1 = require("./str");
function BeautifySubjectName(input) {
    return input
        .toLowerCase()
        .replace("dan", "&")
        .replace("and", "&")
        .split(" ")
        .map((word) => new str_1.Str(word).Capitalize().Value())
        .join(" ")
        .replace("Ii", "II")
        .replace("IIi", "III");
}
exports.BeautifySubjectName = BeautifySubjectName;
//# sourceMappingURL=beautifySubjectName.js.map
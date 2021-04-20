"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const beautifySubjectName_1 = require("./beautifySubjectName");
const str_1 = require("./str");
function GetInitial(input) {
    let result = beautifySubjectName_1.BeautifySubjectName(input).trim();
    if (new str_1.Str(result).Contains("(")) {
        result = result
            .substring(0, result.indexOf("("))
            .trim();
    }
    return result
        .split(" ")
        .map((word) => {
        switch (word.toLowerCase()) {
            case "i":
                return "1";
            case "ii":
                return "2";
            default:
                return word;
        }
    })
        .map((word) => (IsNonWhiteSpaceSymbols(word[0]) ?
        word[0] :
        ""))
        .join("");
    function IsNonWhiteSpaceSymbols(char) {
        return char !== " " && new str_1.Str(char).IsAlphaNumeric();
    }
}
exports.GetInitial = GetInitial;
//# sourceMappingURL=getInitial.js.map
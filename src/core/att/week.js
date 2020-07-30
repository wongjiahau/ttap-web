"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual = require("lodash.isequal");
const isInt = require("validator/lib/isInt");
class Week {
    static Parse(s) {
        const result = new Array();
        const tokens = s.split(",");
        tokens.forEach((t) => {
            if (isInt(t)) {
                result.push(parseInt(t, 10));
            }
            else {
                const toks = t.split("-");
                const first = parseInt(toks[0], 10);
                const last = parseInt(toks[1], 10);
                for (let i = first; i <= last; i++) {
                    result.push(i);
                }
            }
        });
        return new Week(result);
    }
    constructor(weekNumberList) {
        this.WeekNumberList = weekNumberList;
        this.BinaryData = this.GenerateBinaryForm(weekNumberList);
    }
    Equals(other) {
        return isEqual(this.WeekNumberList, other.WeekNumberList);
    }
    IntersectWith(other) {
        return (this.BinaryData & other.BinaryData) > 0;
        // return intersection(this.WeekNumberList, other.WeekNumberList).length > 0;
    }
    GenerateBinaryForm(weekNumberList) {
        // 14 zeroes signifies 14 weeks
        const result = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        weekNumberList.forEach((w) => {
            result[w - 1] = "1";
        });
        return parseInt(result.reverse().join(""), 2);
    }
}
exports.Week = Week;
//# sourceMappingURL=week.js.map
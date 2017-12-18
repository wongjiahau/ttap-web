const intersection = require("lodash.intersection");
const isEqual = require("lodash.isequal");
import * as isInt from "validator/lib/isInt";
export class Week {
    public static Parse(s: string): Week {
        const result = new Array < number > ();
        const tokens = s.split(",");
        tokens.forEach((t) => {
            if (isInt(t)) {
                result.push(parseInt(t, 10));
            } else {
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

    public readonly BinaryData: number;
    public readonly WeekNumberList: number[];
    public constructor(weekNumberList: number[]) {
        this.WeekNumberList = weekNumberList;
        this.BinaryData = this.GenerateBinaryForm(weekNumberList);
    }

    public Equals(other: Week): boolean {
        return isEqual(this.WeekNumberList, other.WeekNumberList);
    }

    public IntersectWith(other: Week): boolean {
        return ( this.BinaryData & other.BinaryData ) > 0;
        // return intersection(this.WeekNumberList, other.WeekNumberList).length > 0;
    }

    private GenerateBinaryForm(weekNumberList: number[]): number {
        // 14 zeroes signifies 14 weeks
        const result = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
        weekNumberList.forEach((w) => {
            result[w - 1] = "1";
        });
        return parseInt(result.reverse().join(""), 2);
    }

}

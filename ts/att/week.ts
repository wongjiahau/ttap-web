import {
    intersection,
    isEqual
} from "lodash";
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

    public readonly WeekNumberList: number[];
    public constructor(weekNumberList: number[]) {
        this.WeekNumberList = weekNumberList;
    }

    public Equals(other: Week): boolean {
        return isEqual(this.WeekNumberList, other.WeekNumberList);
    }

    public IntersectWith(other: Week): boolean {
        return intersection(this.WeekNumberList, other.WeekNumberList).length > 0;
    }

}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const timePeriod_1 = require("../../att/timePeriod");
class Skeleton {
    constructor() {
        let child = this.GetTimeRow().concat(this.GetDayColumn());
        let layouts = [];
        layouts = layouts.concat(this.GetTimeRowLayout());
        this.Layouts = layouts;
        this.Children = child;
    }
    Concat(other) {
        this.Children = other.Children.concat(this.Children);
        this.Layouts = other.Layouts.concat(this.Layouts);
    }
    GetTimeRow() {
        const divStyle = {
            borderBottom: "1px solid",
            borderRight: "1px solid",
            height: "20.5px",
            padding: "2px",
            textAlign: "center"
        };
        const lastDivStyle = {
            borderBottom: "1px solid",
            height: "20.5px",
            padding: "2px",
            textAlign: "center"
        };
        const result = [];
        for (let i = 0;; i++) {
            let time = i + timePeriod_1.TimePeriod.Min.Hour;
            const isAtLast = time === timePeriod_1.TimePeriod.Max.Hour - 1;
            if (time >= timePeriod_1.TimePeriod.Max.Hour) {
                break;
            }
            time = time <= 12
                ? time
                : time - 12;
            result.push(React.createElement("div", { key: "t" + i },
                React.createElement("div", { style: isAtLast ? lastDivStyle : divStyle }, time + ":00"),
                React.createElement("div", { style: isAtLast ? lastDivStyle : divStyle }, (time + 1) + ":00")));
        }
        return result;
    }
    GetTimeRowLayout() {
        const result = Array();
        // TODO: Give answer to what is the magic number 32.
        for (let i = 0; i < 32; i++) {
            result.push({
                h: 1,
                i: ("t" + i),
                w: 2,
                x: i * 2 + Skeleton.X_OFFSET,
                y: 0
            });
        }
        return result;
    }
    GetDayColumn() {
        const days = [
            " ",
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT",
            "SUN"
        ];
        const firstDivStyle = {
            borderRight: "1px solid",
            display: "table",
            overflow: "hidden",
            textAlign: "center"
        };
        const div1style = {
            borderRight: "1px solid",
            borderTop: "1px solid",
            display: "table",
            overflow: "hidden",
            textAlign: "center"
        };
        const div2style = {
            display: "table-cell",
            verticalAlign: "middle"
        };
        const result = [];
        for (let i = 0; i < days.length; i++) {
            result.push(React.createElement("div", { style: i === 0
                    ? firstDivStyle
                    : div1style, key: "d" + i },
                React.createElement("div", { style: div2style }, days[i])));
        }
        return result;
    }
}
Skeleton.TIME_ROW_HEIGHT = 1;
Skeleton.DAY_COLUMN_WIDTH = 2;
Skeleton.Y_OFFSET = 1;
Skeleton.X_OFFSET = 2;
exports.Skeleton = Skeleton;
//# sourceMappingURL=skeleton.js.map
import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import { TimePeriod } from "../../att/timePeriod";

export interface ISkeleton {
    Layouts : ReactGridLayout.Layout[];
    Children : any[];
}

export class Skeleton implements ISkeleton {
    public static readonly TIME_ROW_HEIGHT = 1;
    public static readonly DAY_COLUMN_WIDTH = 2;
    public static readonly Y_OFFSET = 1;
    public static readonly X_OFFSET = 2;
    public Layouts : ReactGridLayout.Layout[];
    public Children : JSX.Element[];
    public constructor() {
        let child: JSX.Element[] = this.GetTimeRow().concat(this.GetDayColumn());
        let layouts : ReactGridLayout.Layout[] = [];
        layouts = layouts.concat(this.GetTimeRowLayout());
        this.Layouts = layouts;
        this.Children = child;
    }

    public Concat(other : ISkeleton) : void {
        this.Children = this
            .Children
            .concat(other.Children);
        this.Layouts = this
            .Layouts
            .concat(other.Layouts);
    }

    private GetTimeRow(): JSX.Element[] {
        const divStyle : React.CSSProperties = {
            borderBottom: "1px solid",
            borderRight: "1px solid",
            height: "20.5px",
            padding: "2px",
            textAlign: "center"
        };
        const lastDivStyle: React.CSSProperties = {
            borderBottom: "1px solid",
            height: "20.5px",
            padding: "2px",
            textAlign: "center"
        };
        const result: JSX.Element[] = [];
        for (let i = 0;; i++) {
            let time = i + TimePeriod.Min.Hour;
            const isAtLast = time === TimePeriod.Max.Hour - 1;
            if (time >= TimePeriod.Max.Hour) {
                break;
            }
            time = time <= 12
                ? time
                : time - 12;
            result.push(
                <div key={"t" + i}>
                    <div style={isAtLast ? lastDivStyle : divStyle}>{time + ":00"}</div>
                    <div style={isAtLast ? lastDivStyle : divStyle}>{(time + 1) + ":00"}</div>
                </div>
            );
        }
        return result;
    }
    private GetTimeRowLayout() : ReactGridLayout.Layout[] {
        const result = Array < ReactGridLayout.Layout > ();
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

    private GetDayColumn(): JSX.Element[] {
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
        const firstDivStyle : React.CSSProperties = {
            borderRight: "1px solid",
            display: "table",
            overflow: "hidden",
            textAlign: "center"
        };
        const div1style : React.CSSProperties = {
            borderRight: "1px solid",
            borderTop: "1px solid",
            display: "table",
            overflow: "hidden",
            textAlign: "center"
        };
        const div2style : React.CSSProperties = {
            display: "table-cell",
            verticalAlign: "middle"
        };
        const result: JSX.Element[] = [];
        for (let i = 0; i < days.length; i++) {
            result.push(
                <div
                    style={i === 0
                    ? firstDivStyle
                    : div1style}
                    key={"d" + i}>
                    <div style={div2style}>
                        {days[i]}
                    </div>
                </div>
            );
        }
        return result;
    }

}

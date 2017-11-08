import * as $ from "jquery";
import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import { ParseDay } from "../att/day";
import {TimePeriod} from "../att/timePeriod";
import {RawSlot} from "../model/rawSlot";
import {Timetable} from "../model/timetable";
import {SlotView} from "./slotView";

const timetableViewWidth = 0.9 * $(window).width();

const divStyle : React.CSSProperties = {
    borderStyle: "solid",
    margin: "auto",
    width: timetableViewWidth
};

export interface ITimetableViewProps {
    timetable : Timetable;
}

function getTimeRow() {
    const topDivStyle : React.CSSProperties = {
        borderBottom: "1px solid",
        borderRight: "1px solid",
        fontFamily: "roboto",
        padding: "2px",
        textAlign: "center"
    };
    const btmDivStyle : React.CSSProperties = {
        borderBottom: "1px solid",
        borderRight: "1px solid",
        fontFamily: "roboto",
        padding: "2px",
        textAlign: "center"
    };
    const result = [];
    for (let i = 0;; i++) {
        let time = i + TimePeriod.Min.Hour;
        if (time > TimePeriod.Max.Hour) {
            break;
        }
        time = time <= 12
            ? time
            : time - 12;
        result.push(
            <div key={"t" + i}>
                <div style={topDivStyle}>{time + ":00"}</div>
                <div style={btmDivStyle}>{(time + 1) + ":00"}</div>
            </div>
        );
    }
    return result;
}

const X_OFFSET = 2;
function getTimeRowLayout() : ReactGridLayout.Layout[] {
    const result = Array < ReactGridLayout.Layout > ();
    for (let i = 0; i < 32; i++) {
        result.push({
            h: 1,
            i: ("t" + i),
            w: 2,
            x: i * 2 + X_OFFSET,
            y: 0
        });
    }
    return result;
}

function getDayColumn() {
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
    const div1style : React.CSSProperties = {
        borderRight: "1px solid",
        borderTop: "1px solid",
        display: "table",
        overflow: "hidden",
        textAlign: "center"
    };
    const div2style : React.CSSProperties = {
        display: "table-cell",
        fontFamily: "roboto",
        verticalAlign: "middle"
    };
    const result = [];
    for (let i = 0; i < days.length; i++) {
        result.push(
            <div style={div1style} key={"d" + i}>
                <div style={div2style}>
                    {days[i]}
                </div>
            </div>
        );
    }
    return result;
}

const Y_OFFSET = 2;
function getDayColumnLayout() : ReactGridLayout.Layout[] {
    const result = Array < ReactGridLayout.Layout > ();
    for (let j = 0; j < 8; j++) {
        result.push({
            h: 1,
            i: ("d" + j),
            w: 2,
            x: 0,
            y: j
        });
    }
    return result;
}

export const TimetableView = (props : ITimetableViewProps) => {
    let child = [];
    child.push(getTimeRow());
    child.push(getDayColumn());
    const singleUnit : number = 1;
    let layouts : ReactGridLayout.Layout[] = [];
    layouts = layouts.concat(getTimeRowLayout());
    layouts = layouts.concat(getDayColumnLayout());
    if (props.timetable) {
        const rawSlots = RawSlot.GetBunch(props.timetable.HashIds);
        const slotViews = rawSlots.map((x, index) => {
            return (
                <div key={"s" + index}><SlotView slot={x}/></div>
            );
        });
        const slotLayouts = rawSlots.map((x, index) => {
            return GetSlotLayout(x, "s" + index, X_OFFSET, Y_OFFSET);
        });
        layouts = layouts.concat(slotLayouts);
        child = child.concat(slotViews);
    }

    return (
        <div style={divStyle}>
            <ReactGridLayout
                cols={((TimePeriod.Max.Hour - TimePeriod.Min.Hour) + 2) * 2}
                maxRows={16}
                rowHeight={50}
                width={timetableViewWidth}
                layout={layouts}
                margin={[0, 0]}
                isDraggable={false}
                isResizable={false}
                autoSize={true}
                verticalCompact={false}
                >
                {child}
            </ReactGridLayout>
        </div>
    );
};

export function GetSlotLayout(rawSlot : RawSlot, index : string, xOffset : number, yOffset : number) : ReactGridLayout.Layout {
    const day = ParseDay(rawSlot.Day) - 1;
    const [X, W] = GetXandW(TimePeriod.Parse(rawSlot.TimePeriod));
    const result: ReactGridLayout.Layout = {
        h: 1,
        i: index,
        w: W,
        x: X + xOffset,
        y: day + yOffset
    };
    return result;
}

export function GetXandW(timePeriod : TimePeriod) : [number, number] {
    let x = ( timePeriod.StartTime.Hour - TimePeriod.Min.Hour ) * 2;
    if (timePeriod.StartTime.Minute === 30) {
        x++;
    }
    const w = timePeriod
        .EndTime
        .Minus(timePeriod.StartTime)
        .TotalHours() * 2;
    return [x, w];
}

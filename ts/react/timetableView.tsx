import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import RawSlot from "../model/rawSlot";
import {SlotView} from "./slotView";

const divStyle : React.CSSProperties = {
    borderStyle: "solid"
};

export interface ITimetableViewProps {}

function getTimeRow() {
    const topDivStyle : React.CSSProperties = {
        borderBottom: "1px solid",
        borderRight: "1px solid",
        borderTop: "1px solid",
        fontFamily: "roboto",
        padding: "2px",
        textAlign: "center"
    };
    const btmDivStyle: React.CSSProperties = {
        borderBottom: "1px solid",
        borderRight: "1px solid",
        fontFamily: "roboto",
        padding: "2px",
        textAlign: "center"
    };
    const result = [];
    const minTime = 7; // 7 am
    const maxTime = 21; // 9 pm
    for (let i = 0;; i++) {
        let time = i + minTime;
        if (time > maxTime) {
            break;
        }
        time = time <= 12
            ? time
            : time - 12;
        result.push(
            <div key={"t" + i}>
                <div style={topDivStyle}>{time + ":00"}</div>
                <div style={btmDivStyle}>{time + ":30"}</div>
            </div>
        );
    }
    return result;
}

function getTimeRowLayout() : ReactGridLayout.Layout[] {
    const xOffset = 2;
    const result = Array < ReactGridLayout.Layout > ();
    for (let i = 0; i < 32; i++) {
        result.push({
            h: 1,
            i: ("t" + i),
            w: 2,
            x: i * 2 + xOffset,
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
        borderLeft: "1px solid",
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

function getDayColumnLayout() : ReactGridLayout.Layout[] {
    const yOffset = 2;
    const result = Array < ReactGridLayout.Layout > ();
    for (let i = 0; i < 8; i++) {
        result.push({
            h: 1,
            i: ("d" + i),
            w: 2,
            x: 0,
            y: i + yOffset
        });
    }
    return result;
}

export const TimetableView = (props : ITimetableViewProps) => {
    const child = [];
    child.push(getTimeRow());
    child.push(getDayColumn());
    const singleUnit : number = 1;
    let layouts : ReactGridLayout.Layout[] = [];
    layouts = layouts.concat(getTimeRowLayout());
    layouts = layouts.concat(getDayColumnLayout());
    const testSlot = new RawSlot();
    testSlot.SubjectName = "Hubungan Etnik";
    testSlot.SubjectCode = "MPU3113";
    testSlot.Type = "L";
    testSlot.Group = "2";
    testSlot.Room = "KB205";
    testSlot.WeekNumber = "1-14";

    return (
        <div style={divStyle}>
            <ReactGridLayout
                cols={32}
                maxRows={16}
                rowHeight={50}
                width={1200}
                layout={layouts}
                margin={[0, 0]}
                isDraggable={false}
                isResizable={false}
                autoSize={true}
                verticalCompact={true}>
                {child}
            </ReactGridLayout>
        </div>
    );
};

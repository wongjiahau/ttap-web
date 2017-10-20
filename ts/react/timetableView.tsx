import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import RawSlot from "../model/rawSlot";
import {SlotView} from "./slotView";

const divStyle : React.CSSProperties = {
    borderStyle: "solid"
};

export interface ITimetableViewProps {}

function getTimeRows() {
    const style : React.CSSProperties = {
        borderStyle: "solid",
        textAlign : "center",
    };
    const result = [];
    const minTime = 7;
    const maxTime = 21;
    for (let i = 0;; i++) {
        let time = i + minTime;
        if (time > maxTime) {
            break;
        }
        time = time <= 12 ? time : time - 12;
        result.push(
            <div key={"d" + i} >
                <div style={style} >{time + ":00"}</div>
                <div style={style} >{time + ":30"}</div>
            </div>
        );
    }
    return result;
}

function getTimeRowsLayout() : ReactGridLayout.Layout[] {
    const xOffset = 2;
    const result = Array < ReactGridLayout.Layout > ();
    for (let i = 0; i < 32; i++) {
        result.push({
            h: 1,
            i: ("d" + i),
            w: 2,
            x: i * 2 + xOffset,
            y: 0
        });
    }
    return result;
}

export const TimetableView = (props : ITimetableViewProps) => {
    const child = [];
    child.push(getTimeRows());
    const singleUnit : number = 1;
    let layouts : ReactGridLayout.Layout[] = [];
    layouts = layouts.concat(getTimeRowsLayout());
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
                maxRows={7}
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

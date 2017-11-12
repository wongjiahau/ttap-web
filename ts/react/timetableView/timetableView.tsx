import * as $ from "jquery";
import Button from "material-ui-next/Button";
import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import {TimePeriod} from "../../att/timePeriod";
import {RawSlot} from "../../model/rawSlot";
import { State } from "../../model/states/state";
import { Timetable } from "../../model/timetable";
import { Colors } from "../colors/colors";
import { GenerateSlotViews } from "./generateSlotViews";
import { GenerateStateViews } from "./generateStateView";
import { Skeleton } from "./skeleton";

const timetableViewWidth = 0.9 * $(window).width();

const divStyle : React.CSSProperties = {
    backgroundColor: Colors.WhiteSmoke,
    borderStyle: "solid",
    margin: "auto",
    width: timetableViewWidth
};

export interface ITimetableViewProps {
    timetable : Timetable;
    states : State[];
    handleSetTimeContraintAt ? : (state : State) => void;
    handleDesetTimeContraintAt ? : (state : State) => void;
}

export const TimetableView = (props : ITimetableViewProps) => {
    const skeleton = new Skeleton();
    if (props.timetable) {
        const rawSlots = RawSlot.GetBunch(props.timetable.HashIds);
        const slotViews = GenerateSlotViews(rawSlots);
        skeleton.Concat(slotViews);
    }
    if (props.states) {
        const stateViews = GenerateStateViews(props.states, props.handleSetTimeContraintAt, props.handleDesetTimeContraintAt);
        skeleton.Concat(stateViews);
    }

    return (
        <div id="timetable-view" style={divStyle}>
            <ReactGridLayout
                cols={((TimePeriod.Max.Hour - TimePeriod.Min.Hour) + 2) * 2 + 2}
                maxRows={16}
                rowHeight={50}
                width={timetableViewWidth}
                layout={skeleton.Layouts}
                margin={[0, 0]}
                isDraggable={false}
                isResizable={false}
                autoSize={true}
                verticalCompact={false}>
                {skeleton.Children}
            </ReactGridLayout>
        </div>
    );
};

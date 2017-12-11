import * as $ from "jquery";
import Button from "material-ui-next/Button";
import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import {TimePeriod} from "../../att/timePeriod";
import {RawSlot} from "../../model/rawSlot";
import {STCBox} from "../../model/states/stcBox";
import {Timetable} from "../../model/timetable";
import {Colors} from "../colors/colors";
import { GenerateSlotViewsAndDayColumn } from "./generateSlotViewsAndDayColumn";
import {GenerateStateViews} from "./generateStateView";
import {ISkeleton, Skeleton} from "./skeleton";

const getTimetableViewWidth = () => 0.9 * $(window).width();

export interface ITimetableViewProps {
    timetable : Timetable;
    states : STCBox[];
    handleSetTimeContraintAt ? : (state : STCBox) => void;
    handleDesetTimeContraintAt ? : (state : STCBox) => void;
}

export class TimetableView extends React.Component < ITimetableViewProps, { width : number } > {
    public constructor(props : ITimetableViewProps) {
        super(props);
        $(window).on("resize", this.handleWindowResizing);
        this.state = {
            width: getTimetableViewWidth()
        };
    }
    public render() {
        const skeleton = new Skeleton();
        if (this.props.timetable) {
            const rawSlots = RawSlot.GetBunch(this.props.timetable.HashIds);
            const slotViewsAndDayColumn = GenerateSlotViewsAndDayColumn(rawSlots);
            skeleton.Concat(slotViewsAndDayColumn);
            const horizontalDividers = GenerateHorizontalDividers(skeleton);
            skeleton.Concat(horizontalDividers);
        }
        if (this.props.states) {
            const stateViews = GenerateStateViews(this.props.states, this.props.handleSetTimeContraintAt, this.props.handleDesetTimeContraintAt);
            skeleton.Concat(stateViews);
            skeleton.Layouts = skeleton.Layouts.concat(GetStandardDayColumnLayout());
        }
        const divStyle : React.CSSProperties = {
            backgroundColor: Colors.WhiteSmoke,
            borderStyle: "solid",
            margin: "auto",
            width: this.state.width
        };
        return (
            <div id="timetable-view" style={divStyle}>
                <ReactGridLayout
                    cols={((TimePeriod.Max.Hour - TimePeriod.Min.Hour)) * 2 + 2}
                    maxRows={16}
                    rowHeight={50}
                    width={this.state.width}
                    layout={skeleton.Layouts}
                    margin={[0, 0]}
                    isDraggable={false}
                    isResizable={false}
                    autoSize={true}
                    preventCollision={true}
                    verticalCompact={false}>
                    {skeleton.Children}
                </ReactGridLayout>
            </div>
        );
    }

    public handleWindowResizing = () => {
        this.setState({width: getTimetableViewWidth()});
    }
}

export const GetStandardDayColumnLayout = () : ReactGridLayout.Layout[] => {
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
};

export const GenerateHorizontalDividers = (skeleton: ISkeleton) : ISkeleton => {
    const getDivider = (layoutId: string) => {
        const dividerStyle : React.CSSProperties = {
            borderBottom: "1px dotted #666",
            width: "100%"
        };
        return (
            <div key={layoutId} style={dividerStyle}/>
        );
    };
    const dividers = [];
    for (let i = 1; i <= 6; i++) {
        dividers.push(getDivider("divider" + i));
    }
    const dividersLayouts : ReactGridLayout.Layout[] = [];
    for (let i = 1; i <= 6; i++) {
        dividersLayouts.push({
            ...skeleton.Layouts.filter((x) => x.i === "d" + i)[0],
            i: ( "divider" + i ),
            w: ( TimePeriod.Max.Hour - TimePeriod.Min.Hour ) * 2,
            x: 2,
            static: true
        });
    }
    return {
        Children: dividers,
        Layouts: dividersLayouts
    };
};

/*
Note: For the horizontal borders to work, the synchronizeLayoutWithChildren function of ReactGirdLayout must be disabled,
It can be disabled by returning the initialLayout directly
in utils.js of ReactGridLayout folder
*/

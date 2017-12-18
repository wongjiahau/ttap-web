import * as $ from "jquery";
import Button from "material-ui-next/Button";
import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import {TimePeriod} from "../../att/timePeriod";
import {RawSlot} from "../../model/rawSlot";
import {STCBox} from "../../model/states/stcBox";
import {Timetable} from "../../model/timetable";
import {Colors} from "../colors/colors";
import {StackPanel} from "../panels/stackPanel";
import {TimetableSummaryView} from "../timetableSummaryView";
import {GenerateSlotViewsAndDayColumn} from "./generateSlotViewsAndDayColumn";
import {GenerateStateViews} from "./generateStateView";
import {Skeleton} from "./skeleton";

const getTimetableViewWidth = () => 0.9 * $(window).width();

interface ITimetableViewProps {
    timetable : Timetable;
    states : STCBox[];
    handleSetTimeContraintAt?: (state : STCBox) => void;
    handleDesetTimeContraintAt?: (state : STCBox) => void;
}

interface ITimetableViewState {
    width: number;
    isSummaryOpen: boolean;
}

export class TimetableView extends React.Component < ITimetableViewProps, ITimetableViewState> {
    public constructor(props : ITimetableViewProps) {
        super(props);
        $(window).on("resize", this.handleWindowResizing);
        this.state = {
            width: getTimetableViewWidth(),
            isSummaryOpen: false
        };
    }
    public render() {
        const skeleton = new Skeleton();
        if (this.props.timetable) {
            const rawSlots = RawSlot.GetBunch(this.props.timetable.HashIds);
            const slotViewsAndDayColumn = GenerateSlotViewsAndDayColumn(rawSlots);
            skeleton.Concat(slotViewsAndDayColumn);
        }
        if (this.props.states) {
            const stateViews = GenerateStateViews(this.props.states, this.props.handleSetTimeContraintAt, this.props.handleDesetTimeContraintAt);
            skeleton.Concat(stateViews);
            skeleton.Layouts = skeleton
                .Layouts
                .concat(GetStandardDayColumnLayout());
        }
        const divStyle : React.CSSProperties = {
            backgroundColor: Colors.WhiteSmoke,
            borderStyle:     "solid",
            fontFamily:      "roboto",
            margin:          "auto",
            position:        "relative",
            width:           this.state.width,
        };
        const buttonStyle: React.CSSProperties = {
            bottom:   "0",
            fontSize: "12px",
            position: "absolute",
            right:    "0",
        };
        return (
            <div id="timetable-view">
                <StackPanel orientation="vertical" horizontalAlignment="center">
                    <div style={divStyle}>
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
                            verticalCompact={false}>
                            {skeleton.Children}
                        </ReactGridLayout>
                        {this.props.timetable ?
                        <Button style={buttonStyle} onClick={this.handleOnClick}>
                            {this.state.isSummaryOpen ? "hide summary" : "show summary"}
                        </Button>
                        : null}
                    </div>
                    {
                        this.state.isSummaryOpen ?
                        <TimetableSummaryView Timetable={this.props.timetable}/>
                        : null
                    }
                </StackPanel>
            </div>
        );
    }

    public handleWindowResizing = () => {
        this.setState({width: getTimetableViewWidth()});
    }

    public handleOnClick = () => {
        this.setState({isSummaryOpen: !this.state.isSummaryOpen});
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

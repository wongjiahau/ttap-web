import IconClock from "material-ui-icons/Alarm";
import IconSave from "material-ui-icons/Save";
import IconViewList from "material-ui-icons/ViewList";
import Button from "material-ui-next/Button";
import * as React from "react";
import {STCBox} from "../model/states/stcBox";
import {Timetable} from "../model/timetable";
import {CounterView} from "./counterView";
import {StackPanel} from "./panels/stackPanel";
import {SaveTimetableDialog} from "./saveTimetableDialog";
import {SetTimeConstraintView} from "./setTimeConstraintView";
import {iconStyle} from "./styles";
import {TimetableView} from "./timetableView/timetableView";

const centerDivStyle : React.CSSProperties = {
    margin: "auto",
    textAlign: "center"
};

export interface ITimetableListViewStateProps {
    currentTimetable : Timetable;
    currentIndex : number; // non-zero based
    maxIndex : number; // non-zero based
    totalState : STCBox[];
    isSetTimeConstraintViewOpen : boolean;
    numberOfRemovedTimetables : number;
    numberOfRemainingTimetables : number;
}

export interface ITimetableListViewDispatchProps {
    handleGoToNext : () => void;
    handleGoToRandom : () => void;
    handleGoToPrevious : () => void;
    handleOpenSetTimeConstraintView : () => void;
    handleSetTimeConstraintAt : (state : STCBox) => void;
    handleDesetTimeConstraintAt : (state : STCBox) => void;
    handleCloseSetTimeConstraintView : () => void;
    handleOpenSaveTimetableDialog : () => void;
    handleOpenSlotsTable : () => void;
}

export interface ITimetableListViewProps extends
ITimetableListViewStateProps,
ITimetableListViewDispatchProps {}
export class TimetableListView extends React.Component < ITimetableListViewProps, {} > {
    public render() {
        return (
            <div>
                <div style={centerDivStyle}>
                    <TimetableView timetable={this.props.currentTimetable} states={null}/>
                </div>
                <StackPanel orientation="horizontal" horizontalAlignment="center">
                    <Button
                        raised={true}
                        color="primary"
                        onClick={this.props.handleOpenSetTimeConstraintView}>
                        <IconClock style={iconStyle}/>
                        Set time constraint
                    </Button>
                    <CounterView
                        current={this.props.currentIndex + 1}
                        maxInclusive={this.props.maxIndex + 1}
                        leftTooltip={"Go to previous timetable"}
                        middleTooltip={"Go to random timetable"}
                        rightTooltip={"Go to next timetable"}
                        handleClickLeft={this.props.handleGoToPrevious}
                        handleClickMiddle={this.props.handleGoToRandom}
                        handleClickRight={this.props.handleGoToNext}/>
                    <Button
                        raised={true}
                        color="primary"
                        onClick={this.props.handleOpenSaveTimetableDialog}>
                        <IconSave style={iconStyle}/>
                        Save as . . .
                    </Button>
                    <Button
                        raised={true}
                        color="primary"
                        onClick={this.props.handleOpenSlotsTable}>
                        <IconViewList style={iconStyle}/>
                        Show slots
                    </Button>
                </StackPanel>
                <SetTimeConstraintView
                    numberOfRemovedTimetables={this.props.numberOfRemovedTimetables}
                    numberOfRemainingTimetables={this.props.numberOfRemainingTimetables}
                    totalState={this.props.totalState}
                    isOpen={this.props.isSetTimeConstraintViewOpen}
                    handleSetTimeConstraintAt={this.props.handleSetTimeConstraintAt}
                    handleDesetTimeConstraintAt={this.props.handleDesetTimeConstraintAt}
                    handleCancel={this.props.handleCloseSetTimeConstraintView}/>
            </div>
        );
    }
}

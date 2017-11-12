import RaisedButton from "material-ui/RaisedButton";
import IconClock from "material-ui/svg-icons/action/alarm";
import IconSave from "material-ui/svg-icons/content/save";
import * as React from "react";
import {State} from "../model/states/state";
import {Timetable} from "../model/timetable";
import {CounterView} from "./counterView";
import {SaveTimetableDialog} from "./saveTimetableDialog";
import {SetTimeConstraintView} from "./setTimeConstraintView";
import {TimetableView} from "./timetableView/timetableView";

const centerDivStyle : React.CSSProperties = {
    margin: "auto",
    textAlign: "center"
};

const footerStyle : React.CSSProperties = {
    margin: "auto",
    textAlign: "center"
};

const footerButtonStyle : React.CSSProperties = {
    marginRight: "10px",
    marginTop: "10px"
};

export interface ITimetableListViewStateProps {
    currentTimetable : Timetable;
    currentIndex : number; // non-zero based
    maxIndex : number; // non-zero based
    isSaveDialogOpen : boolean;
    totalState : State[];
    isSetTimeConstraintViewOpen : boolean;
    numberOfRemovedTimetables: number;
    numberOfRemainingTimetables: number;
}

export interface ITimetableListViewDispatchProps {
    handleGoToNext : () => void;
    handleGoToPrevious : () => void;
    handleSaveAsTextFile : () => void;
    handleSaveAsPicture : () => void;
    handleSaveToGoogleCalendar : () => void;
    handleOpenSaveDialog : () => void;
    handleCloseSaveDialog : () => void;
    handleOpenSetTimeConstraintView : () => void;
    handleSetTimeConstraintAt : (state : State) => void;
    handleDesetTimeConstraintAt : (state : State) => void;
    handleCloseSetTimeConstraintView : () => void;
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
                <div style={footerStyle}>
                    <RaisedButton
                        primary={true}
                        style={footerButtonStyle}
                        onClick={this.props.handleOpenSetTimeConstraintView}
                        icon={< IconClock />}
                        label="Set time constraint"/>
                    <CounterView
                        current={this.props.currentIndex + 1}
                        maxInclusive={this.props.maxIndex + 1}
                        handleClickLeft={this.props.handleGoToPrevious}
                        handleClickRight={this.props.handleGoToNext}/>
                    <RaisedButton
                        onClick={this.props.handleOpenSaveDialog}
                        primary={true}
                        style={footerButtonStyle}
                        icon={< IconSave />}
                        label="Save as . . ."/>
                </div>
                <SaveTimetableDialog
                    isOpen={this.props.isSaveDialogOpen}
                    handleClose={this.props.handleCloseSaveDialog}
                    handleSaveAsPicture={this.props.handleSaveAsPicture}
                    handleSaveAsTextFile={this.props.handleSaveAsTextFile}
                    handleSaveToGoogleCalendar={this.props.handleSaveToGoogleCalendar}/>
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

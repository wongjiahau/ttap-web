import RaisedButton from "material-ui/RaisedButton";
import IconClock from "material-ui/svg-icons/action/alarm";
import IconSave from "material-ui/svg-icons/content/save";
import * as React from "react";
import {Timetable} from "../model/timetable";
import {CounterView} from "./counterView";
import {TimetableView} from "./timetableView";

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
}

export interface ITimetableListViewDispatchProps {
    handleGoToNext : () => void;
    handleGoToPrevious : () => void;
    handleSave : () => void;
    handleSetTimeConstraint : () => void;
}

export interface ITimetableListViewProps extends ITimetableListViewStateProps,
ITimetableListViewDispatchProps {}
export class TimetableListView extends React.Component < ITimetableListViewProps, {} > {
    public render() {
        return (
            <div>
                <div style={centerDivStyle}>
                    <TimetableView/>
                </div>
                <div style={footerStyle}>
                    <RaisedButton
                        primary={true}
                        style={footerButtonStyle}
                        onClick={this.props.handleSetTimeConstraint}
                        icon={< IconClock />}
                        label="Set time constraint"/>
                    <CounterView
                        current={this.props.currentIndex + 1}
                        maxInclusive={this.props.maxIndex + 1}
                        handleClickLeft={this.props.handleGoToPrevious}
                        handleClickRight={this.props.handleGoToNext}/>
                    <RaisedButton
                        onClick={this.props.handleSave}
                        primary={true}
                        style={footerButtonStyle}
                        icon={< IconSave />}
                        label="Save as . . ."/>
                </div>
            </div>
        );
    }
}

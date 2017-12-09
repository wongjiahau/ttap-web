import IconClock from "material-ui-icons/Alarm";
import IconSave from "material-ui-icons/Save";
import IconViewList from "material-ui-icons/ViewList";
import Button from "material-ui-next/Button";
import * as React from "react";
import { Key } from "../enums/keyCodeEnum";
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
}

export interface ITimetableListViewDispatchProps {
    handleGoToNext : () => void;
    handleGoToRandom : () => void;
    handleGoToPrevious : () => void;
    handleOpenSetTimeConstraintView : () => void;
    handleOpenSaveTimetableDialog : () => void;
    handleOpenSlotsTable : () => void;
}

export interface ITimetableListViewProps extends
ITimetableListViewStateProps,
ITimetableListViewDispatchProps {}
export class TimetableListView extends React.Component < ITimetableListViewProps, {} > {
    public render() {
        return (
            <div onKeyDown={this.checkKeys} tabIndex={0}>
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
                        leftTooltip={"Go to previous timetable (Left arrow)"}
                        middleTooltip={"Go to random timetable (R)"}
                        rightTooltip={"Go to next timetable (Right arrow)"}
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
            </div>
        );
    }

    private checkKeys = (e) => {
        // refer https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
        e = e || window.event;
        if (e.keyCode === Key.LeftArrow || e.keyCode === Key.UpArrow) {
            this.props.handleGoToPrevious();
        } else if (e.keyCode === Key.RightArrow || e.keyCode === Key.DownArrow) {
            this.props.handleGoToNext();
        } else if (e.keyCode === Key.R) {
            this.props.handleGoToRandom();
        }
    }
}

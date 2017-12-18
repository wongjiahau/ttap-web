import * as $ from "jquery";
import IconClock from "material-ui-icons/Alarm";
import IconGrid from "material-ui-icons/GridOn";
import IconSave from "material-ui-icons/Save";
import IconViewList from "material-ui-icons/ViewList";
import {Switch} from "material-ui-next";
import Button from "material-ui-next/Button";
import * as React from "react";
import {Key} from "../enums/keyCodeEnum";
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

const switchStyle : React.CSSProperties = {
    marginRight: 0.03 * $(window).width()
};

export interface ITimetableListViewStateProps {
    currentIndex:     number; // non-zero based
    currentTimetable: Timetable;
    isSbcwTurnedOn:   boolean;
    isSummaryOpen:    boolean;
    maxIndex:         number; // non-zero based
}

export interface ITimetableListViewDispatchProps {
    handleGoToNext:                  () => void;
    handleGoToPrevious:              () => void;
    handleGoToRandom:                () => void;
    handleOpenSaveTimetableDialog:   () => void;
    handleOpenSbcwDialog:            () => void;
    handleOpenSetTimeConstraintView: () => void;
    handleOpenSlotsTable:            () => void;
    handleToggleIsOpenOfSummary: () => void;
    handleTurnOffSBCW:               () => void;
}

export interface ITimetableListViewProps extends
ITimetableListViewStateProps,
ITimetableListViewDispatchProps {}
export class TimetableListView extends React.Component < ITimetableListViewProps, {} > {
    public render() {
        if (this.props.currentTimetable === undefined) {
            return Logo();
        }
        return (
            <div onKeyDown={this.checkKeys} tabIndex={0}>
                <div style={switchStyle}>
                    <StackPanel horizontalAlignment="right" orientation="horizontal">
                        Search by considering week number
                        <Switch
                            style={switchStyle}
                            checked={this.props.isSbcwTurnedOn}
                            onChange={this.handleSwitchToggled}/>
                    </StackPanel>
                </div>
                <StackPanel orientation="vertical" horizontalAlignment="center">
                    <TimetableView
                        timetable={this.props.currentTimetable}
                        states={null}
                        isSummaryOpen={this.props.isSummaryOpen}
                        handleToggleIsOpenOfSummary={this.props.handleToggleIsOpenOfSummary}/>
                    <StackPanel orientation="horizontal">
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
                        <Button raised={true} color="primary" onClick={this.props.handleOpenSlotsTable}>
                            <IconViewList style={iconStyle}/>
                            Show slots
                        </Button>
                    </StackPanel>
                </StackPanel>

            </div>
        );
    }

    private handleSwitchToggled = (event : object, checked : boolean) => {
        if (checked) {
            this
                .props
                .handleOpenSbcwDialog();
        } else {
            this
                .props
                .handleTurnOffSBCW();
        }
    }
    private checkKeys = (e) => {
        // refer
        // https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-ja
        // v ascript
        e = e || window.event;
        if (e.keyCode === Key.LeftArrow || e.keyCode === Key.UpArrow) {
            this
                .props
                .handleGoToPrevious();
        } else if (e.keyCode === Key.RightArrow || e.keyCode === Key.DownArrow) {
            this
                .props
                .handleGoToNext();
        } else if (e.keyCode === Key.R) {
            this
                .props
                .handleGoToRandom();
        }
    }
}

function Logo() {
    const gridIconStyle : React.CSSProperties = {
        // width: "50px", height: "50px",
    };
    const stackPanelStyle : React.CSSProperties = {
        position: "absolute",
        right: "1%",
        bottom: "1%",
        // fontSize: "36px"
    };
    return (
        <StackPanel orientation="horizontal" style={stackPanelStyle}>
            <IconGrid style={gridIconStyle}/>
            TTAP
        </StackPanel>
    );
}

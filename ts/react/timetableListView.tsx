import Button from "@material-ui/core/Button";
import IconClock from "@material-ui/icons/Alarm";
import IconGrid from "@material-ui/icons/GridOn";
import IconSave from "@material-ui/icons/Save";
import IconViewList from "@material-ui/icons/ViewList";
import * as React from "react";
import { ObjectStore } from "../dataStructure/objectStore";
import {Key} from "../enums/keyCodeEnum";
import { IGroupedTimetable } from "../model/groupedTimetable";
import { RawSlot } from "../model/rawSlot";
import { ISlotViewModel } from "../model/slotViewModel";
import {CounterView} from "./counterView";
import {StackPanel} from "./panels/stackPanel";
import { NO_OPERATION } from "./setTimeConstraintView";
import {iconStyle} from "./styles";
import {TimetableView} from "./timetableView/timetableView";

export interface ITimetableListViewStateProps {
    currentIndex:       number; // non-zero based
    currentSubIndex:    number; // nonzero based
    currentTimetable:   IGroupedTimetable | null;
    alternativeSlots:   ISlotViewModel[];
    isSummaryOpen:      boolean;
    isShowingAlternativeSlotOf: ISlotViewModel | null;
    maxIndex:           number; // non-zero based
    slotViewModelStore: ObjectStore<ISlotViewModel>;
}

export interface ITimetableListViewDispatchProps {
    handleGoToNextTimetable:         ()     => void;
    handleGoToPreviousTimetable:     ()     => void;
    handleGoToRandomTimetable:       ()     => void;
    handleGoToNextSubTimetable:      ()     => void;
    handleGoToPreviousSubTimetable:  ()     => void;
    handleOpenSaveTimetableDialog:   ()     => void;
    handleOpenSetTimeConstraintView: ()     => void;
    handleOpenSlotsTable:            ()     => void;
    handleToggleIsOpenOfSummary:     ()     => void;
    handleSelectSlotChoice:          (slotUid: number, newSlotChoice : number) => void;
    handleShowAlternateSlot:         (s: ISlotViewModel) => void;
    handleGoToThisAlternateSlot:     (slotUid: number) => void;
}

export interface ITimetableListViewProps extends
    ITimetableListViewStateProps,
    ITimetableListViewDispatchProps {}

export class TimetableListView extends React.Component < ITimetableListViewProps, {} > {
    public render() {
        if (!this.props.slotViewModelStore) {
            return Logo();
        }
        const slotsToBeRendered =
            this.props.currentTimetable !== null ?
            this.props.slotViewModelStore.GetBunch(
                this.props.currentTimetable.ListOfSlotUids[this.props.currentSubIndex]
            ) : [];

        return (
            <div style={{display: 'grid'}} onKeyDown={this.checkKeys} tabIndex={0}>
                {/* Balloon css */} <link rel="stylesheet" href="balloon.min.css"/>
                <div style={{display: 'grid', gridGap: '12px', padding: '12px 0'}}>
                    <TimetableView
                        slots={slotsToBeRendered}
                        alternateSlots={this.props.alternativeSlots}
                        isShowingAlternativeSlots={this.props.alternativeSlots.length > 0}
                        isShowingAlternativeSlotOf={this.props.isShowingAlternativeSlotOf}
                        stcBoxes={null}
                        handleDesetTimeContraintAt={NO_OPERATION}
                        handleSetTimeContraintAt={NO_OPERATION}
                        isSummaryOpen={this.props.isSummaryOpen}
                        handleSelectSlotChoice={this.props.handleSelectSlotChoice}
                        handleShowAlternateSlot={this.props.handleShowAlternateSlot}
                        handleGoToThisAlternateSlot={this.props.handleGoToThisAlternateSlot}
                        handleToggleIsOpenOfSummary={this.props.handleToggleIsOpenOfSummary}/>
                    <div style={{display: 'grid', justifyContent: 'center', gridAutoFlow: 'column', 
                        alignItems: 'center', gridGap: '8px'}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.props.handleOpenSetTimeConstraintView}>
                            <IconClock style={iconStyle}/>
                            Set time constraint
                        </Button>
                        <CounterView
                            currentIndex={this.props.currentIndex + 1}
                            currentSubIndex={this.props.currentSubIndex + 1}
                            maxIndex={this.props.maxIndex + 1}
                            leftTooltip={"Go to previous timetable (Left arrow)"}
                            middleTooltip={"Go to random timetable (R)"}
                            rightTooltip={"Go to next timetable (Right arrow)"}
                            upTooltip={"Go to previous similar timetable (Up arrow)"}
                            downTooltip={"Go to next similar timetable (Down arrow)"}
                            handleClickLeft={this.props.handleGoToPreviousTimetable}
                            handleClickMiddle={this.props.handleGoToRandomTimetable}
                            handleClickRight={this.props.handleGoToNextTimetable}
                            handleClickUp={this.props.handleGoToPreviousSubTimetable}
                            handleClickDown={this.props.handleGoToNextSubTimetable}
                            />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.props.handleOpenSaveTimetableDialog}>
                            <IconSave style={iconStyle}/>
                            Save as . . .
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.props.handleOpenSlotsTable}>
                            <IconViewList style={iconStyle}/>
                            Show slots
                        </Button>
                    </div>
                </div>

            </div>
        );
    }

    private checkKeys = (e: any) => {
        // refer
        // https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-ja
        // v ascript
        e = e || window.event;
        switch (e.keyCode) {
            case Key.LeftArrow:  this.props.handleGoToPreviousTimetable();    break;
            case Key.RightArrow: this.props.handleGoToNextTimetable();        break;
            case Key.DownArrow:  this.props.handleGoToNextSubTimetable();     break;
            case Key.UpArrow:    this.props.handleGoToPreviousSubTimetable(); break;
            case Key.R:          this.props.handleGoToRandomTimetable();      break;
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

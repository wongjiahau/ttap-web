import IconClock from "material-ui-icons/Alarm";
import IconGrid from "material-ui-icons/GridOn";
import IconSave from "material-ui-icons/Save";
import IconViewList from "material-ui-icons/ViewList";
import Button from "material-ui/Button";
import * as React from "react";
import { ObjectStore } from "../dataStructure/objectStore";
import {Key} from "../enums/keyCodeEnum";
import { RawSlot } from "../model/rawSlot";
import { ISlotViewModel } from "../model/slotViewModel";
import {Timetable} from "../model/timetable";
import {CounterView} from "./counterView";
import {StackPanel} from "./panels/stackPanel";
import {iconStyle} from "./styles";
import {TimetableView} from "./timetableView/timetableView";
import { Z_NO_COMPRESSION } from "zlib";
import { NO_OPERATION } from "./setTimeConstraintView";

export interface ITimetableListViewStateProps {
    currentIndex:       number; // non-zero based
    currentTimetable:   Timetable | null;
    alternateSlots:     ISlotViewModel[];
    isSummaryOpen:      boolean;
    maxIndex:           number; // non-zero based
    slotViewModelStore: ObjectStore<ISlotViewModel>;
}

export interface ITimetableListViewDispatchProps {
    handleGoToNext:                  ()     => void;
    handleGoToPrevious:              ()     => void;
    handleGoToRandom:                ()     => void;
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
            this.props.slotViewModelStore.GetBunch(this.props.currentTimetable.Uids) :
            [];

        return (
            <div onKeyDown={this.checkKeys} tabIndex={0}>
                {/* Balloon css */} <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.2.4/balloon.min.css"/>
                <StackPanel orientation="vertical" horizontalAlignment="center">
                    <TimetableView
                        slots={slotsToBeRendered}
                        alternateSlots={this.props.alternateSlots}
                        states={null}
                        handleDesetTimeContraintAt={NO_OPERATION}
                        handleSetTimeContraintAt={NO_OPERATION}
                        isSummaryOpen={this.props.isSummaryOpen}
                        handleSelectSlotChoice={this.props.handleSelectSlotChoice}
                        handleShowAlternateSlot={this.props.handleShowAlternateSlot}
                        handleGoToThisAlternateSlot={this.props.handleGoToThisAlternateSlot}
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

    private checkKeys = (e: any) => {
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

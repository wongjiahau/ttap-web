
import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popover } from "@material-ui/core";
import * as React from "react";

import NineDotIcon from "@material-ui/icons/Apps";
import LockIcon from "@material-ui/icons/Lock";

// @ts-ignore
import {Tooltip} from "react-tippy";
import {ISlotViewModel} from "../model/slotViewModel";
import { BeautifySubjectName } from "../util/beautifySubjectName";
import {GetInitial} from "../util/getInitial";
import { invertColor } from "../util/invertColor";
import { ArcherElement } from 'react-archer';
import { ParseDay } from "../att/day";
import { TimePeriod } from "../att/timePeriod";


export interface ISlotViewProps {
    slot : ISlotViewModel;
    color : string;
    handleSelectSlotChoice       : (slotUid : number, newSlotChoice : number) => void;
    handleShowAlternateSlot     ?: (s: ISlotViewModel) => void;
    handleGoToThisAlternateSlot ?: (sourceSlotUid: number, destinationSlotUid: number) => void;
    isShowingAlternativeSlot: boolean;
    isShowingAlternativeSlotsOfThisSlot: boolean;
    alternativeSlots: ISlotViewModel[]
}

interface ISlotViewState {
    anchorEl : any;
    isMenuOpen: boolean;
}

export class SlotView extends React.Component < ISlotViewProps,
ISlotViewState > {
    public constructor(props: ISlotViewProps) {
        super(props);
        this.state = {
            anchorEl: null,
            isMenuOpen: false,
        };
    }

    public render() {
        const { slot, color, isShowingAlternativeSlot, isShowingAlternativeSlotsOfThisSlot } = this.props;
        let slotStyle: React.CSSProperties = {
            color: invertColor(color),
            backgroundColor: color,
            opacity: (isShowingAlternativeSlot && slot.SourceSlotUid === undefined && !isShowingAlternativeSlotsOfThisSlot)
                      ? 0.5 : 1.0
        };
        if (slot.AlternativeSlots.length > 0) {
            slotStyle = {
                ...slotStyle,
                borderStyle: "dashed",
                cursor: "pointer", /*a.k.a. the hand, so it looks like its clickable*/
            };
        }
        if (slot.SourceSlotUid !== undefined) {// add border glow
            slotStyle = {
                ...slotStyle,
                color: "white",
                backgroundColor: "black",
                border: "1px solid rgb(86, 180, 239)",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px rgba(82, 168, 236, 0.6)",
                cursor: "pointer"
            };
        }
        const {handleShowAlternateSlot, handleGoToThisAlternateSlot} = this.props;
        const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
            if (handleShowAlternateSlot !== undefined && slot.AlternativeSlots.length > 0) {
                handleShowAlternateSlot(slot);

                // The following code is to toggle display menu
                // Temporarily disabled because still not sure how to implement slot locking
                // this.setState({
                //     anchorEl: event.currentTarget,
                //     isMenuOpen: true
                // });
            }
            if (handleGoToThisAlternateSlot !== undefined && slot.SourceSlotUid !== undefined) {
                handleGoToThisAlternateSlot(slot.SourceSlotUid, slot.Uid);
            }
        };
        const className /* Refer index.css */
            = "slot-view"
            + (slot.AlternativeSlots.length > 0 ? " hvr-glow get-user-attention" : "");

        const showPopover = false; // Currently this line is disable
                                   // Why popover is needed?
                                   //   it is for implementing slot-locking feature
                                   //   but I haven't figured out how to do it yet

        const venue = slot.Room[slot.CurrentChoice] || slot.ClassMode

        return (
            <Tooltip arrow={true} position="left" html={tooltipTitle(slot, isShowingAlternativeSlotsOfThisSlot)}>
                <div className={className} style={slotStyle} onClick={clickHandler}
                    aria-owns={Boolean(this.state.anchorEl) ? "popover" : undefined}
                    aria-haspopup="true"
                    >
                    {getSlotContent(slot)}
                    {!isShowingAlternativeSlot &&
                        <React.Fragment>
                            <br/> {venue} <br/>
                        </React.Fragment>}
                    {(isShowingAlternativeSlotsOfThisSlot || isShowingAlternativeSlot) &&
                        <ArcherElement 
                            id={'slot' + slot.Uid.toString()}
                            relations={
                                isShowingAlternativeSlotsOfThisSlot
                                    ? this.props.alternativeSlots.map(alternativeSlot => ({
                                        targetId: 'slot' + alternativeSlot.Uid.toString(),
                                        ...(
                                            ParseDay(alternativeSlot.Day) > ParseDay(slot.Day)
                                                ? {
                                                    targetAnchor: 'top' as 'top',
                                                    sourceAnchor: 'bottom' as 'bottom'
                                                }
                                            : ParseDay(alternativeSlot.Day) < ParseDay(slot.Day)
                                                ? {
                                                    targetAnchor: 'bottom' as 'bottom',
                                                    sourceAnchor: 'top' as 'top'
                                                } 
                                            : TimePeriod.Parse(alternativeSlot.TimePeriod).StartTime.Hour 
                                                > TimePeriod.Parse(slot.TimePeriod).StartTime.Hour
                                                ? {
                                                    targetAnchor: 'left' as 'left',
                                                    sourceAnchor: 'right' as 'right'
                                                }
                                                : {
                                                    targetAnchor: 'right' as 'right',
                                                    sourceAnchor: 'left' as 'left',
                                                }
                                        )
                                    }))
                                    : []
                            }
                            >
                            {venue}
                        </ArcherElement>}
                    {slot.WeekNumber[slot.CurrentChoice]}
                </div>
                
                {!showPopover ? null :
                <Popover
                    id="popover"
                    open={this.state.isMenuOpen}
                    anchorEl={this.state.anchorEl}
                    anchorReference="anchorEl"
                    anchorPosition={{ top: 200, left: 400 }}
                    anchorOrigin={{ vertical: "center", horizontal: "center", }}
                    transformOrigin={{ vertical: "top", horizontal: "left", }}
                    onClose={() => this.setState({
                        anchorEl: null,
                        isMenuOpen: false,
                    })}
                    >
                    <Paper>
                        <MenuList>
                            {slot.AlternativeSlots.length === 0 ? null : (
                                <MenuItem onClick={() => {
                                    if (handleShowAlternateSlot) {
                                        handleShowAlternateSlot(slot);
                                        this.setState({
                                            anchorEl: null,
                                            isMenuOpen: false,
                                        });
                                    }
                                }}>
                                    <ListItemIcon>
                                        <NineDotIcon/>
                                    </ListItemIcon>
                                    <ListItemText inset={true} primary={
                                        isShowingAlternativeSlot && isShowingAlternativeSlotsOfThisSlot ?
                                         "Hide alternative slots" :
                                         "Show alternative slots"}/>
                                </MenuItem>)}

                            <MenuItem onClick={() => {
                                this.setState({anchorEl: null, isMenuOpen: false});
                            }}>
                                <ListItemIcon>
                                    <LockIcon/>
                                </ListItemIcon>
                                <ListItemText inset={true} primary={"Lock this slot"}/>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </Popover>}
            </Tooltip>

        );
    }
}

function tooltipTitle(s : ISlotViewModel, isShowingAlternativeSlotOfThisSlot: boolean) {
    const style : React.CSSProperties = {
        fontSize: "18px"
    };
    return (
        <div style={style}>
            {BeautifySubjectName(s.SubjectName)}
            <br/>
            [{s.SubjectCode}]
            <br/> {
            (s.SourceSlotUid !== undefined ? "(Click to go to this slot)" :
            (s.AlternativeSlots.length === 0 ? "" :
            (isShowingAlternativeSlotOfThisSlot ? "(Click to hide alternative slots)" :
            "(Click show alternative slots)")))}
        </div>
    );
}

export function getSlotContent (slot : ISlotViewModel) {
    return GetInitial(slot.SubjectName) + "-" + slot.Type + slot.Group[slot.CurrentChoice] + " ";
}

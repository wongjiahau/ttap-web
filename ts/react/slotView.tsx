import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Popover } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as React from "react";

import NineDotIcon from "@material-ui/icons/Apps";
import LockIcon from "@material-ui/icons/Lock";

// @ts-ignore
import {Tooltip} from "react-tippy";
import {ISlotViewModel} from "../model/slotViewModel";
import { BeautifySubjectName } from "../util/beautifySubjectName";
import {GetInitial} from "../util/getInitial";
import {Colors} from "./colors/colors";

export interface ISlotViewProps {
    slot : ISlotViewModel;
    color : Colors;
    handleSelectSlotChoice       : (slotUid : number, newSlotChoice : number) => void;
    handleShowAlternateSlot     ?: (s: ISlotViewModel) => void;
    handleGoToThisAlternateSlot ?: (slotUid: number) => void;
    isShowingAlternativeSlot: boolean;
}

interface ISlotViewState {
    anchorEl : any;
    isShowingAlternativeSlotsOfThisSlot: boolean;
    isMenuOpen: boolean;
}

export class SlotView extends React.Component < ISlotViewProps,
ISlotViewState > {
    public constructor(props: ISlotViewProps) {
        super(props);
        this.state = {
            anchorEl: null,
            isMenuOpen: false,
            isShowingAlternativeSlotsOfThisSlot: true
        };
    }

    public render() {
        const { slot, color, isShowingAlternativeSlot } = this.props;
        const {isShowingAlternativeSlotsOfThisSlot} = this.state;
        let slotStyle: React.CSSProperties = {
            background: color,
            cursor: "pointer", /*a.k.a. the hand, so it looks like its clickable*/
            opacity: (isShowingAlternativeSlot && !slot.IsAlternativeSlot && !isShowingAlternativeSlotsOfThisSlot)
                      ? 0.5 : 1.0
        };
        if (slot.AlternativeSlots.length > 0) {
            slotStyle = {
                ...slotStyle,
                borderStyle: "dashed"
            };
        }
        if (slot.IsAlternativeSlot) {// add border glow
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
            if (handleShowAlternateSlot !== undefined) {
                this.setState({
                    anchorEl: event.currentTarget,
                    isMenuOpen: true
                });
            }
            if (handleGoToThisAlternateSlot !== undefined) {
                handleGoToThisAlternateSlot(slot.Uid);
            }
        };
        const className /* Refer index.css */
            = "slot-view"
            + (slot.AlternativeSlots.length > 0 ? " hvr-glow get-user-attention" : "");

        return (
            <Tooltip arrow={true} position="left" html={tooltipTitle(slot)}>
                <div className={className} style={slotStyle} onClick={clickHandler}
                    aria-owns={Boolean(this.state.anchorEl) ? "popover" : undefined}
                    aria-haspopup="true"
                    >
                    <b>
                        {getSlotContent(slot)}
                    </b>
                    <br/> {slot.Room[slot.CurrentChoice]}
                    <br/> {slot.WeekNumber[slot.CurrentChoice]}
                </div>
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
                                        isShowingAlternativeSlot ?
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
                </Popover>
            </Tooltip>

        );
    }

    public componentDidUpdate() {
        if(this.state.isMenuOpen) {
            console.log(this.state.isMenuOpen);
            console.log(this.props.slot)
        }
    }

}

function tooltipTitle(s : ISlotViewModel) {
    const style : React.CSSProperties = {
        fontSize: "18px"
    };
    return (
        <div style={style}>
            {BeautifySubjectName(s.SubjectName)}
            <br/>
            [{s.SubjectCode}]
            <br/>
            {s.IsAlternativeSlot ?
            "(Click to go to this slot)" :
            "(Click to show options)"}
        </div>
    );
}

export function getSlotContent (slot : ISlotViewModel) {
    return GetInitial(slot.SubjectName) + "-" + slot.Type + slot.Group[slot.CurrentChoice] + " ";
}

import MoreVertIcon from "material-ui-icons/MoreVert";
import ButtonBase from "material-ui/ButtonBase";
import Menu, {MenuItem} from "material-ui/Menu";
import Typography from "material-ui/Typography";
import * as React from "react";
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
}

interface ISlotViewState {
    anchorEl : any;
}

const borderThickness = "0.5px solid black";
const buttonBaseStyle : React.CSSProperties = {
    borderRadius: "5px",
    border: borderThickness, // add border to it so it looks like it is unmovable
    fontFamily:              "roboto",
    fontSize:                "13.5px",
    width:                   "100%",
    textAlign:               "center",
};

export class SlotView extends React.Component < ISlotViewProps,
ISlotViewState > {
    public constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    public render() {
        const slot = this.props.slot;
        let buttonStyle = {
            ...buttonBaseStyle,
            background: this.props.color,
        };
        if (this.props.slot.AlternativeSlots.length > 0) {
            buttonStyle = {
                ...buttonStyle,
                cursor: "pointer" // a.k.a. the hand, so it looks like its clickable
            };
        }
        if (slot.IsAlternativeSlot) {// add border glow
            buttonStyle = {
                ...buttonStyle,
                border: "1px solid rgb(86, 180, 239)",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px rgba(82, 168, 236, 0.6)",
                cursor: "pointer"
            };
        }
        const clickHandler = () => {
            if (this.props.handleShowAlternateSlot !== undefined) {
                if (this.props.slot.AlternativeSlots.length > 0) {
                    this.props.handleShowAlternateSlot(this.props.slot);
                }
            }
            if (this.props.handleGoToThisAlternateSlot !== undefined) {
                this.props.handleGoToThisAlternateSlot(this.props.slot.Uid);
            }
        };
        return (
            <Tooltip arrow={true} position="left" html={tooltipTitle(slot)}>
                <div
                    className={this.props.slot.AlternativeSlots.length > 0 ? "hvr-glow shake-it-baby" : ""}
                    style={buttonStyle}
                    onClick={clickHandler}
                    // onMouseUp={clickHandler}
                    >
                    <b>
                        {getSlotContent(slot)} {slot.AlternativeSlots.length > 0 ? "*" : ""}
                        {slot.Group.length > 1
                            ? this.arrowDownButton()
                            : ""}
                    </b>
                    <br/> {slot.Room[slot.CurrentChoice]}
                    <br/> {slot.WeekNumber[slot.CurrentChoice]}
                    <Menu
                        id="long-menu"
                        anchorEl={this.state.anchorEl}
                        onClose={() => {
                            this.setState({anchorEl: null});
                            this.props.handleSelectSlotChoice(slot.Uid, slot.CurrentChoice);
                        }}
                        open={Boolean(this.state.anchorEl)}>
                        {this.menuItem(slot)}
                    </Menu>
                </div>
            </Tooltip>

        );
    }

    public menuItem = (slot : ISlotViewModel) => {
        const clickHandler = (index) => {
            this.setState({anchorEl: null});
            this.props.handleSelectSlotChoice(slot.Uid, index);
        };
        return slot
            .Group
            .map((option, index) => (
                <MenuItem
                    selected={index === slot.CurrentChoice}
                    key={option}
                    onClick={() => clickHandler(index)}>
                    {slot.Type + option}
                </MenuItem>
            ));
    }
    public arrowDownButton = () => {
        const triangle : React.CSSProperties = {
            borderLeft:  "3px solid transparent",
            borderRight: "3px solid transparent",
            borderTop:   "3px solid black",
            height:      "0",
            width:       "0"
        };
        const buttonStyle : React.CSSProperties = {
            height:   "10px",
            padding:  "0px",
            position: "absolute",
            right:    "2px",
            top:      "2px",
            width:    "10px",
        };
        const clickHandler = (event) => this.setState({anchorEl: event.currentTarget});
        return <button
            className="arrow-down-button"
            aria-label="More"
            aria-owns={this.state.anchorEl
            ? "long-menu"
            : null}
            aria-haspopup="true"
            style={buttonStyle}
            onClick={clickHandler}>
            <div style={triangle}/>
        </button>;
    }

}

function tooltipTitle(s : ISlotViewModel) {
    const style : React.CSSProperties = {
        fontSize: "12px"
    };
    return (
        <div style={style}>
            {BeautifySubjectName(s.SubjectName)}
            <br/>
            [{s.SubjectCode}]
            <br/>
            {s.IsAlternativeSlot ? "(Click to pick this slot)" : ""}
            {s.AlternativeSlots.length > 0 ? "(Click to show alternative slots)" : ""}
        </div>
    );
}

export function getSlotContent (slot : ISlotViewModel) {
    return GetInitial(slot.SubjectName) + "-" + slot.Type + slot.Group[slot.CurrentChoice] + " ";
}

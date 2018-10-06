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
const borderRadius = "5px";
let buttonBaseStyle : React.CSSProperties = {
    borderBottom:            borderThickness,
    borderBottomLeftRadius:  borderRadius,
    borderBottomRightRadius: borderRadius,
    borderLeft:              borderThickness,
    borderRight:             borderThickness,
    borderTop:               borderThickness,
    borderTopLeftRadius:     borderRadius,
    borderTopRightRadius:    borderRadius,
    fontFamily:              "roboto",
    fontSize:                "13.5px",
    width:                   "100%",
    textAlign:               "center",
    cursor:                  "pointer"
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
        buttonBaseStyle = {
            ...buttonBaseStyle,
            background: this.props.color,
        };
        const slot = this.props.slot;
        const isAlternateSlot = this.props.handleGoToThisAlternateSlot !== undefined;
        return (
            <Tooltip arrow={true} position="left" html={tooltipTitle(slot, isAlternateSlot)}>
                <div
                    style={buttonBaseStyle}
                    onClick={() => {
                        if (this.props.handleShowAlternateSlot !== undefined) {
                            this.props.handleShowAlternateSlot(this.props.slot);
                        }
                        if (this.props.handleGoToThisAlternateSlot !== undefined) {
                            this.props.handleGoToThisAlternateSlot(this.props.slot.Uid);
                        }
                    }}>
                    <b>
                        {getSlotContent(slot)}
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

function tooltipTitle(s : ISlotViewModel, isAlternateSlot: boolean) {
    const style : React.CSSProperties = {
        fontSize: "12px"
    };
    return (
        <div style={style}>
            {BeautifySubjectName(s.SubjectName)}
            <br/>
            [{s.SubjectCode}]
            <br/>
            {isAlternateSlot ?
            "(Click to pick this slot)" :
            "(Click to show alternative slots)"}
        </div>
    );
}

export function getSlotContent (slot : ISlotViewModel) {
    return GetInitial(slot.SubjectName) + "-" + slot.Type + slot.Group[slot.CurrentChoice] + " ";
}

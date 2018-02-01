import MoreVertIcon from "material-ui-icons/MoreVert";
import ButtonBase from "material-ui/ButtonBase";
import Menu, {MenuItem} from "material-ui/Menu";
import Typography from "material-ui/Typography";
import * as React from "react";
import {Tooltip} from "react-tippy";
import {Beautify, GetInitial} from "../helper";
import {ISlotViewModel} from "../model/slotViewModel";
import {Colors} from "./colors/colors";

const divStyle : React.CSSProperties = {
    width: "100%",
    fontFamily: "roboto"
};

export interface ISlotViewProps {
    slot : ISlotViewModel;
    color : Colors;
    handleSelectSlotChoice : (slotUid : number, newSlotChoice : number) => void;
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
    width:                   "100%"
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
            background: this.props.color
        };
        const slot = this.props.slot;
        return (
            <Tooltip arrow={true} position="left" html={tooltipTitle(slot)}>
                <ButtonBase
                    disableRipple={true}
                    style={buttonBaseStyle}
                    onClick={() => console.log(this.props.slot)}>
                    <div style={divStyle}>
                        <b>
                            {this.slotContent(slot)}
                            {slot.Group.length > 1
                                ? this.arrowDownButton()
                                : ""}
                        </b>
                        <br/> {slot.Room[slot.CurrentChoice]}
                        <br/> {slot.WeekNumber[slot.CurrentChoice]}
                    </div>
                    <Menu
                        id="long-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}>
                        {this.menuItem(slot)}
                    </Menu>
                </ButtonBase>
            </Tooltip>

        );
    }

    public slotContent = (slot : ISlotViewModel) => {
        return GetInitial(slot.SubjectName) + "-" + slot.Type + slot.Group[slot.CurrentChoice] + " ";
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
            width: "10px",
            height: "10px",
            padding: "0px"
        };
        const clickHandler = (event) => this.setState({anchorEl: event.currentTarget});
        return <button
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
            {Beautify(s.SubjectName)}
            <br/>
            [{s.SubjectCode}]
        </div>
    );
}

import MoreVertIcon from "material-ui-icons/MoreVert";
import ButtonBase from "material-ui/ButtonBase";
import Menu, {MenuItem} from "material-ui/Menu";
import Typography from "material-ui/Typography";
import * as React from "react";
import {Tooltip} from "react-tippy";
import {Beautify, GetInitial} from "../helper";
import {IGeneralizedSlot} from "../model/generalizedSlot";
import {Colors} from "./colors/colors";

const divStyle : React.CSSProperties = {
    width: "100%",
    fontFamily: "roboto"
};

export interface ISlotViewProps {
    slot : IGeneralizedSlot;
    color : Colors;
}

interface ISlotViewState {
    anchorEl: any;
}

const borderThickness = "0.5px solid black";
const borderRadius = "5px";

export class SlotView extends React.Component < ISlotViewProps, ISlotViewState > {
    public constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    public render() {
        const buttonBaseStyle : React.CSSProperties = {
            background: this.props.color,
            borderTop: borderThickness,
            borderLeft: borderThickness,
            borderRight: borderThickness,
            borderBottom: borderThickness,
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
            width: "100%"
        };
        const slot = this.props.slot;
        return (
            <Tooltip arrow={true} position="bottom" html={tooltipTitle(slot)}>
                <ButtonBase
                    disableRipple={true}
                    style={buttonBaseStyle}
                    onClick={() => console.log(this.props.slot)}>
                    <div style={divStyle}>
                        <b>
                            {GetInitial(slot.SubjectName) + "-" + slot.Type + slot.Group[slot.CurrentChoice] + " "
}
                            {slot.Group.length > 1
                                ? this.arrowDownButton((event) => { this.setState({anchorEl : event.currentTarget}); })
                                : ""}
                        </b>
                        <br/> {slot.Room[slot.CurrentChoice]}
                        <br/> {slot.WeekNumber[slot.CurrentChoice]}
                    </div>
                    <Menu
                        id="long-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        >
                            {slot.Group.map((option) => (
                                <MenuItem key={option} onClick={() => {this.setState({anchorEl: null}); }}>
                                {slot.Type + option}
                                </MenuItem>
                        ))}
                    </Menu>
                </ButtonBase>
            </Tooltip>

        );
    }
    public arrowDownButton = (clickHandler) => {
        const triangle : React.CSSProperties = {
            borderLeft: "3px solid transparent",
            borderRight: "3px solid transparent",
            borderTop: "3px solid black",
            height: "0",
            width: "0"
        };
        const buttonStyle : React.CSSProperties = {
            width: "10px",
            height: "10px",
            padding: "0px"
        };
        return <button
                    aria-label="More"
                    aria-owns={this.state.anchorEl ? "long-menu" : null}
                    aria-haspopup="true"
                    style={buttonStyle} onClick={clickHandler}>
                <div style={triangle}/>
            </button>;
    }

}

function tooltipTitle(s : IGeneralizedSlot) {
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

import ButtonBase from "material-ui-next/ButtonBase";
import Tooltip from "material-ui-next/Tooltip";
import * as React from "react";
import {Beautify, GetInitial} from "../helper";
import {RawSlot} from "../model/rawSlot";
import {Colors} from "./colors/colors";

const divStyle : React.CSSProperties = {
    width: "100%"
};

export interface ISlotViewProps {
    slot : RawSlot;
    color : Colors;
}

export class SlotView extends React.Component < ISlotViewProps, {} > {
    public render() {
        const buttonBaseStyle : React.CSSProperties = {
            background:              this.props.color,
            borderTop:               "0.5px solid black",
            borderLeft:              "0.5px solid black",
            borderRight:             "0.5px solid black",
            borderBottom:            "0.5px solid black",
            borderTopLeftRadius:     "2px",
            borderBottomLeftRadius:  "2px",
            borderTopRightRadius:    "2px",
            borderBottomRightRadius: "2px",
            width:                   "100%"
        };
        const slot = this.props.slot;
        return (
            <Tooltip
                title={Beautify(slot.SubjectName) + " [" + slot.SubjectCode + "]"}
                placement="bottom">
                <ButtonBase style={buttonBaseStyle}>
                    <div style={divStyle}>
                        <b>
                            {GetInitial(slot.SubjectName) + " " + slot.Type + "(" + slot.Group + ")"}
                        </b>
                        <br/> {slot.Room}
                        <br/> {slot.WeekNumber}
                    </div>
                </ButtonBase>
            </Tooltip>
        );
    }
}

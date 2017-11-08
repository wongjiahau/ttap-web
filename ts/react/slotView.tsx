import ButtonBase from "material-ui-next/ButtonBase";
import Tooltip from "material-ui-next/Tooltip";
import * as React from "react";
import {GetInitial} from "../helper";
import {RawSlot} from "../model/rawSlot";

const buttonBaseStyle : React.CSSProperties = {
    background:              "yellow",
    border:                  "0.65px solid grey",
    borderTopLeftRadius:     "5px",
    borderBottomLeftRadius:  "5px",
    borderTopRightRadius:    "5px",
    borderBottomRightRadius: "5px",
    width:                   "100%",
};

const divStyle : React.CSSProperties = {
    width : "100%",
};

export interface ISlotViewProps {
    slot : RawSlot;
}

export class SlotView extends React.Component < ISlotViewProps, {} > {
    public render() {
        const slot = this.props.slot;
        return (
            <Tooltip title="hello this is a tooltip" placement="bottom">
                <ButtonBase style={buttonBaseStyle}>
                    <div style={divStyle}>
                        {GetInitial(slot.SubjectName) + " " + slot.Type + "(" + slot.Group + ")"}
                        <br/> {slot.Room}
                        <br/> {slot.WeekNumber}
                    </div>
                </ButtonBase>
            </Tooltip>
        );
    }
}

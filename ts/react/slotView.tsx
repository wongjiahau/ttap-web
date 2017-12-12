import ButtonBase from "material-ui-next/ButtonBase";
import Typography from "material-ui-next/Typography";
import * as React from "react";
import { Tooltip } from "react-tippy";
import {Beautify, GetInitial} from "../helper";
import {RawSlot} from "../model/rawSlot";
import {Colors} from "./colors/colors";

const divStyle : React.CSSProperties = {
    width: "100%",
    fontFamily: "roboto"
};

export interface ISlotViewProps {
    slot : RawSlot;
    color : Colors;
}

export class SlotView extends React.Component < ISlotViewProps, {} > {
    public render() {
        const buttonBaseStyle : React.CSSProperties = {
            background: this.props.color,
            borderTop: "0.5px solid black",
            borderLeft: "0.5px solid black",
            borderRight: "0.5px solid black",
            borderBottom: "0.5px solid black",
            borderTopLeftRadius: "2px",
            borderBottomLeftRadius: "2px",
            borderTopRightRadius: "2px",
            borderBottomRightRadius: "2px",
            width: "100%"
        };
        const slot = this.props.slot;
        return (
            <Tooltip arrow={true} html={tooltipTitle(slot)}>
                <ButtonBase
                    style={buttonBaseStyle}
                    onClick={() => console.log(this.props.slot)}>
                    <div style={divStyle}>
                        <b>
                            {GetInitial(slot.SubjectName) + "-" + slot.Type + slot.Group}
                        </b>
                        <br/> {slot.Room}
                        <br/> {slot.WeekNumber}
                    </div>
                </ButtonBase>
            </Tooltip>

        );
    }

}

function tooltipTitle(s: RawSlot)  {
    const style : React.CSSProperties = {
        fontSize: "12px"
    };
    return (
        <div style={style}>
            {Beautify(s.SubjectName)} <br/>
            [{s.SubjectCode}]
        </div>
    );
}

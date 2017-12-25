import ButtonBase from "material-ui/ButtonBase";
import Typography from "material-ui/Typography";
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

const borderThickness = "0px solid black";
const borderRadius = "5px";

export class SlotView extends React.Component < ISlotViewProps, {} > {
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

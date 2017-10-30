import Tooltip from "material-ui-next/Tooltip";
import * as React from "react";
import {GetInitial} from "../helper";
import {RawSlot} from "../model/rawSlot";

const divStyle : React.CSSProperties = {
    background: "yellow"
};

export interface ISlotViewProps {
    slot : RawSlot;
}

export class SlotView extends React.Component < ISlotViewProps, {} > {
    public render() {
        const slot = this.props.slot;
        return (
            <Tooltip title="hello this is a tooltip" placement="bottom" >
                <div style={divStyle}>
                    {GetInitial(slot.SubjectName)}
                    <br/> {slot.Room}
                    <br/> {slot.WeekNumber}
                </div>
            </Tooltip>
        );
    }
}

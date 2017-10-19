import * as React from "react";
import RawSlot from "../model/rawSlot";

export interface ISlotViewProps {
    slot: RawSlot;
}

// 'HelloProps' describes the shape of props. State is never set so we use the
// '{}' type.
export class SlotView extends React.Component < ISlotViewProps, {} > {
    public render() {
        const slot = this.props.slot;
        return (
            <div>
                <h1>{slot.SubjectName}</h1>
                <h2>{slot.Room}</h2>
                <h2>{slot.WeekNumber}</h2>
            </div>
        );
    }
}

const sortBy = require("lodash.sortby");
import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import {ParseDay} from "../../att/day";
import {TimePeriod} from "../../att/timePeriod";
import { IGeneralizedSlot } from "../../model/generalizedSlot";
import {GenerateColorScheme} from "../colors/generateColorScheme";
import {SlotView} from "../slotView";
import { GenerateSlotAndDayLayouts } from "./generateSlotAndDayLayouts";
import {ISkeleton, Skeleton} from "./skeleton";

export function GenerateSlotViewsAndDayColumn(slots : IGeneralizedSlot[]) : ISkeleton {
    const colorSchemes = GenerateColorScheme(slots);
    slots = sortBy(slots, [(o) => ParseDay(o.Day)]);
    const slotViews = slots.map((x, index) => {
        const color = colorSchemes.filter((c) => c.SubjectCode === x.SubjectCode)[0].Color;
        return (
            <div key={"s" + index}><SlotView slot={x} color={color}/></div>
        );
    });
    const layouts = GenerateSlotAndDayLayouts(slots, Skeleton.X_OFFSET, Skeleton.Y_OFFSET);
    const slotAndDayLayouts = layouts[0].concat(layouts[1]);
    return {Children: slotViews, Layouts: slotAndDayLayouts};
}

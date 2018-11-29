const sortBy = require("lodash.sortby");
import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import {ParseDay} from "../../att/day";
import {TimePeriod} from "../../att/timePeriod";
import { ISlotViewModel } from "../../model/slotViewModel";
import { Colors } from "../colors/colors";
import {GenerateColorScheme} from "../colors/generateColorScheme";
import {SlotView} from "../slotView";
import { GenerateSlotAndDayLayouts } from "./generateSlotAndDayLayouts";
import {ISkeleton, Skeleton} from "./skeleton";

export function GenerateAlternateSlotViewsAndDayColumn(
    slots : ISlotViewModel[],
    handleSelectSlotChoice: (slotUid : number, newSlotChoice : number) => void,
    handleGoToThisAlternateSlot: (slotUid : number) => void,
) : ISkeleton {
    slots = sortBy(slots, [(o: ISlotViewModel) => ParseDay(o.Day)]);
    const slotViews = slots.map((x, index) => {
        return (
            // "as" means "Alternate Slots"
            <div key={"as" + index}>
                <SlotView
                    slot={x}
                    isShowingAlternativeSlot={true}
                    color={Colors.White}
                    handleSelectSlotChoice={handleSelectSlotChoice}
                    handleGoToThisAlternateSlot={handleGoToThisAlternateSlot}
                    />
            </div>
        );
    });
    const layouts = GenerateSlotAndDayLayouts(slots, Skeleton.X_OFFSET, Skeleton.Y_OFFSET);
    const slotAndDayLayouts = layouts[0].concat(layouts[1]);
    return {Children: slotViews, Layouts: slotAndDayLayouts};
}

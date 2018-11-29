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

export function GenerateSlotViewsAndDayColumn(
    slots : ISlotViewModel[],
    selectSlotChoiceHandler: (slotUid : number, newSlotChoice : number) => void,
    goToThisAlternativeSlotHandler: (slotUid: number) => void,
    showAlternateSlotHandler: (s: ISlotViewModel) => void,
    isShowingAlternativeSlotOf: ISlotViewModel | null
) : ISkeleton {
    const colorSchemes = GenerateColorScheme(slots);
    slots = sortBy(slots, [(o: ISlotViewModel) => ParseDay(o.Day)]);
    const slotViews = slots.map((x, index) => {
        const color =
            x.IsAlternativeSlot ?
            Colors.White :
            colorSchemes.filter((c) => c.SubjectCode === x.SubjectCode)[0].Color;

        return (
            // "s" means "Slot"
            <div key={"s" + index}>
                <SlotView
                    slot={x}
                    color={color}
                    isShowingAlternativeSlotsOfThisSlot={isShowingAlternativeSlotOf ? x.Uid === isShowingAlternativeSlotOf.Uid : false}
                    isShowingAlternativeSlot={isShowingAlternativeSlotOf !== null}
                    handleSelectSlotChoice={selectSlotChoiceHandler}
                    handleShowAlternateSlot={!x.IsAlternativeSlot ? showAlternateSlotHandler : () => {/* do nothing*/}}
                    handleGoToThisAlternateSlot={x.IsAlternativeSlot ? goToThisAlternativeSlotHandler : () => {/* do nothing*/}}
                    />
            </div>
        );
    });
    const layouts = GenerateSlotAndDayLayouts(slots, Skeleton.X_OFFSET, Skeleton.Y_OFFSET);
    const slotAndDayLayouts = layouts[0].concat(layouts[1]);
    return {Children: slotViews, Layouts: slotAndDayLayouts};
}

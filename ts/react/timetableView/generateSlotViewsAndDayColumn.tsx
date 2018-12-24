const sortBy = require("lodash.sortby");
import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import {ParseDay} from "../../att/day";
import {TimePeriod} from "../../att/timePeriod";
import { ISlotViewModel } from "../../model/slotViewModel";
import { ColorHash } from "../../util/colorhash";
import { Colors } from "../colors/colors";
import {GenerateColorScheme} from "../colors/generateColorScheme";
import { NO_OPERATION } from "../setTimeConstraintView";
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
    slots = sortBy(slots, [(o: ISlotViewModel) => ParseDay(o.Day)]);
    const slotViews = slots.map((x, index) => {
        return (
            // "s" means "Slot"
            <div key={"s" + index}>
                <SlotView
                    slot={x}
                    color={ColorHash(x.SubjectCode)}
                    isShowingAlternativeSlotsOfThisSlot={isShowingAlternativeSlotOf ? x.Uid === isShowingAlternativeSlotOf.Uid : false}
                    isShowingAlternativeSlot={isShowingAlternativeSlotOf !== null}
                    handleSelectSlotChoice={selectSlotChoiceHandler}
                    handleShowAlternateSlot={!x.IsAlternativeSlot ? showAlternateSlotHandler : NO_OPERATION}
                    handleGoToThisAlternateSlot={x.IsAlternativeSlot ? goToThisAlternativeSlotHandler : NO_OPERATION}
                    />
            </div>
        );
    });
    const layouts = GenerateSlotAndDayLayouts(slots, Skeleton.X_OFFSET, Skeleton.Y_OFFSET);
    const slotAndDayLayouts = layouts[0].concat(layouts[1]);
    return {Children: slotViews, Layouts: slotAndDayLayouts};
}

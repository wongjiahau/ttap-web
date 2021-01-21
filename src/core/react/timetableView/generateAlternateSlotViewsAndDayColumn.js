"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortBy = require("lodash.sortby");
const React = require("react");
const day_1 = require("../../att/day");
const slotView_1 = require("../slotView");
const generateSlotAndDayLayouts_1 = require("./generateSlotAndDayLayouts");
const skeleton_1 = require("./skeleton");
function GenerateAlternateSlotViewsAndDayColumn(slots, handleSelectSlotChoice, handleGoToThisAlternateSlot, isShowingAlternativeSlotOf) {
    slots = sortBy(slots, [(o) => day_1.ParseDay(o.Day)]);
    const slotViews = slots.map((x, index) => {
        return (
        // "as" means "Alternate Slots"
        React.createElement("div", { key: "as" + index },
            React.createElement(slotView_1.SlotView, { slot: x, isShowingAlternativeSlot: true, isShowingAlternativeSlotsOfThisSlot: x.Uid === isShowingAlternativeSlotOf.Uid, color: "White" /* White */, handleSelectSlotChoice: handleSelectSlotChoice, handleGoToThisAlternateSlot: handleGoToThisAlternateSlot, alternativeSlots: slots.filter(slot => slot.SourceSlotUid !== undefined) })));
    });
    const layouts = generateSlotAndDayLayouts_1.GenerateSlotAndDayLayouts(slots, skeleton_1.Skeleton.X_OFFSET, skeleton_1.Skeleton.Y_OFFSET);
    const slotAndDayLayouts = layouts[0].concat(layouts[1]);
    return { Children: slotViews, Layouts: slotAndDayLayouts };
}
exports.GenerateAlternateSlotViewsAndDayColumn = GenerateAlternateSlotViewsAndDayColumn;
//# sourceMappingURL=generateAlternateSlotViewsAndDayColumn.js.map
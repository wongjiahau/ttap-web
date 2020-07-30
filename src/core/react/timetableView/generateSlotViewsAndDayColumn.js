"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortBy = require("lodash.sortby");
const React = require("react");
const day_1 = require("../../att/day");
const colorhash_1 = require("../../util/colorhash");
const setTimeConstraintView_1 = require("../setTimeConstraintView");
const slotView_1 = require("../slotView");
const generateSlotAndDayLayouts_1 = require("./generateSlotAndDayLayouts");
const skeleton_1 = require("./skeleton");
function GenerateSlotViewsAndDayColumn(slots, selectSlotChoiceHandler, goToThisAlternativeSlotHandler, showAlternateSlotHandler, isShowingAlternativeSlotOf) {
    slots = sortBy(slots, [(o) => day_1.ParseDay(o.Day)]);
    const slotViews = slots.map((x, index) => {
        return (
        // "s" means "Slot"
        React.createElement("div", { key: "s" + index },
            React.createElement(slotView_1.SlotView, { slot: x, color: colorhash_1.ColorHash(x.SubjectCode), isShowingAlternativeSlotsOfThisSlot: isShowingAlternativeSlotOf ? x.Uid === isShowingAlternativeSlotOf.Uid : false, isShowingAlternativeSlot: isShowingAlternativeSlotOf !== null, handleSelectSlotChoice: selectSlotChoiceHandler, handleShowAlternateSlot: !x.IsAlternativeSlot ? showAlternateSlotHandler : setTimeConstraintView_1.NO_OPERATION, handleGoToThisAlternateSlot: x.IsAlternativeSlot ? goToThisAlternativeSlotHandler : setTimeConstraintView_1.NO_OPERATION, alternativeSlots: slots.filter(slot => slot.IsAlternativeSlot) })));
    });
    const layouts = generateSlotAndDayLayouts_1.GenerateSlotAndDayLayouts(slots, skeleton_1.Skeleton.X_OFFSET, skeleton_1.Skeleton.Y_OFFSET);
    const slotAndDayLayouts = layouts[0].concat(layouts[1]);
    return { Children: slotViews, Layouts: slotAndDayLayouts };
}
exports.GenerateSlotViewsAndDayColumn = GenerateSlotViewsAndDayColumn;
//# sourceMappingURL=generateSlotViewsAndDayColumn.js.map
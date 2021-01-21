"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortBy = require("lodash.sortby");
const day_1 = require("../../att/day");
const timePeriod_1 = require("../../att/timePeriod");
/**
 * @export
 * @param {ISlotViewModel[]} slots must be sorted according to Day
 * @param {number} xOffset
 * @param {number} yOffset
 * @returns {[ReactGridLayout.Layout[], ReactGridLayout.Layout[]]} [0] is the SlotsLayout, [1] is the DayColumnLayouts
 */
function GenerateSlotAndDayLayouts(rawSlots, xOffset, yOffset) {
    const dayRows = GetDayRows();
    const slotLayouts = [];
    for (let h = 0; h < rawSlots.length; h++) {
        const slot = rawSlots[h];
        const Y = day_1.ParseDay(slot.Day) - 1;
        const timePeriod = timePeriod_1.TimePeriod.Parse(slot.TimePeriod);
        let extraYOffset = 0;
        for (let i = 0; i < dayRows[Y].timeMatrix.length; i++) {
            const matrix = dayRows[Y].timeMatrix[i];
            if ((timePeriod.BinaryData & matrix) === 0) {
                extraYOffset = i;
                if (i > 0 && matrix === 0) {
                    for (let j = Y + 1; j <= 6; j++) {
                        dayRows[j].rowIndex++;
                    }
                }
                dayRows[Y].timeMatrix[i] |= timePeriod.BinaryData;
                break;
            }
        }
        const [X, W] = GetXandW(timePeriod);
        const layout = {
            h: 1,
            i: "s" + h,
            w: W,
            x: X + xOffset,
            y: dayRows[Y].rowIndex + yOffset + extraYOffset
        };
        slotLayouts.push(layout);
    }
    return [slotLayouts, GetDayColumnLayouts(dayRows)];
}
exports.GenerateSlotAndDayLayouts = GenerateSlotAndDayLayouts;
exports.MAXIMUM_NUMBER_OF_OVERLAPPING_SLOTS_PER_ROW = 20;
function GetDayRows() {
    const dayRows = [];
    const NUMBER_OF_DAY_PER_WEEK = 7;
    for (let i = 0; i < NUMBER_OF_DAY_PER_WEEK; i++) {
        dayRows.push({
            rowIndex: i,
            timeMatrix: new Array(exports.MAXIMUM_NUMBER_OF_OVERLAPPING_SLOTS_PER_ROW).fill(0)
        });
    }
    return dayRows;
}
exports.GetDayRows = GetDayRows;
function GetDayColumnLayouts(dayRows) {
    const result = [];
    result.push({ x: 0, w: 2, i: "d0", y: 0, h: 1 }); // for the extra box on top of day column
    for (let i = 0; i < dayRows.length - 1; i++) {
        result.push({
            x: 0,
            w: 2,
            i: "d" + (i + 1),
            y: dayRows[i].rowIndex + 1,
            h: dayRows[i + 1].rowIndex - dayRows[i].rowIndex
        });
    }
    result.push({
        x: 0,
        w: 2,
        i: "d7",
        y: dayRows[6].rowIndex + 1,
        h: 1
    });
    return result;
}
exports.GetDayColumnLayouts = GetDayColumnLayouts;
function GetXandW(timePeriod) {
    let x = (timePeriod.StartTime.Hour - timePeriod_1.TimePeriod.Min.Hour) * 2;
    if (timePeriod.StartTime.Minute === 30) {
        x++;
    }
    const w = timePeriod
        .EndTime
        .Minus(timePeriod.StartTime)
        .TotalHours() * 2;
    return [x, w];
}
exports.GetXandW = GetXandW;
//# sourceMappingURL=generateSlotAndDayLayouts.js.map
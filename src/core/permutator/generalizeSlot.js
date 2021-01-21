"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clone = require("lodash.clone");
/**
 * This function will generalize slots that have the same Day, Group, Time, Type and SubjectCode.
 * However, it will not generalize slos that have relatives
 *  Assumptions:
 *  - All slots that have relatives have the same Slot.Number
 *  - Two slots are consider relatives if they have the same SubjectCode, Type and Group
 *  Purpose:
 *  - To reduce search space of FindTimetable function
 * @export
 * @param {RawSlot[]} slots
 * @returns {RawSlot[]}
 */
function GeneralizeSlot(originalSlots) {
    const slots = originalSlots.map(clone);
    const results = new Array();
    results.push(slots[0]);
    let generalized;
    for (let i = 1; i < slots.length; i++) {
        const s = slots[i];
        if (slots.some((x) => x.Number === s.Number && x.Uid !== s.Uid)) {
            results.push(s);
            continue;
        }
        generalized = false;
        for (let j = 0; j < results.length; j++) {
            const r = results[j];
            if (CanBeGeneralize(s, r)) {
                if (results.some((x) => x.Number === r.Number && x.Uid !== r.Uid)) {
                    continue;
                }
                r.Number += "/" + s.Number;
                r.Group += "/" + s.Group;
                r.WeekNumber += "/" + s.WeekNumber;
                r.Room += "/" + s.Room;
                generalized = true;
                break;
            }
        }
        if (!generalized) {
            results.push(s);
        }
    }
    return results;
}
exports.GeneralizeSlot = GeneralizeSlot;
function CanBeGeneralize(x, y) {
    return x.SubjectCode === y.SubjectCode && x.Type === y.Type && x.Day === y.Day && x.TimePeriod === y.TimePeriod;
}
exports.CanBeGeneralize = CanBeGeneralize;
//# sourceMappingURL=generalizeSlot.js.map
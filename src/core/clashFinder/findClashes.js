"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Combinatorics = require("js-combinatorics");
const parseRawSlotToSlot_1 = require("../parser/parseRawSlotToSlot");
const parseSlotToTinySlot_1 = require("../parser/parseSlotToTinySlot");
const findTimetable_1 = require("../permutator/findTimetable");
/**
 * This function is impure, it will modify the input.
 * @export
 * @param {Subject[]} subjects,
 * Each subject object will be modified after this function.
 */
function FindClashes(subjects, rawSlotStore) {
    if (subjects.length < 2) {
        throw new Error("How is it possible to have clashes if there are only one subject selected?");
    }
    const combinations = Combinatorics
        .combination(subjects, 2)
        .toArray();
    for (let i = 0; i < combinations.length; i++) {
        const subject1 = combinations[i][0];
        const subject2 = combinations[i][1];
        if (subject1.ClashingCounterparts.some((code) => code === subject2.Code)) {
            continue;
        }
        const slotUids = [].concat.apply([], [subject1, subject2].map((x) => x.SlotUids));
        const slots = rawSlotStore.GetBunch(slotUids);
        const timetables = findTimetable_1.FindTimetable(parseSlotToTinySlot_1.ParseSlotToTinySlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(slots)));
        if (timetables.length === 0) {
            subject1.ClashingCounterparts.push(subject2.Code);
            subject2.ClashingCounterparts.push(subject1.Code);
        }
    }
}
exports.FindClashes = FindClashes;
//# sourceMappingURL=findClashes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_saver_1 = require("file-saver");
const slot_1 = require("../../../model/slot");
const slotViewModel_1 = require("../../../model/slotViewModel");
const bigSlot_1 = require("../../../permutator/bigSlot");
const matrix_1 = require("../../../permutator/matrix");
const timetableSummary_1 = require("./../../../model/timetableSummary");
const saveTimetable_1 = require("./saveTimetable");
const uniq = require("lodash.uniq");
/**
 * Find the sister slots of s.
 * Two slots are considered sister if they have the same Day, same TimePeriod and and same Type.
 * Also, sister slots are those who doesn't intersect with dayTimeMatrix of currentSlots
 *
 * @export
 * @param {IRawSlot[]} slotsOfCurrentTimetable
 * @param {IRawSlot[]} allSlots
 * @returns {IRawSlot[]} where each slots are appended with Group of sister slots
 */
function findSisterSlots(slotsOfCurrentTimetable, allSlots) {
    const currentSlotsAsBigSlots = slotsOfCurrentTimetable.map((x) => bigSlot_1.newBigSlot(slot_1.CreateSlotFromRaw(x)));
    const uncompressedDayTimeMatrix = currentSlotsAsBigSlots
        .reduce((acc, next) => matrix_1.AppendMatrix(acc, next.DayTimeMatrix), currentSlotsAsBigSlots[0].DayTimeMatrix);
    return slotsOfCurrentTimetable.map((x) => {
        const sisters = allSlots
            .filter((y) => x.Uid !== y.Uid
            && x.SubjectCode === y.SubjectCode
            && x.Type === y.Type
            && x.Day === y.Day
            && x.TimePeriod === y.TimePeriod
            && !matrix_1.GotIntersection(uncompressedDayTimeMatrix, bigSlot_1.newBigSlot(slot_1.CreateSlotFromRaw(y)).DayTimeMatrix));
        return Object.assign({}, x, { Group: x.Group + (sisters.length > 0 ? uniq(sisters.map((y) => " or " + y.Group)).join("") : "") });
    });
}
exports.findSisterSlots = findSisterSlots;
class SaveTimetableAsTextFile extends saveTimetable_1.SaveTimetable {
    Save(timetable, rawSlotStore) {
        const allSlots = rawSlotStore.GetAll();
        const currentSlots = rawSlotStore.GetBunch(timetable.SlotUids);
        const slotsWithSisters = findSisterSlots(currentSlots, allSlots);
        const data = "NOTE:\r\n"
            + "\tThe subjects below are ordered by their slots scarcity (a.k.a rareness).\r\n"
            + "\tSo, you should bid the TOPMOST subject first.\r\n\r\n"
            + new timetableSummary_1.TimetableSummary(slotViewModel_1.CreateSlotViewModels(slotsWithSisters))
                .SortByScarcity(rawSlotStore.GetAll())
                .ToString();
        const file = new File([data], "MyTimetable.txt", {
            type: "text/plain;charset=utf-8"
        });
        file_saver_1.saveAs(file);
    }
    SaveType() {
        return "text file";
    }
}
exports.SaveTimetableAsTextFile = SaveTimetableAsTextFile;
//# sourceMappingURL=saveTimetableAsTextFile.js.map
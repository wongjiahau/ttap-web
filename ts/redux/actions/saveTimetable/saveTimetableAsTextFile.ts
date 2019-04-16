import {
    saveAs
} from "file-saver";
import { ObjectStore } from "../../../dataStructure/objectStore";
import { IRawSlot } from "../../../model/rawSlot";
import { CreateSlotFromRaw } from "../../../model/slot";
import { CreateSlotViewModels } from "../../../model/slotViewModel";
import { Timetable } from "../../../model/timetable";
import { BigSlot } from "../../../permutator/bigSlot";
import { AppendMatrix, GotIntersection } from "../../../permutator/matrix";
import {
    TimetableSummary
} from "./../../../model/timetableSummary";
import {
    SaveTimetable
} from "./saveTimetable";
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
export function findSisterSlots(slotsOfCurrentTimetable: IRawSlot[], allSlots: IRawSlot[])
    : IRawSlot[] {
    const currentSlotsAsBigSlots = slotsOfCurrentTimetable.map((x) => new BigSlot(CreateSlotFromRaw(x)));
    const uncompressedDayTimeMatrix = currentSlotsAsBigSlots
        .reduce((acc, next) => AppendMatrix(acc, next.DayTimeMatrix), currentSlotsAsBigSlots[0].DayTimeMatrix);

    return slotsOfCurrentTimetable.map((x) => {
        const sisters = allSlots
            .filter((y) =>
                x.Uid !== y.Uid
                && x.SubjectCode === y.SubjectCode
                && x.Type === y.Type
                && x.Day === y.Day
                && x.TimePeriod === y.TimePeriod
                && !GotIntersection(uncompressedDayTimeMatrix, new BigSlot(CreateSlotFromRaw(y)).DayTimeMatrix));
        return {
            ...x,
            Group: x.Group + (sisters.length > 0 ? uniq(sisters.map((y) => " or " + y.Group)).join("") : "")
        };
    });
}

export class SaveTimetableAsTextFile extends SaveTimetable {
    protected Save(timetable: Timetable, rawSlotStore: ObjectStore<IRawSlot>) {
        const allSlots = rawSlotStore.GetAll();
        const currentSlots = rawSlotStore.GetBunch(timetable.SlotUids);
        const slotsWithSisters = findSisterSlots(currentSlots, allSlots);
        const data = "NOTE:\r\n"
        + "\tThe subjects below are ordered by their slots scarcity (a.k.a rareness).\r\n"
        + "\tSo, you should bid the TOPMOST subject first.\r\n\r\n"
        + new TimetableSummary(CreateSlotViewModels(slotsWithSisters))
            .SortByScarcity(rawSlotStore.GetAll())
            .ToString();

        const file = new File([data], "MyTimetable.txt", {
            type: "text/plain;charset=utf-8"
        });
        saveAs(file);
    }

    protected SaveType(): string {
        return "text file";
    }
}

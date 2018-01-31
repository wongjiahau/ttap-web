import * as Combinatorics from "js-combinatorics";
const sortBy = require("lodash.sortby");
const uniqBy = require("lodash.uniqby");
import { request } from "https";
import {
    RawSlot
} from "../model/rawSlot";
import {
    GetDefinitelyOccupiedState
} from "../model/states/generateTotalState";
import {
    Subject
} from "../model/subject";
import {
    ParseRawSlotToSlot
} from "../parser/parseRawSlotToSlot";
import {
    ParseSlotToTinySlot
} from "../parser/parseSlotToTinySlot";
import {
    FindTimetable
} from "../permutator/findTimetable";
import {
    GotIntersection
} from "../permutator/state";

/**
 * This function is impure, it will modify the input.
 * @export
 * @param {Subject[]} subjects,
 * Each subject object will be modified after this function.
 */
export function FindClashes(subjects: Subject[], correspondingSlots: RawSlot[]): void {
    if (subjects.length < 2) {
        throw new Error("How is it possible to have clashes if there are only one subject selected?");
    }
    const combinations = Combinatorics.combination(subjects, 2).toArray();
    for (let i = 0; i < combinations.length; i++) {
        const subject1 = combinations[i][0];
        const subject2 = combinations[i][1];
        if (subject1.ClashingCounterparts.some((code) => code === subject2.Code)) {
            continue;
        }
        const timetables = FindTimetable(ParseSlotToTinySlot(ParseRawSlotToSlot(correspondingSlots)));
        if (timetables.length === 0) {
            subject1.ClashingCounterparts.push(subject2.Code);
            subject2.ClashingCounterparts.push(subject1.Code);
        }
    }
}

const concat = require("lodash.concat");
const sortBy = require("lodash.sortby");
import {RawSlot} from "../model/rawSlot";
import {Timetable} from "../model/timetable";
import {ParseRawSlotToSlot} from "../parser/parseRawSlotToSlot";
import {ParseSlotToBigSlot} from "../parser/parseSlotToBigSlot";
import {ParseSlotToTinySlot} from "../parser/parseSlotToTinySlot";
import {BoundedInt} from "./boundedInt";
import {GenerateIndices} from "./generateIndices";
import {Increment} from "./increment";
import {Partitionize} from "./partitionize";
import {Append, GotIntersection} from "./state";
import {IOptimizedSlot} from "./tinySlot";

interface ISnapshot {
    SlotIds : number[];
    State : number[];
}

const LIMIT = 1000000;
export function FindTimetable(input : IOptimizedSlot[]) : Timetable[] {
    if (input.length === 0) {
        throw new Error("Input slots should not be an empty array");
    }
    if (input.length === 1) {
        let resultState = [ 0, 0, 0, 0, 0, 0, 0 ];
        resultState = Append(resultState, input[0].State);
        return [new Timetable(input[0].SlotIds, resultState)];
    }
    const result = new Array < Timetable > ();
    const partitioned = sortBy(Partitionize(input), ["length"]);
    const indices = GenerateIndices(partitioned);
    const length = indices.length;
    const last = length - 1;
    let current : IOptimizedSlot;
    const snapshots = new Array < ISnapshot > ();
    snapshots.push({
        SlotIds: [],
        State: [ 0, 0, 0, 0, 0, 0, 0 ]
    });
    let prevSnapshot : ISnapshot;
    let ptr = 0;
    while (true) {
        prevSnapshot = snapshots[ptr];
        current = partitioned[ptr][indices[ptr].Value];
        if (!GotIntersection(current.State, prevSnapshot.State)) {
            snapshots.push({
                SlotIds: concat(current.SlotIds, prevSnapshot.SlotIds),
                State: Append(current.State, prevSnapshot.State) // concat(current.State, prevSnapshot.State)
            });
            if (ptr === last) {
                result.push(new Timetable(snapshots[ptr + 1].SlotIds, snapshots[ptr + 1].State));
                if (result.length >= LIMIT) {
                    return result;
                }
                snapshots.pop();
                while (true) {
                    indices[ptr].Value++;
                    if (indices[ptr].Value <= indices[ptr].UpperLimit) {
                        break;
                    } else {
                        indices[ptr].Value = 0;
                        snapshots.pop();
                        if (ptr === 0) {
                            return result;
                        }
                        ptr--;
                    }
                }
            } else {
                ptr++;
            }
        } else {
            while (true) {
                indices[ptr].Value++;
                if (indices[ptr].Value <= indices[ptr].UpperLimit) {
                    break;
                } else {
                    indices[ptr].Value = 0;
                    snapshots.pop();
                    if (ptr === 0) {
                        return result;
                    }
                    ptr--;
                }
            }
        }
    }
}

export function FindTimetableWithoutConsideringWeekNumber(rawSlots : RawSlot[]) : Timetable[] {
    return FindTimetable(ParseSlotToTinySlot(ParseRawSlotToSlot(rawSlots)));
}

export function FindTimetableByConsideringWeekNumber(rawSlots : RawSlot[]) : Timetable[] {
    return FindTimetable(ParseSlotToBigSlot(ParseRawSlotToSlot(rawSlots)));
}

const sortBy = require("lodash.sortby");
import {
    RawSlot
} from "../model/rawSlot";
import {
    GetDefinitelyOccupiedState
} from "../model/states/generateTotalState";
import {
    Timetable
} from "../model/timetable";
import {
    ParseRawSlotToSlot
} from "../parser/parseRawSlotToSlot";
import {
    ParseSlotToTinySlot
} from "../parser/parseSlotToTinySlot";
import {
    FindTimetable
} from "./findTimetable";
import {
    PartitionizeByKey
} from "./partitionize";
import {
    GotIntersection
} from "./state";
import {
    TinySlot
} from "./tinySlot";

export function FindTimetableV2(input: RawSlot[]): Timetable[] {
    const result: Timetable[] = [];
    const partitioned = sortBy(PartitionizeByKey(input, "SubjectCode"), ["length"]);
    const subjects = new Array < TinySlot[] > ();
    partitioned.forEach((p) => {
        subjects.push(ParseSlotToTinySlot(ParseRawSlotToSlot(p)));
    });
    let currentSlots = subjects[0];
    let timetables = FindTimetable(currentSlots);
    let state = GetDefinitelyOccupiedState(timetables);
    const last = subjects.length - 1;
    for (let i = 1; i < subjects.length; i++) {
        const filtrate = FilterOut(subjects[i], state);
        if (filtrate.length === 0) {
            return [];
        }
        // TODO: Check if the schema of filtrate is correct
        currentSlots = currentSlots.concat(filtrate);
        timetables = FindTimetable(currentSlots);
        if (i !== last) {
            state = GetDefinitelyOccupiedState(timetables);
        }
    }
    return timetables;
}

export function FilterOut(slots: TinySlot[], state: number[]) {
    const result = [];
    for (let i = 0; i < slots.length; i++) {
        if (!GotIntersection(slots[i].State, state)) {
            result.push(slots[i]);
        }
    }
    return result;
}

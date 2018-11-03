const sortBy = require("lodash.sortby");
import { GetDefinitelyOccupiedMatrix } from "../model/matrix/generateTotalMatrix";
import {
    RawSlot
} from "../model/rawSlot";
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
    GotIntersection
} from "./matrix";
import {
    PartitionizeByKey
} from "./partitionize";
import {
    TinySlot
} from "./tinySlot";
import { Timetable } from "../model/timetable";

export function FindTimetableV2(input: RawSlot[]): Timetable[] {
    const partitioned: RawSlot[][] = sortBy(PartitionizeByKey(input, "SubjectCode"), ["length"]);
    const subjects = new Array < TinySlot[] > ();
    partitioned.forEach((p) => {
        subjects.push(ParseSlotToTinySlot(ParseRawSlotToSlot(p)));
    });
    let currentSlots = subjects[0];
    let timetables = FindTimetable(currentSlots);
    let matrix = GetDefinitelyOccupiedMatrix(timetables);
    const last = subjects.length - 1;
    for (let i = 1; i < subjects.length; i++) {
        const filtrate = FilterOut(subjects[i], matrix);
        if (filtrate.length === 0) {
            return [];
        }
        // TODO: Check if the schema of filtrate is correct
        currentSlots = currentSlots.concat(filtrate);
        timetables = FindTimetable(currentSlots);
        if (i !== last) {
            matrix = GetDefinitelyOccupiedMatrix(timetables);
        }
    }
    return timetables;
}

export function FilterOut(slots: TinySlot[], dayTimeMatrix: number[]): TinySlot[] {
    const result: TinySlot[] = [];
    for (let i = 0; i < slots.length; i++) {
        if (!GotIntersection(slots[i].DayTimeMatrix, dayTimeMatrix)) {
            result.push(slots[i]);
        }
    }
    return result;
}

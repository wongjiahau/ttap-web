import { RawSlot } from "../../model/rawSlot";
import { Timetable } from "../../model/timetable";
import { FindTimetableWithoutConsideringWeekNumber } from "../../permutator/findTimetable";

export interface ISettingsState {
    SearchByConsideringWeekNumber: boolean;
    TimetableFinder: (rawSlots: RawSlot[]) => Timetable[];
}

export function NewSettingsState() : ISettingsState {
    return {
        SearchByConsideringWeekNumber: false,
        TimetableFinder: FindTimetableWithoutConsideringWeekNumber
    };
}

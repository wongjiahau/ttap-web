import { RawSlot } from "../../model/rawSlot";
import { Timetable } from "../../model/timetable";
import { FindTimetableByConsideringWeekNumber, FindTimetableWithoutConsideringWeekNumber } from "../../permutator/findTimetable";
import { FindTimetableVisualizer } from "../../permutator/findTimetableVisualizer";
import { IOptimizedSlot } from "../../permutator/tinySlot";

export type TimetableFinderFunction = (rawSlots: RawSlot[], visualizer: FindTimetableVisualizer<IOptimizedSlot>) => Timetable[];

export interface ISettingsState {
    SearchByConsideringWeekNumber: boolean;
    TimetableFinder: TimetableFinderFunction;
}

export function NewSettingsState() : ISettingsState {
    return {
        SearchByConsideringWeekNumber: true,
        TimetableFinder: FindTimetableByConsideringWeekNumber
    };
}

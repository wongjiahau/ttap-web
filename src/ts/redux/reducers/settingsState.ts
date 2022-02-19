import { RawSlot } from "../../model/rawSlot";
import { Timetable } from "../../model/timetable";
import {
  FindTimetableByConsideringWeekNumber,
  FindTimetableWithoutConsideringWeekNumber,
} from "../../permutator/findTimetable";
import { FindTimetableVisualizer } from "../../permutator/findTimetableVisualizer";
import { IOptimizedSlot } from "../../permutator/tinySlot";

export type TimetableFinderFunction = (
  rawSlots: RawSlot[],
  disableClashChecking: boolean,
  visualizer: FindTimetableVisualizer<IOptimizedSlot>
) => Timetable[];

export interface ISettingsState {
  SearchByConsideringWeekNumber: boolean;
  TimetableFinder: TimetableFinderFunction;
  DisableClashChecking: boolean;
}

export function NewSettingsState(): ISettingsState {
  return {
    SearchByConsideringWeekNumber: true,
    DisableClashChecking: false,
    TimetableFinder: FindTimetableByConsideringWeekNumber,
  };
}

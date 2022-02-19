import * as typeName from "type-name";
import { Action, IAction } from "../actions/action";
import {
  IAlgorithmVisualizerState,
  NewAlgorithmVisualizerState,
} from "./algorithmVisualizerState";
import { IDataState, NewDataState } from "./dataState";
import { GenerateReducer } from "./generateReducer";
import {
  ISaveTimetableDialogState,
  NewSaveTimetableDialogState,
} from "./saveTimetableDialogState";
import { ISBCWDialogState, NewSbcwDialogstate } from "./sbcwDialogState";
import {
  ISetTimeConstraintState,
  NewSetTimeConstraintState,
} from "./setTimeConstraintState";
import { ISettingsState, NewSettingsState } from "./settingsState";
import { ISlotsTableState, NewSlotsTableState } from "./slotsTableState";
import { ISnackbarState, NewSnackbarState } from "./snackbarState";
import { ISubjectListState, NewSubjectListState } from "./subjectListState";
import {
  ITimetableCreatorState,
  NewTimetableCreatorState,
} from "./timetableCreatorState";
import {
  ITimetableListState,
  NewTimetableListState,
} from "./timetableListState";

export interface IMasterState {
  DataState: IDataState;
  SaveTimetableDialogState: ISaveTimetableDialogState;
  SbcwDialogState: ISBCWDialogState;
  SetTimeConstraintState: ISetTimeConstraintState;
  SettingsState: ISettingsState;
  SlotTableState: ISlotsTableState;
  SnackbarState: ISnackbarState;
  SubjectListState: ISubjectListState;
  TimetableCreatorState: ITimetableCreatorState;
  TimetableListState: ITimetableListState;
  AlgorithmVisualizerState: IAlgorithmVisualizerState;
}

export function NewMasterState(isSummaryOpen = true): IMasterState {
  return {
    DataState: NewDataState(),
    SaveTimetableDialogState: NewSaveTimetableDialogState(),
    SbcwDialogState: NewSbcwDialogstate(),
    SetTimeConstraintState: NewSetTimeConstraintState([]),
    SettingsState: NewSettingsState(),
    SlotTableState: NewSlotsTableState(),
    SnackbarState: NewSnackbarState(),
    SubjectListState: NewSubjectListState([]),
    TimetableCreatorState: NewTimetableCreatorState(),
    TimetableListState: NewTimetableListState([], [], isSummaryOpen),
    AlgorithmVisualizerState: NewAlgorithmVisualizerState(),
  };
}
export abstract class MasterStateAction extends Action<IMasterState> {
  public StateName() {
    return typeName(NewMasterState());
  }
}

export const MasterStateReducer = GenerateReducer(NewMasterState());

export const MasterStateReducers = (
  state: IMasterState,
  actions: MasterStateAction[]
): IMasterState => {
  return actions.reduce(
    (state, action) => MasterStateReducer(state, action),
    state
  );
};

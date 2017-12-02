import * as typeName from "type-name";
import {Action} from "../actions/action";
import {GenereteReducer} from "./generateReducer";
import {ISaveTimetableDialogState, NewSaveTimetableDialogState} from "./saveTimetableDialogState";
import {ISetTimeConstraintState, NewSetTimeConstraintState} from "./setTimeConstraintState";
import {ISlotsTableState, NewSlotsTableState} from "./slotsTableState";
import {ISnackbarState, NewSnackbarState} from "./snackbarState";
import {ISubjectListState, NewSubjectListState} from "./subjectListState";
import {ITimetableCreatorState, NewTimetableCreatorState} from "./timetableCreatorState";
import {ITimetableListState, NewTimetableListState} from "./timetableListState";

export interface IMasterState {
    SaveTimetableDialogState: ISaveTimetableDialogState;
    SetTimeConstraintState:   ISetTimeConstraintState;
    SlotTableState:           ISlotsTableState;
    SnackbarState:            ISnackbarState;
    SubjectListState:         ISubjectListState;
    TimetableCreatorState:    ITimetableCreatorState;
    TimetableListState:       ITimetableListState;
}

export function NewMasterState() : IMasterState {
    return {
        SaveTimetableDialogState: NewSaveTimetableDialogState(),
        SetTimeConstraintState:   NewSetTimeConstraintState(null),
        SlotTableState:           NewSlotsTableState(),
        SnackbarState:            NewSnackbarState(),
        SubjectListState:         NewSubjectListState(null),
        TimetableCreatorState:    NewTimetableCreatorState(),
        TimetableListState:       NewTimetableListState([])
    };
}
export abstract class MasterStateAction extends Action < IMasterState > {
    public StateName() {
        return typeName(NewMasterState());
    }
}

export const MasterStateReducer = GenereteReducer(NewMasterState());

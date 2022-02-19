import * as typeName from "type-name";
import { Subject } from "../../model/subject";
import { Action } from "../actions/action";
import { ISaveTimetableDialogState } from "./saveTimetableDialogState";
import { ISubjectListState } from "./subjectListState";

export interface ITimetableCreatorState {
  IsSlotLoaded: boolean;
}

export function NewTimetableCreatorState(): ITimetableCreatorState {
  return {
    IsSlotLoaded: false,
  };
}

export abstract class TimetableCreatorStateAction extends Action<ITimetableCreatorState> {
  public StateName() {
    return typeName(NewTimetableCreatorState());
  }
}

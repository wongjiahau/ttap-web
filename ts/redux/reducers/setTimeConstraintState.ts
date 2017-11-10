import * as typeName from "type-name";
import { GenerateTotalState } from "../../model/states/generateTotalState";
import { State } from "../../model/states/state";
import {Action} from "../actions/action";
import { Timetable } from "./../../model/timetable";
import { GetTestTimetables1 } from "./../../tests/testDataGenerator";
import {GenereteReducer} from "./generateReducer";

export interface ISetTimeConstraintState {
    Timetables: Timetable[];
    TotalState: State[];
    IsSetTimeConstraintDialogOpened: boolean;
}

export class SetTimeConstraintState implements ISetTimeConstraintState {
    public readonly Timetables: Timetable[];
    public readonly TotalState: State[];
    public readonly IsSetTimeConstraintDialogOpened: boolean;
    public constructor() {
        this.Timetables = GetTestTimetables1();
        this.TotalState = GenerateTotalState(this.Timetables);
        this.IsSetTimeConstraintDialogOpened = false;
    }
}

export abstract class SetTimeConstraintStateAction extends Action < ISetTimeConstraintState > {
    public StateName() {
        return typeName(new SetTimeConstraintState());
    }
}

export const SetTimeConstraintStateReducer = GenereteReducer(new SetTimeConstraintState());

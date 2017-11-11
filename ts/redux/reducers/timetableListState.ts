import * as typeName from "type-name";
import { State } from "../../model/states/state";
import {Action} from "../actions/action";
import {Timetable} from "./../../model/timetable";
import {GetTestSubjects1} from "./../../tests/testDataGenerator";
import {GenereteReducer} from "./generateReducer";

export interface ITimetableListState {
    Timetables:                  Timetable[];
    TotalState:                  State[];
    CurrentTimetable:            Timetable;
    CurrentIndex:                number;
    IsSaveDialogOpen:            boolean;
    IsSetTimeConstraintViewOpen: boolean;
}

export class TimetableListState implements ITimetableListState {
    public CurrentIndex:                number;
    public CurrentTimetable:            Timetable;
    public IsSaveDialogOpen:            boolean;
    public IsSetTimeConstraintViewOpen: boolean;
    public Timetables:                  Timetable[];
    public TotalState:                  State[];
    public constructor(timetables : Timetable[] = [null, undefined]) {
        this.CurrentIndex                = 0;
        this.CurrentTimetable            = timetables[0];
        this.IsSaveDialogOpen            = false;
        this.IsSetTimeConstraintViewOpen = false;
        this.Timetables                  = timetables;
        this.TotalState                  = null;
    }
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(new TimetableListState());
    }
}

export const TimetableListStateReducer = GenereteReducer(new TimetableListState());

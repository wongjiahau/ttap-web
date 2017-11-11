import * as typeName from "type-name";
import { State } from "../../model/states/state";
import {Action} from "../actions/action";
import {Timetable} from "./../../model/timetable";
import {GetTestSubjects1} from "./../../tests/testDataGenerator";
import {GenereteReducer} from "./generateReducer";

export interface ITimetableListState {
    AllTimetables:               Timetable[];
    CurrentIndex:                number;
    CurrentTimetable:            Timetable;
    FilteredTimetables:          Timetable[];
    IsSaveDialogOpen:            boolean;
    IsSetTimeConstraintViewOpen: boolean;
    TotalState:                  State[];
}

export class TimetableListState implements ITimetableListState {
    public AllTimetables:               Timetable[];
    public CurrentIndex:                number;
    public CurrentTimetable:            Timetable;
    public FilteredTimetables:          Timetable[];
    public IsSaveDialogOpen:            boolean;
    public IsSetTimeConstraintViewOpen: boolean;
    public TotalState:                  State[];
    public constructor(timetables : Timetable[] = [null, undefined]) {
        this.CurrentIndex                = 0;
        this.CurrentTimetable            = timetables[0];
        this.AllTimetables               = timetables;
        this.FilteredTimetables          = timetables;
        this.IsSaveDialogOpen            = false;
        this.IsSetTimeConstraintViewOpen = false;
        this.TotalState                  = null;
    }
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(new TimetableListState());
    }
}

export const TimetableListStateReducer = GenereteReducer(new TimetableListState());

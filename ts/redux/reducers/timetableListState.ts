import * as typeName from "type-name";
import { State } from "../../model/states/state";
import {Action} from "../actions/action";
import {Timetable} from "./../../model/timetable";
import {GetTestSubjects1} from "./../../tests/testDataGenerator";
import {GenereteReducer} from "./generateReducer";

export interface ITimetableListState {
    ResidueTimetables:           Timetable[];
    CurrentIndex:                number;
    CurrentTimetable:            Timetable;
    FiltrateTimetables:          Timetable[];
    IsSaveDialogOpen:            boolean;
    IsSetTimeConstraintViewOpen: boolean;
    TotalState:                  State[];
    UidsOfClickedState:          string[];
}

export class TimetableListState implements ITimetableListState {
    public ResidueTimetables:           Timetable[];
    public CurrentIndex:                number;
    public CurrentTimetable:            Timetable;
    public FiltrateTimetables:          Timetable[];
    public IsSaveDialogOpen:            boolean;
    public IsSetTimeConstraintViewOpen: boolean;
    public TotalState:                  State[];
    public UidsOfClickedState:          string[];
    public constructor(timetables : Timetable[] = [null, undefined]) {
        this.CurrentIndex                = 0;
        this.CurrentTimetable            = timetables[0];
        this.ResidueTimetables           = [];
        this.FiltrateTimetables          = timetables;
        this.IsSaveDialogOpen            = false;
        this.IsSetTimeConstraintViewOpen = false;
        this.TotalState                  = null;
        this.UidsOfClickedState          = [];
    }
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(new TimetableListState());
    }
}

export const TimetableListStateReducer = GenereteReducer(new TimetableListState());

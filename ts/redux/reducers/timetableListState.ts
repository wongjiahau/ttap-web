import * as typeName from "type-name";
import { STCBox } from "../../model/states/stcBox";
import {Action} from "../actions/action";
import {Timetable} from "./../../model/timetable";
import {GetTestSubjects1} from "./../../tests/testDataGenerator";
import {GenereteReducer} from "./generateReducer";

export interface ITimetableListState {
    ResidueTimetables:           Timetable[];
    CurrentIndex:                number;
    FiltrateTimetables:          Timetable[];
    IsSaveDialogOpen:            boolean;
    IsSetTimeConstraintViewOpen: boolean;
    TotalState:                  STCBox[];
    UidsOfClickedState:          string[];
    ClickedTimeConstraint:       number[/*7*/];
}

export class TimetableListState implements ITimetableListState {
    public ResidueTimetables:           Timetable[];
    public CurrentIndex:                number;
    public FiltrateTimetables:          Timetable[];
    public IsSaveDialogOpen:            boolean;
    public IsSetTimeConstraintViewOpen: boolean;
    public TotalState:                  STCBox[];
    public UidsOfClickedState:          string[];
    public ClickedTimeConstraint:       number[/*7*/];
    public constructor(timetables : Timetable[] = [null, undefined]) {
        this.CurrentIndex                = 0;
        this.ResidueTimetables           = [];
        this.FiltrateTimetables          = timetables;
        this.IsSaveDialogOpen            = false;
        this.IsSetTimeConstraintViewOpen = false;
        this.TotalState                  = null;
        this.UidsOfClickedState          = [];
        this.ClickedTimeConstraint       = [0, 0, 0, 0, 0, 0, 0];
    }
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(new TimetableListState());
    }
}

export const TimetableListStateReducer = GenereteReducer(new TimetableListState());

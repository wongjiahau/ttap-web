import * as typeName from "type-name";
import { STCBox } from "../../model/states/stcBox";
import {Action} from "../actions/action";
import {Timetable} from "./../../model/timetable";
import {GenereteReducer} from "./generateReducer";

export interface ITimetableListState {
    CurrentIndex:       number;
    FiltrateTimetables: Timetable[];
    ResidueTimetables:  Timetable[];
}

export function NewTimetableListState(timetables: Timetable[]) : ITimetableListState {
    return {
        CurrentIndex: 0,
        FiltrateTimetables: timetables,
        ResidueTimetables: [],
    };
}

export class TimetableListState implements ITimetableListState {
    public ResidueTimetables:           Timetable[];
    public CurrentIndex:                number;
    public FiltrateTimetables:          Timetable[];
    public constructor(timetables : Timetable[] = [null, undefined]) {
        this.CurrentIndex                = 0;
        this.ResidueTimetables           = [];
        this.FiltrateTimetables          = timetables;
    }
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(new TimetableListState());
    }
}

export const TimetableListStateReducer = GenereteReducer(new TimetableListState());

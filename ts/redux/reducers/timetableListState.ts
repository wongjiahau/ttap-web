import * as typeName from "type-name";
import {ActionGenerator} from "../actions/actionGenerator";
import {Timetable} from "./../../model/timetable";
import {GetTestSubjects1} from "./../../tests/testDataGenerator";
import {GenereteReducer} from "./generateReducer";

export interface ITimetableListState {
    Timetables : Timetable[];
    CurrentTimetable : Timetable;
    CurrentIndex : number;
}

export class TimetableListState implements ITimetableListState {
    public CurrentTimetable : Timetable;
    public Timetables : Timetable[];
    public CurrentIndex : number;
    public constructor(timetables : Timetable[] = [null, undefined]) {
        this.CurrentIndex = 0;
        this.Timetables = timetables;
    }
}

export abstract class TimetableListStateActionGenerator extends ActionGenerator < ITimetableListState > {
    public StateName() {
        return typeName(new TimetableListState());
    }
}

export const TimetableListReducer = GenereteReducer(new TimetableListState());

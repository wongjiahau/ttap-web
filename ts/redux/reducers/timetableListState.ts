import * as typeName from "type-name";
import {Action} from "../actions/action";
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
        this.CurrentTimetable = timetables[0];
    }
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(new TimetableListState());
    }
}

export const TimetableListStateReducer = GenereteReducer(new TimetableListState());

import { TimetableListStateAction } from "../reducers/timetableListState";
import { Timetable } from "./../../model/timetable";
import { ITimetableListState } from "./../reducers/timetableListState";

export class SetTimetables extends TimetableListStateAction {
    public constructor (private newTimetables : Timetable[]) {
        super();
    }
    public TypeName(): string {
        return "set timetables";
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        return {
            ...state,
            Timetables: this.newTimetables
        };
    }

}

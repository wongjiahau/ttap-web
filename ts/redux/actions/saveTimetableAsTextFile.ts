import {saveAs} from "file-saver";
import { Timetable } from "./../../model/timetable";
import {ITimetableListState, TimetableListStateAction} from "./../reducers/timetableListState";

export class SaveTimetableAsTextFile extends TimetableListStateAction {
    public constructor() {
        super();
    }
    public TypeName() : string {return "save timetable as text file"; }
    protected GenerateNewState(state : ITimetableListState) : ITimetableListState {
        const data = ConverTimetableToText(state.CurrentTimetable);
        const file = new File([data], "MyTimetable.txt", {type: "text/plain;charset=utf-8"});
        saveAs(file);
        return {
            ...state,
        };
    }
}

export function ConverTimetableToText(timetable: Timetable) : string {
    throw new Error("not implemented yet");
}

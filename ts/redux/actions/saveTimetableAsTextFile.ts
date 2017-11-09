import {
    saveAs
} from "file-saver";
import {
    Timetable
} from "./../../model/timetable";
import {
    TimetableSummary
} from "./../../model/timetableSummary";
import {
    ITimetableListState,
    TimetableListStateAction
} from "./../reducers/timetableListState";

export class SaveTimetableAsTextFile extends TimetableListStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "save timetable as text file";
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        if (state.CurrentTimetable) {
            const data = new TimetableSummary(state.CurrentTimetable).ToString();
            const file = new File([data], "MyTimetable.txt", {
                type: "text/plain;charset=utf-8"
            });
            saveAs(file);
        }
        return {
            ...state,
        };
    }
}

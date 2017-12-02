import { MasterStateAction } from "../reducers/masterState";
import { Timetable } from "./../../model/timetable";
import { IMasterState } from "./../reducers/masterState";

export class SetTimetables extends MasterStateAction {
    public constructor (private newTimetables : Timetable[]) {
        super();
    }
    public TypeName(): string {
        return "set timetables";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                ResidueTimetables: this.newTimetables,
                FiltrateTimetables: this.newTimetables
            }
        };
    }

}

import {
    random
} from "lodash";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class GoToRandomTimetable extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "go to random timetable";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const length = state.TimetableListState.FiltrateTimetables.length;
        if (length === 1) {
            return state;
        }
        const getRandom = () => random(0, length - 1);
        let x = getRandom();
        while (x === state.TimetableListState.CurrentIndex) {
            x = getRandom();
        }
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                CurrentIndex: x
            }
        };
    }
}

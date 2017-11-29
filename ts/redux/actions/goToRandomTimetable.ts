import {
    random
} from "lodash";
import {
    ITimetableListState,
    TimetableListStateAction
} from "./../reducers/timetableListState";

export class GoToRandomTimetable extends TimetableListStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "go to random timetable";
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        const length = state.FiltrateTimetables.length;
        if (length === 1) {
            return state;
        }
        const getRandom = () => random(0, length - 1);
        let x = getRandom();
        while (x === state.CurrentIndex) {
            x = getRandom();
        }
        return {
            ...state,
            CurrentIndex: x
        };
    }
}

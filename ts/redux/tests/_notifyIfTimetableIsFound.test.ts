import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    NotifyIfTimetableIsFound
} from "./../actions/notifyIfTimetableIsFound";
import {
    ITimetableCreatorState,
    TimetableCreatorState,
    TimetableCreatorStateReducer
} from "./../reducers/timetableCreatorState";

describe("NotifyIfTimetableIsFound action", () => {
    it("'s typename should be 'notify if timetable is found'", () => {
        const action = new NotifyIfTimetableIsFound();
        expect(action.TypeName()).to.eq("notify if timetable is found");
    });

    it("should set ...", () => {
        const action = new NotifyIfTimetableIsFound().Action();
        const initialState = new TimetableCreatorState();
        const newState = TimetableCreatorStateReducer(initialState, action);
        expect(newState).to.eq("?");
    });
});

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
    ToggleSubjectSelection
} from "./../actions/toggleSubjectSelection";
import {
    UpdateSubjectListState
} from "./../actions/updateSubjectListState";
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

    it("should set IsSnackBarVisible to true if some subjects is selected", () => {
        const action = new NotifyIfTimetableIsFound().Action();
        const initialState = new TimetableCreatorState();
        let newState =
            TimetableCreatorStateReducer(initialState,
                new UpdateSubjectListState(new ToggleSubjectSelection("MPU3113")).Action());
        newState = TimetableCreatorStateReducer(newState, action);
        expect(newState.IsSnackbarVisible).to.eq(true);
    });

    it("should set IsSnackBarVisible to false if zero subject is selected", () => {
        const action = new NotifyIfTimetableIsFound().Action();
        const initialState = new TimetableCreatorState();
        const newState = TimetableCreatorStateReducer(initialState, action);
        expect(newState.IsSnackbarVisible).to.eq(false);
    });
});

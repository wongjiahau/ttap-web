import {expect} from "chai";
import {isEqual} from "lodash";
import {NotifyNumberOfRemainingTimetables} from "./../actions/notifyNumberOfRemainingTimetables";
import {ITimetableCreatorState, TimetableCreatorState, TimetableCreatorStateReducer} from "./../reducers/timetableCreatorState";
describe("NotifyNumberOfRemainingTimetables action", () => {
    it("'s typename should be 'notify number of remaining timetables'", () => {
        const action = new NotifyNumberOfRemainingTimetables();
        expect(action.TypeName()).to.eq("notify number of remaining timetables");
    });

    it("should set IsSnackbarVisible to true", () => {
        const action = new NotifyNumberOfRemainingTimetables().Action();
        const initialState = new TimetableCreatorState([]);
        expect(initialState.IsSnackbarVisible).to.eq(false);
        const newState = TimetableCreatorStateReducer(initialState, action);
        expect(newState.IsSnackbarVisible).to.eq(true);
    });

    it("should set SnackbarMessage", () => {
        const action = new NotifyNumberOfRemainingTimetables().Action();
        const initialState = new TimetableCreatorState([]);
        const newState = TimetableCreatorStateReducer(initialState, action);
        expect(newState.SnackbarMessage).to.eq("2 timetables remaining.");
    });
});

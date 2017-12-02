import {expect} from "chai";
import {isEqual} from "lodash";
import { GetTestTimetables1 } from "../../tests/testDataGenerator";
import { NewTimetableListState } from "../reducers/timetableListState";
import {NotifyNumberOfRemainingTimetables} from "./../actions/notifyNumberOfRemainingTimetables";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";

function getInitialState() : IMasterState {
    return {
        ...NewMasterState(),
        TimetableListState: NewTimetableListState(GetTestTimetables1())
    };
}

describe("NotifyNumberOfRemainingTimetables action", () => {
    it("'s typename should be 'notify number of remaining timetables'", () => {
        const action = new NotifyNumberOfRemainingTimetables();
        expect(action.TypeName()).to.eq("notify number of remaining timetables");
    });

    it("should set IsSnackbarVisible to true", () => {
        const action = new NotifyNumberOfRemainingTimetables();
        const initialState = getInitialState();
        expect(initialState.SnackbarState.IsOpen).to.eq(false);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SnackbarState.IsOpen).to.eq(true);
    });

    it("should set SnackbarMessage", () => {
        const action = new NotifyNumberOfRemainingTimetables();
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SnackbarState.Message).to.eq("29 timetables remaining.");
    });
});

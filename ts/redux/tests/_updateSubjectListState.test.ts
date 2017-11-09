import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    SearchSubjectList
} from "./../actions/searchSubjectList";
import {
    UpdateSubjectListState
} from "./../actions/updateSubjectListState";
import {
    ITimetableCreatorState,
    TimetableCreatorState,
    TimetableCreatorStateReducer
} from "./../reducers/timetableCreatorState";

describe("UpdateSubjectListState action", () => {
    it("'s typename should be 'update subject list state'", () => {
        const action = new UpdateSubjectListState(null);
        expect(action.TypeName()).to.eq("update subject list state");
    });

    it("'s typename should contain the TypeName of passed in action", () => {
        const passedInAction = new SearchSubjectList("");
        const action = new UpdateSubjectListState(passedInAction);
        expect(action.TypeName()).to.contains(passedInAction.TypeName());
    });

    // it("should set ...", () => {
    //     const action = new UpdateSubjectListState().Action();
    //     const initialState = new TimetableCreatorState();
    //     const newState = TimetableCreatorStateReducer(initialState, action);
    //     expect(newState).to.eq("?");
    // });
});

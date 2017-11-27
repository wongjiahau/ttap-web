import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleVisibilityOfSubjectListView} from "../actions/toggleVisibilityOfSubjectListView";
import {TimetableCreatorState, TimetableCreatorStateReducer} from "./../reducers/timetableCreatorState";

describe("toggle visiblity of subject list view action", () => {

    it("should toggle property 'IsSubjectListViewVisible'", () => {
        const initialState = new TimetableCreatorState(null);
        const newState = TimetableCreatorStateReducer(initialState, new ToggleVisibilityOfSubjectListView().Action());
        expect(newState.IsSubjectListViewVisible)
            .to
            .eq(!initialState.IsSubjectListViewVisible);
    });

});

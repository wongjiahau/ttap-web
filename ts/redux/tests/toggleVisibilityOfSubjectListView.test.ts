import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleVisibilityOfSubjectListView} from "../actions/toggleVisibilityOfSubjectListView";
import {TimetableCreatorReducer, TimetableCreatorState} from "./../reducers/timetableCreatorState";

describe("toggle visiblity of subject list view action", () => {

    it("should toggle property 'IsSubjectListViewVisible'", () => {
        const initialState = new TimetableCreatorState();
        const newState = TimetableCreatorReducer(initialState, new ToggleVisibilityOfSubjectListView().Action());
        expect(newState.IsSubjectListViewVisible)
            .to
            .eq(!initialState.IsSubjectListViewVisible);
    });

});

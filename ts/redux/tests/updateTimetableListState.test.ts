import {expect} from "chai";
import {isEqual} from "lodash";
import { GoToNextTimetable } from "./../actions/goToNextTimetable";
import {UpdateTimetableListState} from "./../actions/updateTimetableListState";
import {ISubjectListState, SubjectListState, SubjectListStateReducer} from "./../reducers/subjectListState";

describe("UpdateTimetableListState action", () => {
    it("'s typename should be UpdateTimetableListState ", () => {
        const action = new UpdateTimetableListState(null);
        expect(action.TypeName()).to.eq("Update TimetableList State");
    });

    it("'s typename should contain the TypeName of the passed in action", () => {
        const passedInAction = new GoToNextTimetable();
        const action = new UpdateTimetableListState(passedInAction);
        expect(action.TypeName()).to.contain(passedInAction.TypeName());
    });
});

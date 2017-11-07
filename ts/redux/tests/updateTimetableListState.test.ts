import {expect} from "chai";
import {isEqual} from "lodash";
import {UpdateTimetableListState} from "./../actions/updateTimetableListState";
import {ISubjectListState, SubjectListState, SubjectListStateReducer} from "./../reducers/subjectListState";
describe("UpdateTimetableListState action", () => {
    it("'s typename should be UpdateTimetableListState ", () => {
        const action = new UpdateTimetableListState(null);
        expect(action.TypeName()).to.eq("Update TimetableList State");
    });
});

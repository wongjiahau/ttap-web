import {expect} from "chai";
import {isEqual} from "lodash";
import {FindTimetablesBasedOnSelectedSubjects} from "./../actions/FindTimetablesBasedOnSelectedSubjects";
import {ISubjectListState, SubjectListState, SubjectListStateReducer} from "./../reducers/subjectListState";
describe("FindTimetables action", () => {
    it("'s Typename should be Find timetables", () => {
        const action = new FindTimetablesBasedOnSelectedSubjects();
        expect(action.TypeName()).to.eq("Find timetables");
    });
});

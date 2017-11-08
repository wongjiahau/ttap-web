import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    GetTestSubjects1
} from "../../tests/testDataGenerator";
import {
    SelectSubject
} from "../actions/selectSubject";
import {
    FindTimetablesBasedOnSelectedSubjects
} from "./../actions/FindTimetablesBasedOnSelectedSubjects";
import {
    ISubjectListState,
    SubjectListState,
    SubjectListStateReducer
} from "./../reducers/subjectListState";

describe("FindTimetables action", () => {
    it("'s Typename should be Find timetables", () => {
        const action = new FindTimetablesBasedOnSelectedSubjects();
        expect(action.TypeName()).to.eq("find timetables");
    });

    it("should return the original state if no subject is selected", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        expect(initialState.Subjects.every((x) => !x.IsSelected)).to.eq(true);
        const newState = SubjectListStateReducer(initialState, new FindTimetablesBasedOnSelectedSubjects().Action());
        expect(isEqual(newState, initialState)).to.eq(true);

    });

    it("should set the TimetableListState when some subject is selected", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        expect(initialState.TimetableListState.Timetables).to.have.same.members([null, undefined]);
        let newState = SubjectListStateReducer(initialState, new SelectSubject("MPU3113").Action());
        newState = SubjectListStateReducer(newState, new FindTimetablesBasedOnSelectedSubjects().Action());
        expect(newState.TimetableListState.Timetables).to.not.have.same.members([null, undefined]);

    });

});

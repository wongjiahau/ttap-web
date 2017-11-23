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
    ToggleSubjectSelection
} from "../actions/toggleSubjectSelection";
import {
    FindTimetablesBasedOnSelectedSubjects
} from "./../actions/findTimetablesBasedOnSelectedSubjects";
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
        expect(initialState.TimetableListState.FiltrateTimetables).to.have.same.members([null, undefined]);
        let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU3113").Action());
        newState = SubjectListStateReducer(newState, new FindTimetablesBasedOnSelectedSubjects().Action());
        expect(newState.TimetableListState.FiltrateTimetables).to.not.have.same.members([null, undefined]);
    });

    it("should set the ClashingSubjectPair if there are ZERO possible timetables found", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU34022").Action()); // ACP
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU32013").Action()); // BKA
        newState = SubjectListStateReducer(newState, new FindTimetablesBasedOnSelectedSubjects().Action());
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(0);
        expect(newState.ClashingSubjectPairs).to.have.lengthOf(1);
    });

    it("should set the ClashingSubjectPair back to null if there are some possible timetables found", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU34022").Action()); // ACP
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU32013").Action()); // BKA
        newState = SubjectListStateReducer(newState, new FindTimetablesBasedOnSelectedSubjects().Action());
        expect(newState.ClashingSubjectPairs).to.not.eq(null);
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU32013").Action()); // BKA
        newState = SubjectListStateReducer(newState, new FindTimetablesBasedOnSelectedSubjects().Action());
        expect(newState.ClashingSubjectPairs).to.eq(null);
    });
});

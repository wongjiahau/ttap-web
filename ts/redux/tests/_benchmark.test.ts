import {
    expect
} from "chai";
import {
    find,
    reduce
} from "lodash";
import {
    FindClashes
} from "../../clashFinder/findClashes";
import {
    RawSlot
} from "../../model/rawSlot";
import {
    Subject
} from "../../model/subject";
import {
    ParseRawSlotToSlot
} from "../../parser/parseRawSlotToSlot";
import {
    ParseSlotToTinySlot
} from "../../parser/parseSlotToTinySlot";
import {
    GetTestSubjects1,
    IndexOf
} from "../../tests/testDataGenerator";
import {
    CheckForClashesBetween,
    FindTimetableBasedOn,
    ToggleSubjectSelection
} from "../actions/toggleSubjectSelection";
import {
    SubjectListState,
    SubjectListStateReducer
} from "../reducers/subjectListState";

describe("benchmark", () => {
    it("case 2", () => {

        const mockSubjects = GetTestSubjects1();
        FindClashes(mockSubjects);
        const initialState = new SubjectListState(mockSubjects);
        const Stopwatch = require("node-stopwatch").Stopwatch;
        const stopwatch = Stopwatch.create();
        stopwatch.start();
        const newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE).Action());
        stopwatch.stop();
        console.log("milliseconds: " + stopwatch.elapsedMilliseconds);
        expect(newState.Subjects[IndexOf.HE].IsSelected).to.eq(true);

    });

});

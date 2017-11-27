import {
    expect
} from "chai";
import {
    FindTimetable
} from "../../permutator/findTimetable";
import {
    GetTinySlotsOf
} from "./../../tests/testDataGenerator";
import {
    TimetableSummary
} from "./../timetableSummary";

describe("TimetableSummary", () => {
    describe("constructor", () => {
        it("should have X SubjectSummaries if the passed in timetable have X subjects", () => {
            // 2 subjects
            const input1 = GetTinySlotsOf("UKMM1043"); // BEAM
            const input2 = GetTinySlotsOf("UEMX3653"); // WWT
            const timetables = FindTimetable(input1.concat(input2));
            const timetableSummary = new TimetableSummary(timetables[0]);
            expect(timetableSummary.SubjectSummaries.length).to.eq(2);
        });
    });

    describe("ToString()", () => {
        it("case 1", () => {
            // 2 subjects
            const input1 = GetTinySlotsOf("UKMM1043"); // BEAM
            const input2 = GetTinySlotsOf("UEMX3653"); // WWT
            const timetables = FindTimetable(input1.concat(input2));
            const timetableSummary = new TimetableSummary(timetables[0]);
            expect(timetableSummary.ToString()).to.eq("UEMX3653\r\nWater & Wastewater Treatment\r\nL-1 T-1 -\r\n\r\nUKMM1043\r\nBasic Economics, Accounting & Management\r\nL-1 T-1 -\r\n\r\n");
        });
    });

    it("case 1", () => {
        // 2 subjects
        const input1 = GetTinySlotsOf("UKMM1043"); // BEAM
        const input2 = GetTinySlotsOf("UEMX3653"); // WWT
        const timetables = FindTimetable(input1.concat(input2));
        const timetableSummary = new TimetableSummary(timetables[0]);
        const subjectSummary1 = timetableSummary.SubjectSummaries[0];
        expect(subjectSummary1.SubjectCode).to.eq("UEMX3653");
        expect(subjectSummary1.SubjectName).to.eq("Water & Wastewater Treatment");
        expect(subjectSummary1.Lecture).to.eq("L-1");
        expect(subjectSummary1.Tutorial).to.eq("T-1");
        expect(subjectSummary1.Practical).to.eq("-");
    });

});

import {expect} from "chai";
import {IRawSlot} from "../../../../model/rawSlot";
import {HENG_2017_APR} from "../../../../tests/testData/heng_2017_apr";
import {findSisterSlots, SaveTimetableAsTextFile} from "../saveTimetableAsTextFile";

describe("SaveTimetableAsTextFile action", () => {
    it("'s typename should be 'save timetable as - text file'", () => {
        const action = new SaveTimetableAsTextFile();
        expect(action.TypeName())
            .to
            .eq("save timetable as - text file");
    });
});

describe("findSisterSlots", () => {
    it("case 1", () => {
        const allSlots = HENG_2017_APR();
        const slotsOfCurrentTimetable : IRawSlot[] = [
            // Fluid Mechanics I
            allSlots.filter((s) => s.SubjectCode === "UEME2123" && s.Type === "L" && s.Group === "3")[0],
            allSlots.filter((s) => s.SubjectCode === "UEME2123" && s.Type === "T" && s.Group === "13")[0],
            allSlots.filter((s) => s.SubjectCode === "UEME2123" && s.Type === "P" && s.Group === "1")[0],

            // Fluid Mechanics II
            allSlots.filter((s) => s.SubjectCode === "UEME3112" && s.Type === "L" && s.Group === "1")[0],
            allSlots.filter((s) => s.SubjectCode === "UEME3112" && s.Type === "T" && s.Group === "5")[0],
            allSlots.filter((s) => s.SubjectCode === "UEME3112" && s.Type === "P" && s.Group === "10")[0]
        ];

        const result = findSisterSlots(slotsOfCurrentTimetable, allSlots);
        const expectedOutput = [
            {
                Uid: 158,
                SubjectCode: 'UEME2123',
                SubjectName: 'Fluid Mechanics I',
                Number: '153',
                Type: 'L',
                Group: '3',
                Day: 'Tue',
                TimePeriod: '  4:00 PM -  5:00 PM',
                WeekNumber: '1-14',
                Room: 'KB208'
            }, {
                Uid: 192,
                SubjectCode: 'UEME2123',
                SubjectName: 'Fluid Mechanics I',
                Number: '186',
                Type: 'T',
                Group: '13',
                Day: 'Fri',
                TimePeriod: ' 10:30 AM - 11:30 AM',
                WeekNumber: '3,5,7,9,11,13',
                Room: 'KB314'
            }, {
                Uid: 160,
                SubjectCode: 'UEME2123',
                SubjectName: 'Fluid Mechanics I',
                Number: '154',
                Type: 'P',
                Group: '1 or 2 or 3 or 4 or 5',
                Day: 'Tue',
                TimePeriod: '  9:00 AM - 12:00 PM',
                WeekNumber: '2,8',
                Room: 'KB731'
            }, {
                Uid: 200,
                SubjectCode: "UEME3112",
                SubjectName: "Fluid Mechanics II",
                Number: "194",
                Type: "L",
                Group: "1",
                Day: "Wed",
                TimePeriod: "  2:00 PM -  4:00 PM",
                WeekNumber: "1-14",
                Room: "KB209"
            }, {
                Uid: 221,
                SubjectCode: "UEME3112",
                SubjectName: "Fluid Mechanics II",
                Number: "215",
                Type: "T",
                Group: "5 or 6",
                Day: "Mon",
                TimePeriod: "  1:00 PM -  2:00 PM",
                WeekNumber: "3,5,7,9,11,13",
                Room: "KB517"
            }, {
                Uid: 211,
                SubjectCode: "UEME3112",
                SubjectName: "Fluid Mechanics II",
                Number: "205",
                Type: "P",
                Group: "10 or 12 or 13",
                Day: "Fri",
                TimePeriod: "  8:30 AM - 11:30 AM",
                WeekNumber: "2,8",
                Room: "KB731"
            }
        ];
        expect(result).to.deep.eq(expectedOutput);
    });

});

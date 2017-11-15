import {
    expect
} from "chai";
import {
    SaveTimetableAsGoogleCalendar
} from "./../saveTimetableAsGoogleCalendar";

describe("SaveTimetableAsGoogleCalendar", () => {
    describe("GetStartDate", () => {
        it("case 1", () => {
            const semStartDate = new Date(2017, 10, 15); // 2017 November 15 (because month is represented from 0 - 11)
            const firstWeek = 0;
            const result = SaveTimetableAsGoogleCalendar.GetStartDate(semStartDate, firstWeek);
            expect(result.getTime()).to.eq(new Date(2017, 10, 15).getTime());
        });

        it("case 2", () => {
            const semStartDate = new Date(2017, 10, 15); // 2017 November 15 (because month is represented from 0 - 11)
            const firstWeek = 1;
            const result = SaveTimetableAsGoogleCalendar.GetStartDate(semStartDate, firstWeek);
            expect(result.getTime()).to.eq(new Date(2017, 10, 22).getTime());
        });

        it("case 3", () => {
            const semStartDate = new Date(2017, 10, 15); // 2017 November 15 (because month is represented from 0 - 11)
            const firstWeek = 3;
            const result = SaveTimetableAsGoogleCalendar.GetStartDate(semStartDate, firstWeek);
            expect(result.getTime()).to.eq(new Date(2017, 11, 6).getTime());
        });

    });

});

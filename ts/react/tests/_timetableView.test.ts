import {
    expect
} from "chai";
import {
    GetSlotLayout,
    GetXandW
} from "../timetableView/generateSlotViews";
import {
    TimePeriod
} from "./../../att/timePeriod";
import {
    RawSlot
} from "./../../model/rawSlot";

describe("TimetableView", () => {
    describe("GetSlotLayout()", () => {
        it("should set the 'i' property of the layout based on the 2nd argument", () => {
            const input = new RawSlot();
            input.Day = "Mon";
            input.TimePeriod = "08:00 AM - 10:00 AM";
            const layout = GetSlotLayout(input, "s1", 0, 0);
            expect(layout.i).to.eq("s1");
        });

        it("should set the 'y' property of the layout based on the day of the slot", () => {
            const input = new RawSlot();
            input.Day = "Mon";
            input.TimePeriod = "08:00 AM - 10:00 AM";
            const layout = GetSlotLayout(input, "s1", 0, 0);
            expect(layout.y).to.eq(0);
        });

        it("should set the 'x' and 'w' property of the layout based on the timeperiod of the slot", () => {
            const input = new RawSlot();
            input.Day = "Mon";
            input.TimePeriod = "08:00 AM - 10:00 AM";
            const layout = GetSlotLayout(input, "s1", 0, 0);
            expect(layout.x).to.eq(0);
            expect(layout.w).to.eq(4);
        });

        it("should add the 'x' property by the passed in X_OFFSET", () => {
            const input = new RawSlot();
            input.Day = "Mon";
            input.TimePeriod = "08:00 AM - 10:00 AM";
            const X_OFFSET = 1;
            const layout = GetSlotLayout(input, "s1", X_OFFSET, 0);
            expect(layout.x).to.eq(1);
            expect(layout.w).to.eq(4);
        });

        it("should add the 'y' property by the passed in Y_OFFSET", () => {
            const input = new RawSlot();
            input.Day = "Mon";
            input.TimePeriod = "08:00 AM - 10:00 AM";
            const Y_OFFSET = 1;
            const layout = GetSlotLayout(input, "s1", 0, Y_OFFSET);
            expect(layout.y).to.eq(1);
        });

    });

    describe("GetXandW()", () => {

        it("case 1", () => {
            const input = TimePeriod.Parse("08:00 AM - 10:00 AM");
            const [x, w] = GetXandW(input);
            expect(TimePeriod.Min.Hour).to.eq(8);
            expect(x).to.eq(0);
            expect(w).to.eq(4);
        });

        it("case 2", () => {
            const input = TimePeriod.Parse("08:30 AM - 10:00 AM");
            const [x, w] = GetXandW(input);
            expect(TimePeriod.Min.Hour).to.eq(8);
            expect(x).to.eq(1);
            expect(w).to.eq(3);
        });

        it("case 3", () => {
            const input = TimePeriod.Parse("01:00 PM - 4:00 PM");
            const [x, w] = GetXandW(input);
            expect(TimePeriod.Min.Hour).to.eq(8);
            expect(x).to.eq(10);
            expect(w).to.eq(6);
        });

    });

});

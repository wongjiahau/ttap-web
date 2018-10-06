import {
    expect
} from "chai";
import { Time } from "./../../../att/time";
const clone = require("lodash.clone");
const find = require("lodash.find");
import { TimePeriod } from "../../../att/timePeriod";
import {
    RawSlot
} from "../../../model/rawSlot";
import {
    GenerateSlotAndDayLayouts,
    GetDayColumnLayouts,
    GetDayRows,
    GetXandW
} from "../generateSlotAndDayLayouts";

describe("GenerateSlotLayouts", () => {
    beforeEach(() => {
        TimePeriod.SetMinTo8am();
    });

    it("case 1", () => {
        const slot1 = new RawSlot();
        slot1.TimePeriod = "8:00 AM - 9:00 AM";
        slot1.Day = "Mon";
        const slot2 = clone(slot1);
        const result = GenerateSlotAndDayLayouts([slot1, slot2], 0, 0, "s")[0];
        const expected = [
            { h: 1, i: "s0", w: 2, x: 0, y: 0 },
            { h: 1, i: "s1", w: 2, x: 0, y: 1 }
        ];
        expect(result).to.deep.eq(expected);
    });

    it("case 2", () => {
        const slot1 = new RawSlot();
        slot1.TimePeriod = "8:00 AM - 9:00 AM";
        slot1.Day = "Mon";
        const slot2 = clone(slot1);
        const slot3 = new RawSlot();
        slot3.Day = "Mon";
        slot3.TimePeriod = "9:00 AM - 10:00 AM";
        const result = GenerateSlotAndDayLayouts([slot1, slot2, slot3], 0, 0, "s")[0];
        const expected = [
            { h: 1, i: "s0", w: 2, x: 0, y: 0 },
            { h: 1, i: "s1", w: 2, x: 0, y: 1 },
            { h: 1, i: "s2", w: 2, x: 2, y: 0 }
        ];
        expect(result).to.deep.eq(expected);
    });

    it("case 3", () => {
        const slot1 = new RawSlot();
        slot1.TimePeriod = "8:00 AM - 9:00 AM";
        slot1.Day = "Mon";
        const slot2 = clone(slot1);
        const slot3 = new RawSlot();
        slot3.Day = "Tue";
        slot3.TimePeriod = "8:00 AM - 9:00 AM";
        const result = GenerateSlotAndDayLayouts([slot1, slot2, slot3], 0, 0, "s")[0];
        const expected = [
            { h: 1, i: "s0", w: 2, x: 0, y: 0 },
            { h: 1, i: "s1", w: 2, x: 0, y: 1 },
            { h: 1, i: "s2", w: 2, x: 0, y: 2 }
        ];
        expect(result).to.deep.eq(expected);
    });

});

describe("GetDayRows", () => {
    it("case 1", () => {
        const result = GetDayRows();
        expect(result).to.deep.eq([{
            rowIndex: 0,
            state: [0, 0, 0, 0, 0]
        }, {
            rowIndex: 1,
            state: [0, 0, 0, 0, 0]
        }, {
            rowIndex: 2,
            state: [0, 0, 0, 0, 0]
        }, {
            rowIndex: 3,
            state: [0, 0, 0, 0, 0]
        }, {
            rowIndex: 4,
            state: [0, 0, 0, 0, 0]
        }, {
            rowIndex: 5,
            state: [0, 0, 0, 0, 0]
        }, {
            rowIndex: 6,
            state: [0, 0, 0, 0, 0]
        }, ]);
    });

});

describe("GetDayColumnLayouts", () => {
    it("case 1", () => {
        const dayRows = GetDayRows();
        const result = GetDayColumnLayouts(dayRows);
        expect(result).to.deep.eq([
            { h: 1, i: "d0", w: 2, x: 0, y: 0 },
            { h: 1, i: "d1", w: 2, x: 0, y: 1 },
            { h: 1, i: "d2", w: 2, x: 0, y: 2 },
            { h: 1, i: "d3", w: 2, x: 0, y: 3 },
            { h: 1, i: "d4", w: 2, x: 0, y: 4 },
            { h: 1, i: "d5", w: 2, x: 0, y: 5 },
            { h: 1, i: "d6", w: 2, x: 0, y: 6 },
            { h: 1, i: "d7", w: 2, x: 0, y: 7 },
        ]);
    });

    it("case 2", () => {
        const slot1 = new RawSlot();
        slot1.TimePeriod = "8:00 AM - 9:00 AM";
        slot1.Day = "Mon";
        const slot2 = clone(slot1);
        const result = GenerateSlotAndDayLayouts([slot1, slot2], 0, 0, "s")[1];
        expect(result).to.deep.eq([
            { h: 1, i: "d0", w: 2, x: 0, y: 0 },
            { h: 2, i: "d1", w: 2, x: 0, y: 1 },
            { h: 1, i: "d2", w: 2, x: 0, y: 3 },
            { h: 1, i: "d3", w: 2, x: 0, y: 4 },
            { h: 1, i: "d4", w: 2, x: 0, y: 5 },
            { h: 1, i: "d5", w: 2, x: 0, y: 6 },
            { h: 1, i: "d6", w: 2, x: 0, y: 7 },
            { h: 1, i: "d7", w: 2, x: 0, y: 8 },
        ]);
    });

});

describe("GetXandW()", () => {

    it("case 1", () => {
        const input = TimePeriod.Parse("08:00 AM - 10:00 AM");
        const [x, w] = GetXandW(input);
        expect(x).to.eq(0);
        expect(w).to.eq(4);
    });

    it("case 2", () => {
        const input = TimePeriod.Parse("08:30 AM - 10:00 AM");
        const [x, w] = GetXandW(input);
        expect(x).to.eq(1);
        expect(w).to.eq(3);
    });

    it("case 3", () => {
        const input = TimePeriod.Parse("01:00 PM - 4:00 PM");
        const [x, w] = GetXandW(input);
        expect(x).to.eq(10);
        expect(w).to.eq(6);
    });

});

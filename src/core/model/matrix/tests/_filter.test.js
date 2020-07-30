"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const timePeriod_1 = require("../../../att/timePeriod");
const filter_1 = require("../filter");
const testDataGenerator_1 = require("./../../../tests/testDataGenerator");
const stcBox_1 = require("./../stcBox");
const box1 = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 0, parseInt("10000", 2), 0); // Monday 10.00 am to 10.30 am
const box2 = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 2, parseInt("10000", 2), 0); // Wednesday 10.00 am to 10.30 am
const timetables = testDataGenerator_1.GetTestTimetables1();
describe("Filter()", () => {
    beforeEach(() => {
        timePeriod_1.TimePeriod.SetMinTo8am();
    });
    it("should throw error if box kind is not MaybeOccupied", () => {
        chai_1.expect(() => { filter_1.Filter(timetables, new stcBox_1.STCBox(stcBox_1.BoxKind.DefinitelyUnoccupied, 0, 0, 0)); }).to.throw();
        chai_1.expect(() => { filter_1.Filter(timetables, new stcBox_1.STCBox(stcBox_1.BoxKind.DefinitelyOccupied, 0, 0, 0)); }).to.throw();
        chai_1.expect(() => { filter_1.Filter(timetables, new stcBox_1.STCBox(stcBox_1.BoxKind.Clicked, 0, 0, 0)); }).to.throw();
        chai_1.expect(() => { filter_1.Filter(timetables, new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 0, 0, 0)); }).to.not.throw();
    });
    it("should return a tuple : [filtrate, residue]", () => {
        const result = filter_1.Filter(timetables, box1);
        chai_1.expect(result.length).to.eq(2);
    });
    it("case 1", () => {
        const [filtrate, residue] = filter_1.Filter(timetables, box1);
        chai_1.expect(filtrate.length).to.eq(24);
        chai_1.expect(residue.length).to.eq(5);
    });
    it("case 2", () => {
        const [filtrate1, residue1] = filter_1.Filter(timetables, box1);
        const [filtrate2, residue2] = filter_1.Filter(filtrate1, box2);
        chai_1.expect(filtrate2.length).to.eq(16);
        chai_1.expect(residue1.length + residue2.length).to.eq(13);
    });
});
//# sourceMappingURL=_filter.test.js.map
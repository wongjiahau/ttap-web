"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const timePeriod_1 = require("../../../att/timePeriod");
const defilter_1 = require("../defilter");
const filter_1 = require("../filter");
const testDataGenerator_1 = require("./../../../tests/testDataGenerator");
const stcBox_1 = require("./../stcBox");
const box1 = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 0, parseInt("10000", 2), 0); // Monday 10.00 am to 10.30 am
const box2 = new stcBox_1.STCBox(stcBox_1.BoxKind.Clicked, 0, parseInt("10000", 2), 0); // Monday 10.00 am to 10.30 am
const box3 = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 2, parseInt("10000", 2), 0); // Wednesday 10.00 am to 10.30 am
const box4 = new stcBox_1.STCBox(stcBox_1.BoxKind.Clicked, 2, parseInt("10000", 2), 0); // Wednesday 10.00 am to 10.30 am
const timetables = testDataGenerator_1.GetTestTimetables1();
describe("Defilter()", () => {
    beforeEach(() => {
        timePeriod_1.TimePeriod.SetMinTo8am();
    });
    it("should throw error if clickedTimeConstraint.length is not 7", () => {
        const clickedTimeConstraint = new Array(8);
        chai_1.expect(() => {
            defilter_1.Defilter(timetables, clickedTimeConstraint);
        }).to.throw();
    });
    it("should not throw error if clickedTimeConstraint.length is 7", () => {
        const clickedTimeConstraint = new Array(7).map((x) => 0);
        chai_1.expect(() => {
            defilter_1.Defilter(timetables, clickedTimeConstraint);
        }).to.not.throw();
    });
    it("should return a tuple : [rescuedTimetables, unrescuedTimetables]", () => {
        const result = defilter_1.Defilter(timetables, new Array(7).map((x) => 0));
        chai_1.expect(result.length).to.eq(2);
    });
    it("case 1", () => {
        const box = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 0, parseInt("1000000", 2), 0); // Monday 10.00 am to 10.30 am
        const [filtrate, residue] = filter_1.Filter(timetables, box);
        const clickedTimeConstraint = [0, 0, 0, 0, 0, 0, 0];
        chai_1.expect(residue.length).to.eq(5);
        const [rescuedTimetables, unrescuedTimetables] = defilter_1.Defilter(residue, clickedTimeConstraint);
        chai_1.expect(rescuedTimetables.length).to.eq(residue.length);
        chai_1.expect(unrescuedTimetables.length).to.eq(0);
    });
    it("case 2", () => {
        const [filtrate1, residue1] = filter_1.Filter(timetables, box1);
        const [filtrate2, residue2] = filter_1.Filter(filtrate1, box3);
        const totalResidue = residue1.concat(residue2);
        chai_1.expect(totalResidue.length).to.eq(13);
        const clickedTimeConstraint = [parseInt("1000000", 2), 0, 0, 0, 0, 0, 0];
        const [rescuedTimetables, unrescuedTimetables] = defilter_1.Defilter(totalResidue, clickedTimeConstraint);
        chai_1.expect(rescuedTimetables.length).to.eq(8);
        chai_1.expect(unrescuedTimetables.length).to.eq(5);
    });
});
//# sourceMappingURL=_defilter.test.js.map
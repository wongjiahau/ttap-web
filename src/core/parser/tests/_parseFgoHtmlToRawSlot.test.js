"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const last = require("lodash.last");
const uniqWith = require("lodash.uniqwith");
const testManager_1 = require("../../tests/testManager");
const parseFgoHtmlToRawSlot_1 = require("../parseFgoHtmlToRawSlot");
describe.skip("ParseHtmlToRawSlot", () => {
    const html = new testManager_1.default().GetDataFrom(testManager_1.FileName.all_fes_slots);
    const rawSlots = parseFgoHtmlToRawSlot_1.ParseFgoHtmlToRawSlot(html);
    it("should not contain duplicates", () => {
        const uniques = uniqWith(rawSlots, parseFgoHtmlToRawSlot_1.IsRawSlotEquals);
        chai_1.expect(uniques.length).to.eq(rawSlots.length);
    });
    it("case 1", () => {
        chai_1.expect(rawSlots[0]).to.deep.eq({
            Uid: 0,
            SubjectCode: "MPU32033",
            SubjectName: "ENGLISH FOR PROFESSIONALS",
            Number: "1",
            Type: "L",
            Group: "1",
            ClassSize: "40",
            Day: "Mon",
            TimePeriod: "01:00 PM - 02:00 PM",
            CreditHour: "1.0",
            WeekNumber: "1-14",
            Room: "KB316",
            Remark: ""
        });
    });
    it("case 2", () => {
        chai_1.expect(last(rawSlots)).to.deep.eq({
            Uid: 1688,
            SubjectCode: "UJLL1093",
            SubjectName: "INTRODUCTION TO KOREAN",
            Number: "1311",
            Type: "T",
            Group: "2",
            ClassSize: "20",
            Day: "Wed",
            TimePeriod: "11:00 AM - 12:00 PM",
            CreditHour: "1.0",
            WeekNumber: "1-14",
            Room: "KB521",
            Remark: ""
        });
    });
    it("case 3: subslots will not have property of ClassSize and Remark", () => {
        chai_1.expect(rawSlots.filter((x) => x.Number === "660")[1]).to.deep.eq({
            Uid: 799,
            SubjectCode: "UEEP2623",
            SubjectName: "MICROELECTRONIC CIRCUIT ANALYSIS",
            Number: "660",
            Type: "L",
            Group: "1",
            // ClassSize:   "15",
            Day: "Tue",
            TimePeriod: "08:00 AM - 10:00 AM",
            CreditHour: "2.0",
            WeekNumber: "1-14",
            Room: "KB326",
        });
    });
    it("case 4", () => {
        const maxSlotNumber = 1311; // The slot number of the last slot
        const numberOfSubSlots = 378; // By counting occurence of subRows in the raw HTML
        const numberOfDuplicatedSlots = 37;
        chai_1.expect(rawSlots).to.have.lengthOf(maxSlotNumber + numberOfSubSlots - numberOfDuplicatedSlots);
    });
});
//# sourceMappingURL=_parseFgoHtmlToRawSlot.test.js.map
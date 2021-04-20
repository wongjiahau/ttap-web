"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const last = require("lodash.last");
const uniqWith = require("lodash.uniqwith");
const parseFgoHtmlToRawSlot_v2_1 = require("../parseFgoHtmlToRawSlot_v2");
const fs = require("fs");
describe("ParseFgoHtmlToRawSlot_v2", () => {
    const html = fs.readFileSync('./testData/fgo-2020-Sept.html').toString();
    const rawSlots = parseFgoHtmlToRawSlot_v2_1.ParseFgoHtmlToRawSlot_v2(html);
    it("should not contain duplicates", () => {
        const uniques = uniqWith(rawSlots, parseFgoHtmlToRawSlot_v2_1.IsRawSlotEquals);
        chai_1.expect(uniques.length).to.eq(rawSlots.length);
    });
    it("case 1", () => {
        chai_1.expect(rawSlots[0]).to.deep.eq({
            Uid: 0,
            SubjectCode: 'MPU3113',
            SubjectName: 'HUBUNGAN ETNIK (FOR LOCAL STUDENTS)',
            Number: '1',
            Type: 'L',
            Group: '1',
            TimePeriod: '03:00 PM - 06:00 PM',
            Day: 'Mon',
            WeekNumber: '1-7',
            Room: 'KB209',
            CreditHour: '3',
            ClassMode: 'OTL',
            ClassSize: '100',
            Remark: ''
        });
        chai_1.expect(rawSlots[1]).to.deep.eq({
            Uid: 1,
            SubjectCode: 'MPU3113',
            SubjectName: 'HUBUNGAN ETNIK (FOR LOCAL STUDENTS)',
            Number: '1',
            Type: 'L',
            Group: '1',
            TimePeriod: '08:00 AM - 11:00 AM',
            Day: 'Thu',
            WeekNumber: '1-7',
            Room: 'KB209',
            CreditHour: '3',
            ClassMode: 'OTL'
        });
    });
    it("case 2", () => {
        chai_1.expect(last(rawSlots)).to.deep.eq({
            Uid: 532,
            SubjectCode: 'UKTC1013',
            SubjectName: 'CROSS CULTURAL MANAGEMENT',
            Number: '389',
            Type: 'T',
            Group: '3',
            TimePeriod: '01:00 PM - 03:00 PM',
            Day: 'Tue',
            WeekNumber: '1-7',
            Room: '',
            CreditHour: '3',
            ClassMode: 'OTL',
            ClassSize: '20',
            Remark: ''
        });
    });
    it("case 3", () => {
        const maxSlotNumber = 389; // The slot number of the last slot
        // By counting occurence of subRows in the raw HTML by running `document.querySelectorAll("[id^=subRow]").length`
        const numberOfSubSlots = 144;
        const numberOfDuplicatedSlots = 8;
        chai_1.expect(rawSlots).to.have.lengthOf(maxSlotNumber + numberOfSubSlots - numberOfDuplicatedSlots);
    });
});
//# sourceMappingURL=_parseFgoHtmlToRawSlot_v2.test.js.map
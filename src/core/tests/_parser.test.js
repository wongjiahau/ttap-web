"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const find = require("lodash.find");
const last = require("lodash.last");
const parseStudentHtmlToRawSlot_1 = require("../parser/parseStudentHtmlToRawSlot");
const parseRawSlotToSubject_1 = require("../parser/parseRawSlotToSubject");
const str_1 = require("../util/str");
const testManager_1 = require("./testManager");
const testManager_2 = require("./testManager");
const jiahau2017septHtml = new testManager_1.default().GetDataFrom(testManager_2.FileName.jiahau_2017_sept);
describe("Parser which is used to parse html into slots", () => {
    it("jiahau_2017_sept's last slot should have hash id of 202", () => {
        const plainHtml = jiahau2017septHtml;
        const result = parseStudentHtmlToRawSlot_1.default(plainHtml);
        chai_1.expect(last(result).Uid)
            .to
            .equal(202);
    });
    it("jiahau_2017_sept's data should have 203 slots", () => {
        const plainHtml = jiahau2017septHtml;
        const result = parseStudentHtmlToRawSlot_1.default(plainHtml);
        chai_1.expect(result.length)
            .to
            .equal(203);
    });
    it("jiahau_2017_sept's last slot should have number of 129", () => {
        const plainHtml = jiahau2017septHtml;
        const result = parseStudentHtmlToRawSlot_1.default(plainHtml);
        chai_1.expect(last(result).Number)
            .to
            .equal("129");
    });
    it("jiahau_2017_sept's data should have 20 subjects", () => {
        const plainHtml = jiahau2017septHtml;
        const result = parseRawSlotToSubject_1.ParseRawSlotToSubject(parseStudentHtmlToRawSlot_1.default(plainHtml));
        chai_1.expect(result.length)
            .to
            .equal(20);
    });
    it("jiahau_2017_sept's data first subject (sorted by name) should be Artificial Inte" +
        "lligence", () => {
        const plainHtml = jiahau2017septHtml;
        const result = parseRawSlotToSubject_1.ParseRawSlotToSubject(parseStudentHtmlToRawSlot_1.default(plainHtml));
        chai_1.expect(result[0].Name.toLowerCase())
            .to
            .equal("Artificial Intelligence".toLowerCase());
    });
    it("jiahau_2017_sept's data first subject (sorted by name) should be TITAS", () => {
        const plainHtml = jiahau2017septHtml;
        const result = parseRawSlotToSubject_1.ParseRawSlotToSubject(parseStudentHtmlToRawSlot_1.default(plainHtml));
        chai_1.expect(new str_1.Str(last(result).Name.toLowerCase()).Contains("titas"))
            .to
            .equal(true);
    });
    it("jiahau_2017_sept's data subject Management Principles should contain 7 slots", () => {
        const plainHtml = jiahau2017septHtml;
        const result = parseRawSlotToSubject_1.ParseRawSlotToSubject(parseStudentHtmlToRawSlot_1.default(plainHtml));
        chai_1.expect(find(result, { Name: "MANAGEMENT PRINCIPLES" }).SlotUids).to.have.lengthOf(7);
    });
    it("keli_2017_sept's data : subject UKAI3013 shold have name of E-Commerce", () => {
        const plainHtml = new testManager_1.default().GetDataFrom(testManager_2.FileName.keli_2017_sept);
        const result = parseStudentHtmlToRawSlot_1.default(plainHtml);
        chai_1.expect(result.filter((s) => new str_1.Str(s.SubjectCode).Contains("UKAI3013"))[0].SubjectName)
            .to
            .equal("E-COMMERCE");
    });
});
//# sourceMappingURL=_parser.test.js.map
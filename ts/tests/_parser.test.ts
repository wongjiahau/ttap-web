import {expect} from "chai";

const find = require("lodash.find");
const last = require("lodash.last");

import ParseHtmlToSlots from "../parser/parseStudentHtmlToRawSlot";
import {ParseRawSlotToSubject} from "../parser/parseRawSlotToSubject";
import { Str } from "../util/str";
import testManager from "./testManager";
import {FileName} from "./testManager";

const jiahau2017septHtml = new testManager().GetDataFrom(FileName.jiahau_2017_sept);

describe("Parser which is used to parse html into slots", () => {
    it("jiahau_2017_sept's last slot should have hash id of 202", () => {
        const plainHtml = jiahau2017septHtml;
        const result = ParseHtmlToSlots(plainHtml);
        expect(last(result).Uid)
            .to
            .equal(202);
    });

    it("jiahau_2017_sept's data should have 203 slots", () => {
        const plainHtml = jiahau2017septHtml;
        const result = ParseHtmlToSlots(plainHtml);
        expect(result.length)
            .to
            .equal(203);
    });

    it("jiahau_2017_sept's last slot should have number of 129", () => {
        const plainHtml = jiahau2017septHtml;
        const result = ParseHtmlToSlots(plainHtml);
        expect(last(result).Number)
            .to
            .equal("129");
    });

    it("jiahau_2017_sept's data should have 20 subjects", () => {
        const plainHtml = jiahau2017septHtml;
        const result = ParseRawSlotToSubject(ParseHtmlToSlots(plainHtml));
        expect(result.length)
            .to
            .equal(20);
    });

    it("jiahau_2017_sept's data first subject (sorted by name) should be Artificial Inte" +
            "lligence",
    () => {
        const plainHtml = jiahau2017septHtml;
        const result = ParseRawSlotToSubject(ParseHtmlToSlots(plainHtml));
        expect(result[0].Name.toLowerCase())
            .to
            .equal("Artificial Intelligence".toLowerCase());
    });

    it("jiahau_2017_sept's data first subject (sorted by name) should be TITAS", () => {
        const plainHtml = jiahau2017septHtml;
        const result = ParseRawSlotToSubject(ParseHtmlToSlots(plainHtml));
        expect(new Str(last(result).Name.toLowerCase()).Contains("titas"))
            .to
            .equal(true);
    });

    it("jiahau_2017_sept's data subject Management Principles should contain 7 slots", () => {
        const plainHtml = jiahau2017septHtml;
        const result = ParseRawSlotToSubject(ParseHtmlToSlots(plainHtml));
        expect(find(result, {Name: "MANAGEMENT PRINCIPLES"}).SlotUids).to.have.lengthOf(7);
    });

    it("keli_2017_sept's data : subject UKAI3013 shold have name of E-Commerce", () => {
        const plainHtml = new testManager().GetDataFrom(FileName.keli_2017_sept);
        const result = ParseHtmlToSlots(plainHtml);
        expect(result.filter((s) => new Str(s.SubjectCode).Contains("UKAI3013"))[0].SubjectName)
        .to
        .equal("E-COMMERCE");
    });

});

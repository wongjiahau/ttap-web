import { expect } from "chai";
const last = require("lodash.last");
const omit = require("lodash.omit");
import TestManager, { FileName } from "../../tests/testManager";
import { ParseLargeHtmlToRawSlot } from "../parseLargeHtmlToRawSlot";
import { IRawSlot } from "./../../model/rawSlot";

const html = new TestManager().GetDataFrom(FileName.all_fes_slots);
const rawSlots = ParseLargeHtmlToRawSlot(html);

describe("ParseHtmlToRawSlot", () => {
    it("case 1", () => {
        expect(rawSlots[0]).to.deep.eq({
            Uid:         0,
            SubjectCode: "MPU32033",
            SubjectName: "ENGLISH FOR PROFESSIONALS",
            Number:      "1",
            Type:        "L",
            Group:       "1",
            ClassSize:   "40",
            Day:         "Mon",
            TimePeriod:  "01:00 PM - 02:00 PM",
            CreditHour:  "1.0",
            WeekNumber:  "1-14",
            Room:        "KB316",
            Remark:      ""
        });
    });

    it("case 2", () => {
        expect(last(rawSlots)).to.deep.eq({
            Uid: 1688,
            SubjectCode: "UJLL1093",
            SubjectName: "INTRODUCTION TO KOREAN",
            Number:      "1311",
            Type:        "T",
            Group:       "2",
            ClassSize:   "20",
            Day:         "Wed",
            TimePeriod:  "11:00 AM - 12:00 PM",
            CreditHour:  "1.0",
            WeekNumber:  "1-14",
            Room:        "KB521",
            Remark:      ""
        });
    });

    it("case 3: subslots will not have property of ClassSize and Remark", () => {
        expect(rawSlots.filter((x) => x.Number === "660")[1]).to.deep.eq({
            Uid: 799,
            SubjectCode: "UEEP2623",
            SubjectName: "MICROELECTRONIC CIRCUIT ANALYSIS",
            Number:      "660",
            Type:        "L",
            Group:       "1",
            // ClassSize:   "15",
            Day:         "Tue",
            TimePeriod:  "08:00 AM - 10:00 AM",
            CreditHour:  "2.0",
            WeekNumber:  "1-14",
            Room:        "KB326",
            // Remark:      ""
        });
    });

    it("case 4", () => {
        const maxSlotNumber = 1311; // The slot number of the last slot
        const numberOfSubSlots = 378; // By counting occurence of subRows in the raw HTML
        expect(rawSlots).to.have.lengthOf(maxSlotNumber + numberOfSubSlots);
    });
});

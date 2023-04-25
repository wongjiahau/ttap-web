const last = require("lodash.last");
const uniqWith = require("lodash.uniqwith");
import * as fs from "fs";
import ParseStudentHtmlToRawSlot_v2 from "../parseStudentHtmlToRawSlot_v2";
import { IsRawSlotEquals } from "../parseFgoHtmlToRawSlot";

describe("ParseStudentHtmlToRawSlot_v2", () => {
  const html = fs.readFileSync("./testData/student-2020-Sept.html").toString();
  const rawSlots = ParseStudentHtmlToRawSlot_v2(html);
  it("should not contain duplicates", () => {
    const uniques = uniqWith(rawSlots, IsRawSlotEquals);
    expect(uniques.length).toEqual(rawSlots.length);
  });

  it("case 1", () => {
    const slot = rawSlots.find((slot) => slot.Uid === 76);
    expect(slot).toEqual({
      Uid: 76,
      SubjectCode: "UALL3033",
      SubjectName: "PUBLIC SPEAKING AND ORAL PRESENTATION",
      Number: "55",
      Type: "L",
      Group: "1",
      TimePeriod: "10:00 AM - 12:00 PM",
      Day: "Tue",
      WeekNumber: "1-7",
      Room: "To be arranged",
      CreditHour: "3.00",
      ClassMode: "OTL",
    });
  });

  it("case 2", () => {
    expect(rawSlots[0]).toEqual({
      Uid: 0,
      SubjectCode: "MPU3113",
      SubjectName: "HUBUNGAN ETNIK (FOR LOCAL STUDENTS)",
      Number: "1",
      Type: "L",
      Group: "2",
      TimePeriod: "08:00 AM - 11:00 AM",
      Day: "Tue",
      WeekNumber: "1-7",
      Room: "To be arranged",
      CreditHour: "3.00",
      ClassMode: "OTL",
      ClassSize: "130",
      Remark: "",
    });

    expect(last(rawSlots)).toEqual({
      Uid: 148,
      SubjectCode: "UKTC1013",
      SubjectName: "CROSS CULTURAL MANAGEMENT",
      Number: "115",
      Type: "T",
      Group: "3",
      TimePeriod: "01:00 PM - 03:00 PM",
      Day: "Tue",
      WeekNumber: "1-7",
      Room: "To be arranged",
      CreditHour: "3.00",
      ClassMode: "OTL",
      ClassSize: "20",
      Remark: "",
    });
  });

  it("case 3", () => {
    const maxSlotNumber = 115; // The slot number of the last slot

    // By counting occurence of subRows in the raw HTML by running `document.querySelectorAll("[id^=subRow]").length`
    const numberOfSubSlots = 34;

    expect(rawSlots).toHaveLength(maxSlotNumber + numberOfSubSlots);
  });

  it("should be able to parse subjects noted with 'Subject to change'", () => {
    const html = fs
      .readFileSync("./testData/unitreg-2023-04-25-ng-kai-en.html")
      .toString();

    const rawSlots = ParseStudentHtmlToRawSlot_v2(html);

    const assert = (
      subjectCode: string,
      lectureCount: number,
      tutorialCount: number
    ) => {
      const slots = rawSlots.filter(
        (rawSlot) => rawSlot.SubjectCode === subjectCode
      );
      expect(slots.filter((slot) => slot.Type === "L")).toHaveLength(
        lectureCount
      );
      expect(slots.filter((slot) => slot.Type === "T")).toHaveLength(
        tutorialCount
      );
    };

    // The following subjects are noted with "Subject to change" in the page
    assert("UALJ2013", 1, 2);
    assert("UBFB3743", 1, 1);
    assert("UBFF2033", 1, 2);
    assert("UBFF2083", 1, 3);
    assert("UBFF3713", 1, 2);
    assert("UBFF3763", 1, 2);
    assert("UBFF3983", 1, 3);
    assert("UBFF3993", 1, 4);
    assert("UBFF4014", 1, 3);
  });
});

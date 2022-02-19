import { expect } from "chai";
import { TimePeriod } from "../../att/timePeriod";
import { HENG_2017_APR } from "../../tests/testData/heng_2017_apr";
import { ParseRawSlotToSlot } from "../parseRawSlotToSlot";
import { ParseSlotToBigSlot } from "../parseSlotToBigSlot";

const testSlots = HENG_2017_APR();

describe("ParseSlotToBigSlot", () => {
  beforeEach(() => {
    TimePeriod.SetMinTo8am();
  });

  it("case 1", () => {
    const rawSlots = testSlots.filter((s) => s.Uid === 166);
    expect(rawSlots).to.deep.eq([
      {
        Uid: 166,
        SubjectCode: "UEME2123",
        SubjectName: "Fluid Mechanics I",
        Number: "160",
        Type: "P",
        Group: "7",
        Day: "Tue",
        TimePeriod: "  2:00 PM -  5:00 PM",
        WeekNumber: "3,9",
        Room: "KB731",
      },
    ]);
    expect(rawSlots[0].WeekNumber).to.eq("3,9");
    const bigSlots = ParseSlotToBigSlot(ParseRawSlotToSlot(rawSlots));
    expect(bigSlots).to.have.lengthOf(1);
    expect(bigSlots[0].DayTimeMatrix).to.have.lengthOf(14 * 7);
    expect(bigSlots[0].DayTimeMatrix).to.deep.eq([
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 1
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 2
      0,
      258048,
      0,
      0,
      0,
      0,
      0, // week 3
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 4
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 5
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 6
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 7
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 8
      0,
      258048,
      0,
      0,
      0,
      0,
      0, // week 9
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 10
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 11
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 12
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 13
      0,
      0,
      0,
      0,
      0,
      0,
      0, // week 14
    ]);

    /**
     * What is 258048???
     * If you convert 258048 to binary you will get 111111000000000000
     * This actually means 2.00 pm to 5.00 pm
     * Each digit means a half hour interval
     * 0 means no class, 1 means got class
     * The most right 0 stands for 8.00 am to 8.30 pm (Because we set the min to be 8am)
     * The most left 1 stands for 4.30 pm to 5.00 pm
     */
  });
});

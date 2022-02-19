import { expect } from "chai";
const find = require("lodash.find");
import { RawSlot } from "../../model/rawSlot";
import { CreateSlotFromRaw } from "../../model/slot";
import ParseStudentHtmlToRawSlot from "../../parser/parseStudentHtmlToRawSlot";
import TestManager, { FileName } from "../../tests/testManager";
import { IBigSlot, newBigSlot } from "../bigSlot";
import { GotIntersection } from "../matrix";

const testSlots = (async () =>
  ParseStudentHtmlToRawSlot(
    await new TestManager().GetDataFrom(FileName.cf_2017_nov)
  ))();
describe("BigSlot", () => {
  it("DayTimeMatrix should have length of 7 * 14 (case 1)", async () => {
    const rawSlot = find(await testSlots, {
      Number: "129",
    });
    expect(rawSlot.WeekNumber).to.eq("2,8");
    const slot = CreateSlotFromRaw(rawSlot);
    const result = newBigSlot(slot);
    expect(result.DayTimeMatrix).to.have.lengthOf(7 * 14);
  });

  it("DayTimeMatrix should have length of 7 * 14 (case 2)", async () => {
    const rawSlot = find(await testSlots, {
      Number: "1",
    });
    expect(rawSlot.WeekNumber).to.eq("1-14");
    const slot = CreateSlotFromRaw(rawSlot);
    const result = newBigSlot(slot);
    expect(result.DayTimeMatrix).to.have.lengthOf(7 * 14);
  });

  it("DayTimeMatrix should be array of number, where every 7 number represent matrix of a week", async () => {
    const rawSlot = find(await testSlots, {
      Number: "1",
    });
    rawSlot.WeekNumber = "2";
    const slot = CreateSlotFromRaw(rawSlot);
    const result = newBigSlot(slot);
    expect(result.DayTimeMatrix).to.have.lengthOf(7 * 14);

    // prettier-ignore
    expect(result.DayTimeMatrix).to.deep.eq([
      0, 0, 0, 0, 0, 0, 0, // week 1
      63, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, // week 14
    ]);
  });

  it("check for intersection 1", () => {
    const x = new RawSlot();
    x.WeekNumber = "2,8";
    x.TimePeriod = "2:00 PM - 5:00 PM";
    x.Day = "Mon";
    x.SubjectCode = "XXX";
    x.SubjectName = "XXX";
    x.Type = "T";
    const y = new RawSlot();
    y.WeekNumber = "3,7";
    y.TimePeriod = "2:00 PM - 5:00 PM";
    y.Day = "Mon";
    y.SubjectCode = "XXX";
    y.SubjectName = "XXX";
    y.Type = "T";
    const slot1 = newBigSlot(CreateSlotFromRaw(x));
    const slot2 = newBigSlot(CreateSlotFromRaw(y));
    expect(GotIntersection(slot1.DayTimeMatrix, slot2.DayTimeMatrix)).to.eq(
      false
    );
  });

  it("check for intersection 2", () => {
    const x = new RawSlot();
    x.WeekNumber = "3,8";
    x.TimePeriod = "2:00 PM - 5:00 PM";
    x.Day = "Mon";
    x.SubjectCode = "XXX";
    x.SubjectName = "XXX";
    x.Type = "T";
    const y = new RawSlot();
    y.WeekNumber = "3,7";
    y.TimePeriod = "2:00 PM - 5:00 PM";
    y.Day = "Mon";
    y.SubjectCode = "XXX";
    y.SubjectName = "XXX";
    y.Type = "T";
    const slot1 = newBigSlot(CreateSlotFromRaw(x));
    const slot2 = newBigSlot(CreateSlotFromRaw(y));
    expect(GotIntersection(slot1.DayTimeMatrix, slot2.DayTimeMatrix)).to.eq(
      true
    );
  });
});

import { expect } from "chai";
const isEqual = require("lodash.isequal");
import { TimePeriod } from "../../att/timePeriod";
import { ParseRawSlotToSlot } from "../../parser/parseRawSlotToSlot";
import { ParseSlotToTinySlot } from "../../parser/parseSlotToTinySlot";
import { CodeOf } from "../../tests/testData/heng_2017_sept";
import { CreateSlotFromInterface, ISlot } from "./../../model/slot";
import { GetRawSlotsOf, GetTinySlotsOf } from "./../../tests/testDataGenerator";
import { TinySlot } from "./../tinySlot";

function GetTestSlot() {
  const result: ISlot = {
    Day: 1, // 1 means Monday
    Group: 2,
    Uid: 3,
    SlotNumber: 4,
    SubjectCode: 333,
    SubjectName: "XXX",
    TimePeriod: 15, // 15 = 1111 in base 2
    Type: "L",
    Week: 15, // 15 = 1111 in base 2
  };
  return CreateSlotFromInterface(result);
}
describe("tinySlot", () => {
  beforeEach(() => {
    TimePeriod.SetMinTo8am();
  });

  describe("constructor", () => {
    it("should set SlotNumber", () => {
      const result = new TinySlot(GetTestSlot());
      expect(result.SlotNumber).to.eq(4);
    });

    it("should set Uids", () => {
      const result = new TinySlot(GetTestSlot());
      expect(isEqual(result.SlotIds, [3])).to.eq(true);
    });

    it("should set PartitionKey", () => {
      const result = new TinySlot(GetTestSlot());
      expect(result.PartitionKey).to.eq(3330);
    });

    it("should set DayTimeMatrix 1", () => {
      const result = new TinySlot(GetTestSlot());
      const expected = [15, 0, 0, 0, 0, 0, 0];
      expect(isEqual(result.DayTimeMatrix, expected)).to.eq(true);
    });

    it("should set DayTimeMatrix 2", () => {
      const bkaSlots = GetRawSlotsOf(CodeOf.BKA);
      expect(bkaSlots).to.deep.eq([
        {
          Uid: 16,
          SubjectCode: "MPU32013",
          SubjectName: "BAHASA KEBANGSAAN A",
          Number: "9",
          Type: "L",
          Group: "1",
          ClassSize: "30",
          Day: "Tue",
          TimePeriod: "08:00 AM - 11:00 AM",
          CreditHour: "3.0",
          WeekNumber: "1-7",
          Room: "KB204",
          Remark: "",
        },
        {
          Uid: 17,
          SubjectCode: "MPU32013",
          SubjectName: "BAHASA KEBANGSAAN A",
          Number: "9",
          Type: "L",
          Group: "1",
          Day: "Wed",
          TimePeriod: "08:00 AM - 11:00 AM",
          CreditHour: "3.0",
          WeekNumber: "1-7",
          Room: "KB201",
        },
      ]);
      const result = ParseSlotToTinySlot(ParseRawSlotToSlot(bkaSlots));
      const expected = [
        0,
        parseInt("111111", 2),
        parseInt("111111", 2),
        0,
        0,
        0,
        0,
      ];
      expect(result[0].DayTimeMatrix).to.deep.eq(expected);
    });
  });
});

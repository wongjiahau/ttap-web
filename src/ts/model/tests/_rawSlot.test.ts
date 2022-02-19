import { expect } from "chai";
import { CodeOf } from "../../tests/testData/heng_2017_sept";
import { RawSlot } from "../rawSlot";
import { GetTestRawSlot1 } from "./../../tests/testDataGenerator";

describe("RawSlot", () => {
  it("every RawSlot should have a unique Uid", () => {
    const rawSlot1 = new RawSlot();
    const rawSlot2 = new RawSlot();
    expect(rawSlot1.Uid).to.not.eq(rawSlot2.Uid);
  });

  describe("ResetUid", () => {
    it("is to make sure no rawslots can have the same uid", () => {
      const rawSlot1 = new RawSlot();
      rawSlot1.Uid = 1;
      const rawSlot2 = new RawSlot();
      rawSlot2.Uid = 1;
      expect(rawSlot1.Uid).to.eq(rawSlot2.Uid);
      RawSlot.ResetUid(rawSlot1);
      RawSlot.ResetUid(rawSlot2);
      expect(rawSlot1.Uid).to.not.eq(rawSlot2.Uid);
    });
  });
});

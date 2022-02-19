import { expect } from "chai";
import { ParseRawSlotToSubject } from "../parser/parseRawSlotToSubject";
import { GetInitial } from "../util/getInitial";
import { heng_2017_sept, IndexOf } from "./testData/heng_2017_sept";

describe("heng_2017_sept", () => {
  describe("IndexOf", () => {
    it("case 1", () => {
      const rawSlots = heng_2017_sept();
      const subjects = ParseRawSlotToSubject(rawSlots);
      const subjectNameInitials = subjects.map((x) => GetInitial(x.Name));
      const indexDic: { [key: string]: string | number } = {};
      subjectNameInitials.forEach((name, index) => {
        indexDic[name] = index;
        indexDic[index] = name;
      });
      expect(indexDic).to.deep.eq(IndexOf);
    });
  });
});

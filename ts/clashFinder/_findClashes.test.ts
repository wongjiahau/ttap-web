import { expect } from "chai";
import * as Combinatorics from "js-combinatorics";
import { ObjectStore } from "../dataStructure/objectStore";
import { Subject } from "../model/subject";
import ParseStudentHtmlToRawSlot from "../parser/parseStudentHtmlToRawSlot";
import { ParseRawSlotToSubject } from "../parser/parseRawSlotToSubject";
import { CodeOf } from "../tests/testData/heng_2017_apr";
import { GetTestRawSlot1 } from "../tests/testDataGenerator";
import { FindClashes } from "./findClashes";

const testSlots = GetTestRawSlot1();
const rawSlotStore = new ObjectStore(testSlots);
const testSubjects = () => ParseRawSlotToSubject(testSlots);

function get(subjectCode: string, subjects: Subject[]): Subject {
  return subjects.filter((x) => x.Code === subjectCode)[0];
}

describe("FindClashes()", () => {
  it("should throw error when input length is less than 2", () => {
    const subjects = testSubjects();
    const acp = get(CodeOf.ACP, subjects);
    expect(() => {
      FindClashes([acp], rawSlotStore);
    }).to.throw();
  });

  it("should mutate the input's ClasingCounterpart property only", () => {
    const subjects = testSubjects();
    const acp = get(CodeOf.ACP, subjects);
    const bka = get(CodeOf.BKA, subjects);
    const selectedSubjects = [acp, bka];
    const originalAcp = JSON.parse(JSON.stringify(acp));
    FindClashes(selectedSubjects, rawSlotStore);
    const mutatedAcp = JSON.parse(JSON.stringify(acp));
    expect(mutatedAcp).to.not.deep.eq(originalAcp);
    delete originalAcp.ClashingCounterparts;
    delete mutatedAcp.ClashingCounterparts;
    expect(mutatedAcp).to.deep.eq(originalAcp);
  });

  it("should not duplicate clashing counterparts", () => {
    const subjects = testSubjects();
    const acp = get(CodeOf.ACP, subjects);
    const bka = get(CodeOf.BKA, subjects);
    const selectedSubjects = [acp, bka];
    FindClashes(selectedSubjects, rawSlotStore);
    expect(acp.ClashingCounterparts.length).to.eq(1);
    expect(bka.ClashingCounterparts.length).to.eq(1);

    // Find clashes again
    FindClashes(selectedSubjects, rawSlotStore);
    expect(acp.ClashingCounterparts.length).to.eq(1);
    expect(bka.ClashingCounterparts.length).to.eq(1);
  });

  it("case 1", () => {
    const subjects = testSubjects();
    const acp = get(CodeOf.ACP, subjects);
    const bka = get(CodeOf.BKA, subjects);
    const selectedSubjects = [acp, bka];
    FindClashes(selectedSubjects, rawSlotStore);
    expect(acp.ClashingCounterparts).to.include(bka.Code);
    expect(bka.ClashingCounterparts).to.include(acp.Code);
  });

  it("case 2", () => {
    const subjects = testSubjects();
    const acp = get(CodeOf.ACP, subjects);
    const bka = get(CodeOf.BKA, subjects);
    const bmk = get(CodeOf.BMK2, subjects);
    const selectedSubjects = [acp, bka, bmk];
    FindClashes(selectedSubjects, rawSlotStore);
    expect(acp.ClashingCounterparts).to.deep.eq([bka.Code]);
    expect(bka.ClashingCounterparts).to.deep.eq([acp.Code, bmk.Code]);
    expect(bmk.ClashingCounterparts).to.deep.eq([bka.Code]);
  });

  it("case 3", () => {
    const subjects = testSubjects();
    const acp = get(CodeOf.ACP, subjects);
    const bmk = get(CodeOf.BMK2, subjects);
    const selectedSubjects = [acp, bmk];
    FindClashes(selectedSubjects, rawSlotStore);
    expect(acp.ClashingCounterparts.length === 0);
    expect(bmk.ClashingCounterparts.length === 0);
  });
});

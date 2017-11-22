import {
    expect
} from "chai";
import * as Combinatorics from "js-combinatorics";
import {
    GetTestSubjects1
} from "../tests/testDataGenerator";
import {
    FindClashes,
    GetClashingPairs
} from "./findClashes";

describe("FindClashes()", () => {
    it("should throw error when input length is less than 2", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) => x.Code === "MPU34022")[0]; // ACP
        expect(() => {
            FindClashes([acp]);
        }).to.throw();
    });

    it("should mutate the input's ClasingCounterpart property only", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) => x.Code === "MPU34022")[0]; // ACP
        const bka = subjects.filter((x) => x.Code === "MPU32013")[0]; // BKA
        const selectedSubjects = [acp, bka];
        const originalAcp = JSON.parse(JSON.stringify(acp));
        FindClashes(selectedSubjects);
        const mutatedAcp = JSON.parse(JSON.stringify(acp));
        expect(mutatedAcp).to.not.deep.eq(originalAcp);
        delete originalAcp.ClashingCounterparts;
        delete mutatedAcp.ClashingCounterparts;
        expect(mutatedAcp).to.deep.eq(originalAcp);
    });

    it("should not duplicate clashing counterparts", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) => x.Code === "MPU34022")[0]; // ACP
        const bka = subjects.filter((x) => x.Code === "MPU32013")[0]; // BKA
        const selectedSubjects = [acp, bka];
        FindClashes(selectedSubjects);
        expect(acp.ClashingCounterparts.length).to.eq(1);
        expect(bka.ClashingCounterparts.length).to.eq(1);

        // Find clashes again
        FindClashes(selectedSubjects);
        expect(acp.ClashingCounterparts.length).to.eq(1);
        expect(bka.ClashingCounterparts.length).to.eq(1);
    });

    it("case 1", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) => x.Code === "MPU34022")[0]; // ACP
        const bka = subjects.filter((x) => x.Code === "MPU32013")[0]; // BKA
        const selectedSubjects = [acp, bka];
        FindClashes(selectedSubjects);
        expect(acp.ClashingCounterparts).to.include(bka.Code);
        expect(bka.ClashingCounterparts).to.include(acp.Code);
    });

    it("case 2", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) => x.Code === "MPU34022")[0]; // ACP
        const bka = subjects.filter((x) => x.Code === "MPU32013")[0]; // BKA
        const bmk = subjects.filter((x) => x.Code === "MPU3143")[0]; // BMK
        const selectedSubjects = [acp, bka, bmk];
        FindClashes(selectedSubjects);
        expect(acp.ClashingCounterparts.length).to.eq(1);
        expect(bka.ClashingCounterparts.length).to.eq(2);
        expect(bmk.ClashingCounterparts.length).to.eq(1);
        expect(acp.ClashingCounterparts).to.include(bka.Code);
        expect(bka.ClashingCounterparts).to.include(acp.Code);
        expect(bka.ClashingCounterparts).to.include(bmk.Code);
        expect(bmk.ClashingCounterparts).to.include(bka.Code);
    });

    it("case 3", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) => x.Code === "MPU34022")[0]; // ACP
        const bmk = subjects.filter((x) => x.Code === "MPU3143")[0]; // BMK
        const selectedSubjects = [acp, bmk];
        FindClashes(selectedSubjects);
        expect(acp.ClashingCounterparts.length === 0);
        expect(bmk.ClashingCounterparts.length === 0);
    });

});

describe("GetClashingPairs()", () => {
    it("should throw error when some passed in subjects is not selected", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) => x.Code === "MPU34022")[0]; // ACP
        const bmk = subjects.filter((x) => x.Code === "MPU3143")[0]; // BMK
        const selectedSubjects = [acp, bmk];
        expect(() => {
            GetClashingPairs(selectedSubjects);
        }).to.throw();
    });

    it("case 1", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) => x.Code === "MPU34022")[0]; // ACP
        const bka = subjects.filter((x) => x.Code === "MPU32013")[0]; // BKA
        acp.IsSelected = true;
        bka.IsSelected = true;
        const selectedSubjects = [acp, bka];
        const result = GetClashingPairs(selectedSubjects);
        expect(result).to.have.lengthOf(1);
    });

    it("case 2", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) => x.Code === "MPU34022")[0]; // ACP
        const bka = subjects.filter((x) => x.Code === "MPU32013")[0]; // BKA
        const bmk = subjects.filter((x) => x.Code === "MPU3143")[0]; // BMK
        acp.IsSelected = true;
        bka.IsSelected = true;
        bmk.IsSelected = true;
        const selectedSubjects = [acp, bka, bmk];
        const result = GetClashingPairs(selectedSubjects);

    });
});

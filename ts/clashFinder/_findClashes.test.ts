import {
    expect
} from "chai";
import * as Combinatorics from "js-combinatorics";
import {
    GetTestSubjects1
} from "../tests/testDataGenerator";
import {
    FindClashes
} from "./findClashes";

describe("FindClashes()", () => {
    it("should not duplicate clashing counterparts", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) =>
            x.Code === "MPU34022" // ACP
        )[0];
        const bka = subjects.filter((x) =>
            x.Code === "MPU32013" // BKA
        )[0];
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
        const acp = subjects.filter((x) =>
            x.Code === "MPU34022" // ACP
        )[0];
        const bka = subjects.filter((x) =>
            x.Code === "MPU32013" // BKA
        )[0];
        const selectedSubjects = [acp, bka];
        FindClashes(selectedSubjects);
        expect(acp.ClashingCounterparts).to.include(bka.Code);
        expect(bka.ClashingCounterparts).to.include(acp.Code);
    });

    it("case 2", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects.filter((x) =>
            x.Code === "MPU34022" // ACP
        )[0];
        const bka = subjects.filter((x) =>
            x.Code === "MPU32013" // BKA
        )[0];
        const bmk = subjects.filter((x) =>
            x.Code === "MPU3143" // BMK
        )[0];
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
        const acp = subjects.filter((x) =>
            x.Code === "MPU34022" // ACP
        )[0];
        const bmk = subjects.filter((x) =>
            x.Code === "MPU3143" // BMK
        )[0];
        const selectedSubjects = [acp, bmk];
        FindClashes(selectedSubjects);
        expect(acp.ClashingCounterparts.length === 0);
        expect(bmk.ClashingCounterparts.length === 0);
    });
});

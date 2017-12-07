import {
    expect
} from "chai";
import {
    concat
} from "lodash";
import {
    CodeOf,
    HENG_2017_APR
} from "../../tests/testData/heng_2017_apr";
import {
    FindTimetableV2
} from "../findTimetableV2";

const input = concat(
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.H), // Hydrology
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.SA2), // Structural Analysis II
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.HT), // Highway Transportation
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.FM2), // Fluid Mechanic II
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.ITBS), // Introduction To Building Services
);

describe("FindTimetableV2", () => {
    it("case 1", () => {
        const isCI = require("is-ci");
        if (!isCI) {
            const result = FindTimetableV2(input);
            expect(result).to.have.lengthOf(285696);
        }
    });

});

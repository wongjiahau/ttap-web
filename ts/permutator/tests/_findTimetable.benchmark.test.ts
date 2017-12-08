import {
    expect
} from "chai";
import {
    concat,
    uniq
} from "lodash";
import {
    ParseRawSlotToSlot
} from "../../parser/parseRawSlotToSlot";
import {
    ParseSlotToBigSlot
} from "../../parser/parseSlotToBigSlot";
import {
    ParseSlotToTinySlot
} from "../../parser/parseSlotToTinySlot";
import {
    CodeOf,
    HENG_2017_APR
} from "../../tests/testData/heng_2017_apr";
import {
    FindTimetable
} from "../findTimetable";

// This is to test FindTimetable using serious test case
const input = concat(
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.H), // Hydrology
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.SA2), // Structural Analysis II
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.HT), // Highway Transportation
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.FM2), // Fluid Mechanic II
    HENG_2017_APR.filter((x) => x.SubjectCode === CodeOf.ITBS), // Introduction To Building Services
);

const tinySlots = ParseSlotToTinySlot(ParseRawSlotToSlot(input));

describe("FindTimetable", () => {
    describe("using TinySlot", () => {
        it("case 1", () => {
            const result = FindTimetable(ParseSlotToTinySlot(ParseRawSlotToSlot(input)));
            expect(result).to.have.lengthOf(285696);
        });

    });

});

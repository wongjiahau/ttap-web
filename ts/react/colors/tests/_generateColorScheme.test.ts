import {
    expect
} from "chai";
import {
    CreateSlotViewModels
} from "../../../model/slotViewModel";
import {
    CodeOf,
    HENG_2017_APR
} from "../../../tests/testData/heng_2017_apr";
import { ChosenColors } from "../colors";
import {
    GenerateColorScheme
} from "../generateColorScheme";
import {
    GetTestRawSlot1
} from "./../../../tests/testDataGenerator";

describe("GenerateColorScheme()", () => {
    it("should return X ColorSchemes if they are X distinct subjects", () => {
        const rawSlots = GetTestRawSlot1();
        const input = rawSlots.filter((x) => x.SubjectCode === "MPU3113" || x.SubjectCode === "MPU3123");
        const colorSchemes = GenerateColorScheme(CreateSlotViewModels(input));
        expect(colorSchemes.length).to.eq(2);
    });

    it("should generate the same set of color schemes regardless of the order of the slots", () => {
        const rawSlots = GetTestRawSlot1();
        const input1 = rawSlots.filter((x) => x.SubjectCode === "MPU3113" || x.SubjectCode === "MPU3123");
        const input2 = input1.slice().reverse();
        const colorSchemes1 = GenerateColorScheme(CreateSlotViewModels(input1));
        const colorSchemes2 = GenerateColorScheme(CreateSlotViewModels(input2));
        expect(colorSchemes1).to.deep.eq(colorSchemes2);
    });

    it("should not throw errors when there is only 1 subjects passed in", () => {
        const rawSlots = HENG_2017_APR();
        const input = rawSlots.filter((x) => x.SubjectCode === CodeOf.ACD);
        const colorSchemes = GenerateColorScheme(CreateSlotViewModels(input));
        expect(colorSchemes.length).to.eq(1);
    });

    it("should not throw errors even when the number of selected subject exceeds the number of chosen colors", () => {
        const rawSlots = HENG_2017_APR();
        const subjectCodes = [
            CodeOf.ACD, CodeOf.ACP, CodeOf.ASSD, CodeOf.BEAM, CodeOf.BKA,
            CodeOf.BMK2, CodeOf.CSD2, CodeOf.CT, CodeOf.EAIE, CodeOf.EDC,
            CodeOf.EFE
        ].map((x) => x.toString());
        expect(subjectCodes.length).to.be.greaterThan(ChosenColors.length);
        const input = rawSlots.filter((x) => subjectCodes.indexOf(x.SubjectCode) !== -1);
        const colorSchemes = GenerateColorScheme(CreateSlotViewModels(input));
        colorSchemes.forEach((x) => {
            expect(x.Color).to.not.eq(undefined);
        });

    });

});

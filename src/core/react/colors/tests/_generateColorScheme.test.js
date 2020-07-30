"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const slotViewModel_1 = require("../../../model/slotViewModel");
const heng_2017_apr_1 = require("../../../tests/testData/heng_2017_apr");
const colors_1 = require("../colors");
const generateColorScheme_1 = require("../generateColorScheme");
const testDataGenerator_1 = require("./../../../tests/testDataGenerator");
describe("GenerateColorScheme()", () => {
    it("should return X ColorSchemes if they are X distinct subjects", () => {
        const rawSlots = testDataGenerator_1.GetTestRawSlot1();
        const input = rawSlots.filter((x) => x.SubjectCode === "MPU3113" || x.SubjectCode === "MPU3123");
        const colorSchemes = generateColorScheme_1.GenerateColorScheme(slotViewModel_1.CreateSlotViewModels(input));
        chai_1.expect(colorSchemes.length).to.eq(2);
    });
    it("should generate the same set of color schemes regardless of the order of the slots", () => {
        const rawSlots = testDataGenerator_1.GetTestRawSlot1();
        const input1 = rawSlots.filter((x) => x.SubjectCode === "MPU3113" || x.SubjectCode === "MPU3123");
        const input2 = input1.slice().reverse();
        const colorSchemes1 = generateColorScheme_1.GenerateColorScheme(slotViewModel_1.CreateSlotViewModels(input1));
        const colorSchemes2 = generateColorScheme_1.GenerateColorScheme(slotViewModel_1.CreateSlotViewModels(input2));
        chai_1.expect(colorSchemes1).to.deep.eq(colorSchemes2);
    });
    it("should not throw errors when there is only 1 subjects passed in", () => {
        const rawSlots = heng_2017_apr_1.HENG_2017_APR();
        const input = rawSlots.filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.ACD);
        const colorSchemes = generateColorScheme_1.GenerateColorScheme(slotViewModel_1.CreateSlotViewModels(input));
        chai_1.expect(colorSchemes.length).to.eq(1);
    });
    it("should not throw errors even when the number of selected subject exceeds the number of chosen colors", () => {
        const rawSlots = heng_2017_apr_1.HENG_2017_APR();
        const subjectCodes = [
            heng_2017_apr_1.CodeOf.ACD, heng_2017_apr_1.CodeOf.ACP, heng_2017_apr_1.CodeOf.ASSD, heng_2017_apr_1.CodeOf.BEAM, heng_2017_apr_1.CodeOf.BKA,
            heng_2017_apr_1.CodeOf.BMK2, heng_2017_apr_1.CodeOf.CSD2, heng_2017_apr_1.CodeOf.CT, heng_2017_apr_1.CodeOf.EAIE, heng_2017_apr_1.CodeOf.EDC,
            heng_2017_apr_1.CodeOf.EFE
        ].map((x) => x.toString());
        chai_1.expect(subjectCodes.length).to.be.greaterThan(colors_1.ChosenColors.length);
        const input = rawSlots.filter((x) => subjectCodes.indexOf(x.SubjectCode) !== -1);
        const colorSchemes = generateColorScheme_1.GenerateColorScheme(slotViewModel_1.CreateSlotViewModels(input));
        colorSchemes.forEach((x) => {
            chai_1.expect(x.Color).to.not.eq(undefined);
        });
    });
});
//# sourceMappingURL=_generateColorScheme.test.js.map
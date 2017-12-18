import {
    expect
} from "chai";
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
        const colorSchemes = GenerateColorScheme(input);
        expect(colorSchemes.length).to.eq(2);
    });

    it("should generate the same set of color schemes regardless of the order of the slots", () => {
        const rawSlots = GetTestRawSlot1();
        const input1 = rawSlots.filter((x) => x.SubjectCode === "MPU3113" || x.SubjectCode === "MPU3123");
        const input2 = input1.slice().reverse();
        const colorSchemes1 = GenerateColorScheme(input1);
        const colorSchemes2 = GenerateColorScheme(input2);
        expect(colorSchemes1).to.deep.eq(colorSchemes2);
    });

});

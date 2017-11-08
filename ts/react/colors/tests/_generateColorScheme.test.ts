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

});

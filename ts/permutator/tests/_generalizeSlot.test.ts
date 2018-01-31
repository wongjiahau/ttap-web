import {expect} from "chai";
import {RawSlot} from "../../model/rawSlot";
import {CanBeGeneralize, GeneralizeSlot} from "../generalizeSlot";

describe("GeneralizeSlot", () => {
    it("case 1", () => {
        const input = [
            {
                Uid: 161,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "155",
                Type: "P",
                Group: "2",
                Day: "Tue",
                TimePeriod: "9:00 AM - 12:00 PM",
                WeekNumber: "3,9",
                Room: "KB731"
            }, {
                Uid: 162,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "156",
                Type: "P",
                Group: "3",
                Day: "Tue",
                TimePeriod: "9:00 AM - 12:00 PM",
                WeekNumber: "4,10",
                Room: "KB731"
            }
        ];
        const result = GeneralizeSlot(input);
        expect(result)
            .to
            .deep
            .eq([
                {
                    Uid: 161,
                    SubjectCode: "UEME2123",
                    SubjectName: "Fluid Mechanics I",
                    Number: "155/156",
                    Type: "P",
                    Group: "2/3",
                    Day: "Tue",
                    TimePeriod: "9:00 AM - 12:00 PM",
                    WeekNumber: "3,9/4,10",
                    Room: "KB731/KB731"
                }
            ]);
    });

    it("should not generalize slots if they are not CanBeGeneralize()", () => {
        const input = [
            {
                Uid: 161,
                SubjectCode: "UEME2122", // Different subject code
                SubjectName: "Fluid Mechanics I",
                Number: "155",
                Type: "P",
                Group: "2",
                Day: "Tue",
                TimePeriod: "9:00 AM - 12:00 PM",
                WeekNumber: "3,9",
                Room: "KB731"
            }, {
                Uid: 162,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "156",
                Type: "P",
                Group: "3",
                Day: "Tue",
                TimePeriod: "9:00 AM - 12:00 PM",
                WeekNumber: "4,10",
                Room: "KB731"
            }
        ];
        const initialLength = input.length;
        const result = GeneralizeSlot(input);
        expect(result).to.have.lengthOf(initialLength);
    });

    it("should not generalize slots that have relatives (case 1)", () => {
        // In this case, L2 have relatives, so Slot-158 should not be generalized with Slot-157 even they CanBeGeneralize()
        const input = [
            {
                Uid: 156,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "152",
                Type: "L",
                Group: "2",
                Day: "Mon",
                TimePeriod: "  1:00 PM -  3:00 PM",
                WeekNumber: "1-14",
                Room: "KB207"
            }, {
                Uid: 157,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "152",
                Type: "L",
                Group: "2",
                Day: "Fri",
                TimePeriod: "  5:30 PM -  6:30 PM",
                WeekNumber: "1-14",
                Room: "KB209"
            }, {
                Uid: 158,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "153",
                Type: "L",
                Group: "3",
                Day: "Fri",
                TimePeriod: "  5:30 PM -  6:30 PM",
                WeekNumber: "1-14",
                Room: "KB209"
            }
        ];
        const initialLength = input.length;
        const result = GeneralizeSlot(input);
        expect(result).to.have.lengthOf(initialLength);
    });

    it("should not generalize slots that have relatives (case 2)", () => {
        // In this case, L2 have relatives, so Slot-158 should not be generalized with Slot-157 even they CanBeGeneralize()
        const input = [
            {
                Uid: 156,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "152",
                Type: "L",
                Group: "2",
                Day: "Mon",
                TimePeriod: "  1:00 PM -  3:00 PM",
                WeekNumber: "1-14",
                Room: "KB207"
            }, {
                Uid: 157,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "152",
                Type: "L",
                Group: "2",
                Day: "Fri",
                TimePeriod: "  5:30 PM -  6:30 PM",
                WeekNumber: "1-14",
                Room: "KB209"
            }, {
                Uid: 158,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "153",
                Type: "L",
                Group: "3",
                Day: "Fri",
                TimePeriod: "  5:30 PM -  6:30 PM",
                WeekNumber: "1-14",
                Room: "KB209"
            }, {
                Uid: 159,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "154",
                Type: "L",
                Group: "4",
                Day: "Fri",
                TimePeriod: "  5:30 PM -  6:30 PM",
                WeekNumber: "1-14",
                Room: "KB209"
            }
        ];
        const result = GeneralizeSlot(input);
        expect(result).to.have.lengthOf(3);
    });

    it("should not mutate the input", () => {
        const input = [
            {
                Uid: 161,
                SubjectCode: "UEME2123", // Different subject code
                SubjectName: "Fluid Mechanics I",
                Number: "155",
                Type: "P",
                Group: "2",
                Day: "Tue",
                TimePeriod: "9:00 AM - 12:00 PM",
                WeekNumber: "3,9",
                Room: "KB731"
            }, {
                Uid: 162,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "156",
                Type: "P",
                Group: "3",
                Day: "Tue",
                TimePeriod: "9:00 AM - 12:00 PM",
                WeekNumber: "4,10",
                Room: "KB731"
            }
        ];
        expect(input[0].Group).to.eq("2");
        const generalized = GeneralizeSlot(input);
        expect(input[0].Group).to.not.eq("2/3");
        expect(input[0].Group).to.eq("2");
    });
});

describe("CanBeGeneralize", () => {
    it("positive case 1", () => {
        const x = new RawSlot();
        x.SubjectCode = "MPU3113";
        x.Type = "L";
        x.Day = "Mon";
        x.TimePeriod = "9:00 AM - 12:00 PM";
        const y = new RawSlot();
        y.SubjectCode = "MPU3113";
        y.Type = "L";
        y.Day = "Mon";
        y.TimePeriod = "9:00 AM - 12:00 PM";
        expect(CanBeGeneralize(x, y))
            .to
            .eq(true);
    });

    it("should return False if SubjectCode differs", () => {
        const x = new RawSlot();
        x.SubjectCode = "MPU3114";
        x.Type = "L";
        x.Day = "Mon";
        x.TimePeriod = "9:00 AM - 12:00 PM";
        const y = new RawSlot();
        y.SubjectCode = "MPU3113";
        y.Type = "L";
        y.Day = "Mon";
        y.TimePeriod = "9:00 AM - 12:00 PM";
        expect(CanBeGeneralize(x, y))
            .to
            .eq(false);
    });

    it("should return False if Type differs", () => {
        const x = new RawSlot();
        x.SubjectCode = "MPU3113";
        x.Type = "T";
        x.Day = "Mon";
        x.TimePeriod = "9:00 AM - 12:00 PM";
        const y = new RawSlot();
        y.SubjectCode = "MPU3113";
        y.Type = "L";
        y.Day = "Mon";
        y.TimePeriod = "9:00 AM - 12:00 PM";
        expect(CanBeGeneralize(x, y))
            .to
            .eq(false);
    });

    it("should return False if Day differs", () => {
        const x = new RawSlot();
        x.SubjectCode = "MPU3113";
        x.Type = "L";
        x.Day = "Tue";
        x.TimePeriod = "9:00 AM - 12:00 PM";
        const y = new RawSlot();
        y.SubjectCode = "MPU3113";
        y.Type = "L";
        y.Day = "Mon";
        y.TimePeriod = "9:00 AM - 12:00 PM";
        expect(CanBeGeneralize(x, y))
            .to
            .eq(false);
    });

    it("should return False if TimePeriod differs", () => {
        const x = new RawSlot();
        x.SubjectCode = "MPU3113";
        x.Type = "L";
        x.Day = "Mon";
        x.TimePeriod = "9:00 AM - 12:00 PM";
        const y = new RawSlot();
        y.SubjectCode = "MPU3113";
        y.Type = "L";
        y.Day = "Mon";
        y.TimePeriod = "10:00 AM - 12:00 PM";
        expect(CanBeGeneralize(x, y))
            .to
            .eq(false);
    });

});

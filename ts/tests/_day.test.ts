import {
    expect
} from "chai";
import {
    ParseDay
} from "../att/day";

describe("day parser", () => {
    it("test 1", () => {
        const input = "Mon";
        expect(ParseDay(input)).to.eq(1);
    });

    it("test 2", () => {
        const input = "Tue";
        expect(ParseDay(input)).to.eq(2);
    });

    it("test 3", () => {
        const input = "Wed";
        expect(ParseDay(input)).to.eq(3);
    });

    it("test 4", () => {
        const input = "Thu";
        expect(ParseDay(input)).to.eq(4);
    });

    it("test 5", () => {
        const input = "Fri";
        expect(ParseDay(input)).to.eq(5);
    });

    it("test 6", () => {
        const input = "Sat";
        expect(ParseDay(input)).to.eq(6);
    });

    it("test 7", () => {
        const input = "Sun";
        expect(ParseDay(input)).to.eq(7);
    });

});

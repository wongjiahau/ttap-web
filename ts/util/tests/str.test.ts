import { expect } from "chai";
import {Str} from "../str";

describe("Str", () => {
    describe("constructor", () => {
        it("should receive a string as parameter", () => {
            expect(() => {
                const str = new Str("a string");
            }).to.not.throw();
        });
    });

    describe("Contains", () => {
        it("case 1", () => {
            const s1 = "hello there";
            const s2 = "there";
            expect(new Str(s1).Contains(s2)).to.eq(true);
            expect(new Str(s2).Contains(s1)).to.eq(false);
        });

        it("should be case sensitive", () => {
            const s1 = "hello there";
            const s2 = "There";
            expect(new Str(s1).Contains(s2)).to.eq(false);
        });
    });

    describe("Capitalize", () => {
        it("should capitalize every word in a string", () => {
            const s = "hello there";
            expect(new Str(s).Capitalize().Value()).to.eq("Hello There");
        });

        it("case 2", () => {
            const s = "single";
            expect(new Str(s).Capitalize().Value()).to.eq("Single");
        });
    });
});

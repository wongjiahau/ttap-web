"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const str_1 = require("../str");
describe("Str", () => {
    describe("constructor", () => {
        it("should receive a string as parameter", () => {
            chai_1.expect(() => {
                const str = new str_1.Str("a string");
            }).to.not.throw();
        });
    });
    describe("Contains", () => {
        it("case 1", () => {
            const s1 = "hello there";
            const s2 = "there";
            chai_1.expect(new str_1.Str(s1).Contains(s2)).to.eq(true);
            chai_1.expect(new str_1.Str(s2).Contains(s1)).to.eq(false);
        });
        it("should be case sensitive", () => {
            const s1 = "hello there";
            const s2 = "There";
            chai_1.expect(new str_1.Str(s1).Contains(s2)).to.eq(false);
        });
    });
    describe("Capitalize", () => {
        it("should capitalize every word in a string", () => {
            const s = "hello there";
            chai_1.expect(new str_1.Str(s).Capitalize().Value()).to.eq("Hello There");
        });
        it("case 2", () => {
            const s = "single";
            chai_1.expect(new str_1.Str(s).Capitalize().Value()).to.eq("Single");
        });
    });
    describe("IsAlphaNumeric", () => {
        it("case 1", () => {
            chai_1.expect(new str_1.Str("lka82").IsAlphaNumeric()).to.eq(true);
        });
        it("case 2", () => {
            chai_1.expect(new str_1.Str("lk-a82").IsAlphaNumeric()).to.eq(false);
        });
    });
    describe("ReplaceAll", () => {
        it("case 1", () => {
            chai_1.expect(new str_1.Str("a b c d").ReplaceAll(" ", "-").Value()).to.eq("a-b-c-d");
        });
        it("case 2", () => {
            chai_1.expect(new str_1.Str("a--b-c--d").ReplaceAll("--", "X").Value()).to.eq("aXb-cXd");
        });
    });
    describe("Count", () => {
        it("case 1", () => {
            chai_1.expect(new str_1.Str("hello lol lala").Count("l")).to.eq(6);
        });
        it("case 2", () => {
            chai_1.expect(new str_1.Str("hello lol lala bello").Count("ll")).to.eq(2);
        });
    });
});
//# sourceMappingURL=str.test.js.map
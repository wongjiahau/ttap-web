import { expect } from "chai";
import { Str } from "../str";

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

  describe("IsAlphaNumeric", () => {
    it("case 1", () => {
      expect(new Str("lka82").IsAlphaNumeric()).to.eq(true);
    });

    it("case 2", () => {
      expect(new Str("lk-a82").IsAlphaNumeric()).to.eq(false);
    });
  });

  describe("ReplaceAll", () => {
    it("case 1", () => {
      expect(new Str("a b c d").ReplaceAll(" ", "-").Value()).to.eq("a-b-c-d");
    });

    it("case 2", () => {
      expect(new Str("a--b-c--d").ReplaceAll("--", "X").Value()).to.eq(
        "aXb-cXd"
      );
    });
  });

  describe("Count", () => {
    it("case 1", () => {
      expect(new Str("hello lol lala").Count("l")).to.eq(6);
    });

    it("case 2", () => {
      expect(new Str("hello lol lala bello").Count("ll")).to.eq(2);
    });
  });
});

import { expect } from "chai";
import { BoundedInt } from "./../boundedInt";

describe("boundedInt", () => {
  describe("constructor", () => {
    it("should not throw error", () => {
      expect(() => {
        const x = new BoundedInt(10, 0);
      }).to.not.throw();
    });

    it("should allow client to set upperLimit and value", () => {
      const x = new BoundedInt(10, 0);
      expect(x.UpperLimit).to.eq(10);
      expect(x.Value).to.eq(0);
    });
  });

  describe("Equal", () => {
    it("should return true if the target have same upperLimit and value as itself", () => {
      const x = new BoundedInt(9, 8);
      const y = new BoundedInt(9, 8);
      expect(x.Equals(y)).to.eq(true);
    });

    it("should return false if upperLimit is not same", () => {
      const x = new BoundedInt(9, 9);
      const y = new BoundedInt(8, 9);
      expect(x.Equals(y)).to.eq(false);
    });

    it("should return false if value is not same", () => {
      const x = new BoundedInt(9, 9);
      const y = new BoundedInt(9, 8);
      expect(x.Equals(y)).to.eq(false);
    });
  });

  describe("Duplicate", () => {
    it("should return a new duplicate which is equal to itself", () => {
      const x = new BoundedInt(10, 7);
      const y = x.Duplicate();
      expect(x.Equals(y)).to.eq(true);
    });

    it("should return a new object", () => {
      const x = new BoundedInt(8, 7);
      const y = x.Duplicate();
      y.UpperLimit = 10;
      y.Value = 6;
      expect(x.UpperLimit).to.eq(8);
      expect(x.Value).to.eq(7);
    });
  });

  describe("ToString", () => {
    it("should allow client to know its Upperlimit and Value", () => {
      const x = new BoundedInt(1, 3);
      expect(x.ToString()).to.eq("UpperLimit : 1, Value : 3");
    });
  });
});

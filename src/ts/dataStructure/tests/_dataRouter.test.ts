import { expect } from "chai";
import { DataRouter } from "../dataRouter";

describe("DataRouter", () => {
  describe("GetCurrentData", () => {
    it("should throw error if route is not set yet", () => {
      const x = new DataRouter();
      x.AddData("apple", 3);
      expect(() => x.GetCurrentData()).to.throw();
    });
  });

  describe("AddData", () => {
    it("should add data to its dictionary", () => {
      const x = new DataRouter();
      x.AddData("apple", 3);
      x.SetRouteTo("apple");
      expect(x.GetCurrentData()).to.eq(3);
    });

    it("should throw error if the label passed in already existed", () => {
      const x = new DataRouter();
      x.AddData("apple", 3);
      expect(() => x.AddData("apple", 99)).to.throw();
    });
  });

  describe("SetRouteTo", () => {
    it("case 1", () => {
      const x = new DataRouter();
      x.AddData("apple", 99);
      x.AddData("banana", 33);
      x.SetRouteTo("apple");
      expect(x.GetCurrentData()).to.eq(99);
      x.SetRouteTo("banana");
      expect(x.GetCurrentData()).to.eq(33);
    });

    it("should throw error if the route-to-be-set does not exist", () => {
      const x = new DataRouter();
      x.AddData("apple", 99);
      expect(() => x.SetRouteTo("coconut")).to.throw();
    });
  });

  describe("GetDataFrom", () => {
    it("should return undefined if the label points to nothing", () => {
      const x = new DataRouter();
      x.AddData("apple", 99);
      expect(x.GetDataFrom("banana")).to.eq(undefined);
    });
  });

  describe("GetCurrentRoute", () => {
    it("should return the current route", () => {
      const x = new DataRouter();
      x.AddData("apple", 99);
      x.SetRouteTo("apple");
      expect(x.GetCurrentRoute()).to.eq("apple");
    });
  });
});

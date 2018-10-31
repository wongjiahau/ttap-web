import {expect} from "chai";
import {ParseType} from "../type";
describe("ParseType", () => {
    it("should throw error if passed in stirng other than L/T/P", () => {
        expect(() => {
            ParseType("Q");
        }).to.throw();
    });
});

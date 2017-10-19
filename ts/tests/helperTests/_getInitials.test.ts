import {expect} from "chai";
import {GetInitial} from "../../helper";

describe("GetInitial()", () => {
    it("should return the initial of every word", () => {
        const result = GetInitial("Community Project");
        expect(result).to.equal("CP");
    });

    it("should ignore AMPERSAND(&) symbol", () => {
        const result = GetInitial("Community & Project");
        expect(result).to.equal("CP");
    });

    it("should ignore COMMA(,) symbol", () => {
        const result = GetInitial("Ali, Baby Chow");
        expect(result).to.equal("ABC");
    });

    it("should ignore words inside brackets", () => {
        const result = GetInitial("Pew Die Pie (Pew pew!)");
        expect(result).to.equal("PDP");
    });

});

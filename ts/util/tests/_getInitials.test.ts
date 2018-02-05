import {expect} from "chai";
import { GetInitial } from "../getInitial";

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

    it("should ignore conjunctive words like 'AND'", () => {
        const result = GetInitial("Ali and Boy");
        expect(result).to.equal("AB");
    });

    it("should convert roman numeral to arabic numeral - 1", () => {
        const result = GetInitial("Structural Analysis I");
        expect(result).to.equal("SA1");
    });

    it("should convert roman numeral to arabic numeral - 2", () => {
        const result = GetInitial("Structural Analysis II");
        expect(result).to.equal("SA2");
    });

    it("should convert roman numeral to arabic numeral - 3", () => {
        const result = GetInitial("Tamadun Islam");
        expect(result).to.equal("TI");
    });

});

import {expect} from "chai";
import {Beautify} from "../../helper";

describe("Beautify()", () => {
    it("should convert AND to &", () => {
        const result = Beautify("ARTS AND CULTURAL PERFORMANCE");
        expect(result).to.equal("Arts & Cultural Performance");
    });

    it("should capitalize every word ", () => {
        const result = Beautify("MALAYSIAN STUDIES 3 (FOR INTERNATIONAL STUDENTS)");
        expect(result).to.equal("Malaysian Studies 3 (for International Students)");
    });

    it("should convert DAN to & ", () => {
        const result = Beautify("Ali dan Abu");
        expect(result).to.equal("Ali & Abu");
    });
});

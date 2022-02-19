import { expect } from "chai";
import { BeautifySubjectName } from "../beautifySubjectName";

describe("BeautifySubjectName()", () => {
  it("should convert AND to &", () => {
    const result = BeautifySubjectName("ARTS AND CULTURAL PERFORMANCE");
    expect(result).to.equal("Arts & Cultural Performance");
  });

  it("should capitalize every word ", () => {
    const result = BeautifySubjectName(
      "MALAYSIAN STUDIES 3 (FOR INTERNATIONAL STUDENTS)"
    );
    expect(result).to.equal("Malaysian Studies 3 (for International Students)");
  });

  it("should convert DAN to & ", () => {
    const result = BeautifySubjectName("Ali dan Abu");
    expect(result).to.equal("Ali & Abu");
  });

  it("should preserve Roman numerals (case 1)", () => {
    const result = BeautifySubjectName("SEJARAH II");
    expect(result).to.eq("Sejarah II");
  });

  it("should preserve Roman numerals (case 2)", () => {
    const result = BeautifySubjectName("SEJARAH III");
    expect(result).to.eq("Sejarah III");
  });

  it('shoud parse word that contains "AND" properly', () => {
    const result = BeautifySubjectName("UNDERSTANDING POLITICS");
    expect(result).to.eq("Understanding Politics");
  });
});

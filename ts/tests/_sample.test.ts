import {expect} from "chai";
import * as sample from "../sample/sample";

describe("sample functions", () => {
    it("should return hello world", () => {
        const result = sample.hello();
        expect(result)
            .to
            .equal("Hello World");
    });

    it("add 1 and 1 should return 2", () => {
        // arrange
        const result = sample.add(1, 1)        ;
        expect(result).to.equal(2);
    });
});

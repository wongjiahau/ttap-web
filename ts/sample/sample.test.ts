import {expect} from "chai";
import * as sample from "./sample";

describe("sample functions", () => {
    it("should return hello world", () => {
        const result = sample.hello();
        expect(result)
            .to
            .equal("Hello World");
    });

});

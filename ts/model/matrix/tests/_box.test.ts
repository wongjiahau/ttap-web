import { expect } from "chai";
import { STCBox } from "../stcBox";

describe("box", () => {
    describe("constructor", () => {
        it("should set Uid based on X and Day arguments", () => {
            const x = 1;
            const day = 0;
            const box = new STCBox(0, day, 0, x);
            expect(box.Uid).to.eq("01");

        });
    });

});

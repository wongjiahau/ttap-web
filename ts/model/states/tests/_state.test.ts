import { expect } from "chai";
import { State } from "./../state";

describe("State", () => {
    describe("constructor", () => {
        it("should set Uid based on X and Day arguments", () => {
            const x = 1;
            const day = 0;
            const state = new State(null, day, null, x);
            expect(state.Uid).to.eq("01");

        });
    });

});

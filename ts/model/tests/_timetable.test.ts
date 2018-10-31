import { expect } from "chai";
import { CompressState } from "../timetable";

describe("CompressState", () => {
    it("case 1", () => {
        const state = [
            0,   0, 255, 0, 0, 0, 0,
            0, 255,   0, 0, 0, 0, 0,
        ];
        const result = CompressState(state);
        expect(result).to.deep.eq([
            0, 255, 255, 0, 0, 0, 0
        ]);
    });

    it("case 2", () => {
        const state = [
            0,   0, 255, 0, 0, 0, 0,
            0, 255, 255, 0, 0, 0, 0,
        ];
        const result = CompressState(state);
        expect(result).to.deep.eq([
            0, 255, 255, 0, 0, 0, 0
        ]);
    });
});

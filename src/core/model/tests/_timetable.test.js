"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const timetable_1 = require("../timetable");
describe("CompressDayTimeMatrix", () => {
    it("case 1", () => {
        const matrix = [
            0, 0, 255, 0, 0, 0, 0,
            0, 255, 0, 0, 0, 0, 0,
        ];
        const result = timetable_1.CompressDayTimeMatrix(matrix);
        chai_1.expect(result).to.deep.eq([
            0, 255, 255, 0, 0, 0, 0
        ]);
    });
    it("case 2", () => {
        const matrix = [
            0, 0, 255, 0, 0, 0, 0,
            0, 255, 255, 0, 0, 0, 0,
        ];
        const result = timetable_1.CompressDayTimeMatrix(matrix);
        chai_1.expect(result).to.deep.eq([
            0, 255, 255, 0, 0, 0, 0
        ]);
    });
});
//# sourceMappingURL=_timetable.test.js.map
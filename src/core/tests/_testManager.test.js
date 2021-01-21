"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const str_1 = require("../util/str");
const testManager_1 = require("./testManager");
const testManager_2 = require("./testManager");
describe("TestManager functions", () => {
    it("GetFileNameOf should return string based on FileName enum", () => {
        const result = new testManager_1.default().GetDataFrom(testManager_2.FileName.jiahau_2017_sept);
        chai_1.expect(new str_1.Str(result).Contains("unitreg"))
            .to
            .equal(true);
    });
});
//# sourceMappingURL=_testManager.test.js.map
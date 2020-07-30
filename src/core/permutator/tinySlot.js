"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../att/type");
const getInitial_1 = require("../util/getInitial");
class TinySlot {
    constructor(s) {
        this.PartitionKey = s.SubjectCode * 10 + type_1.ParseType(s.Type);
        this.SlotNumber = s.SlotNumber;
        this.Uid = s.SlotNumber;
        this.SlotIds = [];
        this.SlotIds.push(s.Uid);
        this.DayTimeMatrix = this.GetDayTimeMatrixForTinySlot(s);
        this.PartitionGroup = `${getInitial_1.GetInitial(s.SubjectName)}(${s.Type})`;
    }
    GetDayTimeMatrixForTinySlot(s) {
        const result = [0, 0, 0, 0, 0, 0, 0];
        result[s.Day - 1] = s.TimePeriod;
        return result;
    }
}
exports.TinySlot = TinySlot;
//# sourceMappingURL=tinySlot.js.map
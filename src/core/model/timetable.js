"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The dimension of uncompressedDayTimeMatrix is 7 multiple the number of study week 
function newTimetable(Uids, uncompressedDayTimeMatrix) {
    return {
        SlotUids: Uids,
        DayTimeMatrix: CompressDayTimeMatrix(uncompressedDayTimeMatrix),
    };
}
exports.newTimetable = newTimetable;
function CompressDayTimeMatrix(dayTimeMatrix) {
    const result = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < dayTimeMatrix.length; i++) {
        result[i % 7] |= dayTimeMatrix[i]; // 7 means the numberOfDayPerWeek
    }
    return result;
}
exports.CompressDayTimeMatrix = CompressDayTimeMatrix;
//# sourceMappingURL=timetable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GroupSimilarTimetables(timetables) {
    const partition = {};
    for (let i = 0; i < timetables.length; i++) {
        const t = timetables[i];
        const matrix = t.DayTimeMatrix.toString();
        if (partition[matrix] !== undefined) {
            partition[matrix].ListOfSlotUids.push(t.SlotUids);
        }
        else {
            partition[matrix] = {
                DayTimeMatrix: t.DayTimeMatrix,
                ListOfSlotUids: [t.SlotUids]
            };
        }
    }
    return Object.keys(partition).map((key) => partition[key]);
}
exports.GroupSimilarTimetables = GroupSimilarTimetables;
//# sourceMappingURL=groupSimilarTimetables.js.map
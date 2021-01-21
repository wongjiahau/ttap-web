"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concat = require("lodash.concat");
const sortBy = require("lodash.sortby");
const timetable_1 = require("../model/timetable");
const parseRawSlotToSlot_1 = require("../parser/parseRawSlotToSlot");
const parseSlotToBigSlot_1 = require("../parser/parseSlotToBigSlot");
const parseSlotToTinySlot_1 = require("../parser/parseSlotToTinySlot");
const findTimetableVisualizer_1 = require("./findTimetableVisualizer");
const generateIndices_1 = require("./generateIndices");
const matrix_1 = require("./matrix");
const partitionize_1 = require("./partitionize");
const LIMIT = 1000000;
function FindTimetable(input, disableClashChecking = false, visualizer) {
    if (!visualizer) {
        visualizer = new findTimetableVisualizer_1.NullFindTimetableVisualizer();
    }
    if (input.length === 0) {
        throw new Error("Input slots should not be an empty array");
    }
    if (input.length === 1) {
        let resultMatrix = [0, 0, 0, 0, 0, 0, 0];
        resultMatrix = matrix_1.AppendMatrix(resultMatrix, input[0].DayTimeMatrix);
        return [timetable_1.newTimetable(input[0].SlotIds, resultMatrix)];
    }
    const result = new Array();
    const partitioned = sortBy(partitionize_1.Partitionize(input), ["length"]);
    visualizer.plotPartition(partitioned, partitioned.map((x) => x[0].PartitionGroup));
    const indices = generateIndices_1.GenerateIndices(partitioned);
    const length = indices.length;
    const last = length - 1;
    let current;
    const snapshots = new Array();
    snapshots.push({
        SlotIds: [],
        DayTimeMatrix: [0, 0, 0, 0, 0, 0, 0] // 7 because there are 7 days in a week
    });
    let prevSnapshot;
    let ptr = 0;
    while (true) {
        prevSnapshot = snapshots[ptr];
        current = partitioned[ptr][indices[ptr].Value];
        if (ptr > 0) { // this block is for plotting edge
            const prevPtr = ptr - 1;
            const previousSlot = partitioned[prevPtr][indices[prevPtr].Value];
            visualizer.connect(previousSlot, current); // this is for animation purpose
        }
        if (disableClashChecking || !matrix_1.GotIntersection(current.DayTimeMatrix, prevSnapshot.DayTimeMatrix)) {
            snapshots.push({
                SlotIds: concat(current.SlotIds, prevSnapshot.SlotIds),
                DayTimeMatrix: matrix_1.AppendMatrix(current.DayTimeMatrix, prevSnapshot.DayTimeMatrix)
            });
            if (ptr === last) {
                result.push(timetable_1.newTimetable(snapshots[ptr + 1].SlotIds, snapshots[ptr + 1].DayTimeMatrix));
                visualizer.increaseSearchedPathCount();
                if (result.length >= LIMIT) { // if too much timetable just return the result
                    return result;
                }
                snapshots.pop();
                while (true) {
                    indices[ptr].Value++;
                    if (indices[ptr].Value <= indices[ptr].UpperLimit) {
                        break;
                    }
                    else {
                        indices[ptr].Value = 0;
                        snapshots.pop();
                        if (ptr === 0) {
                            return result;
                        }
                        ptr--;
                    }
                }
            }
            else {
                ptr++;
            }
        }
        else {
            visualizer.increaseSearchedPathCount();
            while (true) {
                indices[ptr].Value++;
                if (indices[ptr].Value <= indices[ptr].UpperLimit) {
                    break;
                }
                else {
                    indices[ptr].Value = 0;
                    snapshots.pop();
                    if (ptr === 0) {
                        return result;
                    }
                    ptr--;
                }
            }
        }
    }
}
exports.FindTimetable = FindTimetable;
function FindTimetableWithoutConsideringWeekNumber(rawSlots, disableClashChecking = false, visualizer) {
    return FindTimetable(parseSlotToTinySlot_1.ParseSlotToTinySlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(rawSlots)), disableClashChecking, visualizer);
}
exports.FindTimetableWithoutConsideringWeekNumber = FindTimetableWithoutConsideringWeekNumber;
function FindTimetableByConsideringWeekNumber(rawSlots, disableClashChecking = false, visualizer) {
    return FindTimetable(parseSlotToBigSlot_1.ParseSlotToBigSlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(rawSlots)), disableClashChecking, visualizer);
}
exports.FindTimetableByConsideringWeekNumber = FindTimetableByConsideringWeekNumber;
//# sourceMappingURL=findTimetable.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectStore_1 = require("../dataStructure/objectStore");
const parseRawSlotToSlot_1 = require("../parser/parseRawSlotToSlot");
const parseRawSlotToSubject_1 = require("../parser/parseRawSlotToSubject");
const parseSlotToBigSlot_1 = require("../parser/parseSlotToBigSlot");
const parseSlotToTinySlot_1 = require("../parser/parseSlotToTinySlot");
const findTimetable_1 = require("../permutator/findTimetable");
const groupSimilarTimetables_1 = require("../permutator/groupSimilarTimetables");
const notifyDataLoaded_1 = require("../redux/actions/notifyDataLoaded");
const masterState_1 = require("../redux/reducers/masterState");
const heng_2017_sept_1 = require("../tests/testData/heng_2017_sept");
const heng_2017_apr_1 = require("./testData/heng_2017_apr");
exports.GetTestSubjects1 = () => {
    const subjects = parseRawSlotToSubject_1.ParseRawSlotToSubject(heng_2017_sept_1.heng_2017_sept());
    return subjects;
};
exports.GetTestRawSlot1 = () => {
    return heng_2017_sept_1.heng_2017_sept();
};
exports.GetTestSlot1 = () => {
    return parseRawSlotToSlot_1.ParseRawSlotToSlot(exports.GetTestRawSlot1());
};
exports.GetTestTinySlot1 = () => {
    return parseSlotToTinySlot_1.ParseSlotToTinySlot(exports.GetTestSlot1());
};
exports.MockRawSlotStore = new objectStore_1.ObjectStore(exports.GetTestRawSlot1());
exports.GetRawSlotsOf = (subjectCode) => {
    const subject = exports.GetTestSubjects1().filter((x) => x.Code === subjectCode);
    if (subject.length === 0) {
        throw new Error("No subject have the code of " + subjectCode);
    }
    return exports.MockRawSlotStore.GetBunch(subject[0].SlotUids);
};
exports.GetTinySlotsOf = (subjectCode) => {
    const subjects = exports.GetTestSubjects1();
    const uids = subjects.filter((x) => x.Code === subjectCode)[0].SlotUids;
    const slots = exports.GetTestSlot1();
    const matchingSlots = [];
    uids.forEach((uid) => matchingSlots.push(slots.filter((s) => s.Uid === uid)[0]));
    return parseSlotToTinySlot_1.ParseSlotToTinySlot(matchingSlots);
};
exports.GetBigSlotsOf = (subjectCode) => {
    const subject = exports.GetTestSubjects1().filter((x) => x.Code === subjectCode);
    if (subject.length === 0) {
        throw new Error("No subject have the code of " + subjectCode);
    }
    const rawSlots = exports.MockRawSlotStore.GetBunch(subject[0].SlotUids);
    const slots = parseRawSlotToSlot_1.ParseRawSlotToSlot(rawSlots);
    return parseSlotToBigSlot_1.ParseSlotToBigSlot(slots);
};
exports.GetTestTimetables1 = () => {
    const input1 = exports.GetTinySlotsOf("UEMX3653"); // WWT
    const input2 = exports.GetTinySlotsOf("MPU3123"); // Titas
    const input3 = exports.GetTinySlotsOf("UKMM1011"); // Sun Zi
    const allSlots = input1
        .concat(input2)
        .concat(input3);
    return groupSimilarTimetables_1.GroupSimilarTimetables(findTimetable_1.FindTimetable(allSlots));
};
exports.GetMockInitialState = (source = "heng_2017_sept") => {
    let data = [];
    switch (source) {
        case "heng_2017_apr":
            data = heng_2017_apr_1.HENG_2017_APR();
            break;
        case "heng_2017_sept":
            data = exports.GetTestRawSlot1();
            break;
    }
    return masterState_1.MasterStateReducer(masterState_1.NewMasterState(), new notifyDataLoaded_1.NotifyDataLoaded(data));
};
//# sourceMappingURL=testDataGenerator.js.map
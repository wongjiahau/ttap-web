"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find = require("lodash.find");
const some = require("lodash.some");
const sortBy = require("lodash.sortby");
const uniq = require("lodash.uniq");
const subject_1 = require("../model/subject");
const parseRawSlotToSlot_1 = require("./parseRawSlotToSlot");
function ParseRawSlotToSubject(slots) {
    const result = Array();
    const dic = new Array();
    slots.filter((x) => parseRawSlotToSlot_1.IsReasonable(x) && parseRawSlotToSlot_1.IsParsable(x)).forEach((s) => {
        if (!some(dic, { key: s.SubjectCode })) {
            dic.push({
                key: s.SubjectCode,
                value: new Array()
            });
        }
        find(dic, { key: s.SubjectCode })
            .value
            .push(s);
    });
    dic.forEach((item) => {
        const slot = item.value[0];
        const allSlotOfThisSubject = item.value;
        const slotIds = Array();
        const slotNumbers = Array();
        allSlotOfThisSubject.forEach((s) => {
            slotIds.push(s.Uid);
            slotNumbers.push(s.Number);
        });
        result.push(new subject_1.Subject(slot.SubjectName, slot.SubjectCode, slotIds, uniq(slotNumbers)));
    });
    return sortBy(result, [(o) => o.Name]);
}
exports.ParseRawSlotToSubject = ParseRawSlotToSubject;
//# sourceMappingURL=parseRawSlotToSubject.js.map
const find = require("lodash.find");
const some = require("lodash.some");
const sortBy = require("lodash.sortby");
const uniq = require("lodash.uniq");
import {RawSlot} from "../model/rawSlot";
import {Subject} from "../model/subject";

interface IKeyValue < T1, T2 > { key: T1; value: T2; }
export function ParseSlotToSubject(slots : RawSlot[]) : Subject[] {
    const result = Array < Subject > ();
    const dic = new Array < IKeyValue < string, RawSlot[] >> ();
    slots.forEach((s) => {
        if (!some(dic, {key: s.SubjectCode})) {
            dic.push({
                key: s.SubjectCode,
                value: new Array < RawSlot > ()
            });
        }
        find(dic, {key: s.SubjectCode})
            .value
            .push(s);
    });

    dic.forEach((item) => {
        const slot = item.value[0];
        const allSlotOfThisSubject = item.value;
        const slotIds = Array < number > ();
        const slotNumbers = Array < string > ();
        allSlotOfThisSubject.forEach((s) => {
            slotIds.push(s.Uid);
            slotNumbers.push(s.Number);
        });
        result.push(new Subject(slot.SubjectName, slot.SubjectCode, slotIds, uniq(slotNumbers)));
    });
    return sortBy(result, [(o) => o.Name]);
}

import {sortBy} from "lodash";
import {Dictionary} from "yaca";
import RawSlot from "../model/rawSlot";
import Subject from "../model/subject";

export default function ParseSlotToSubject(slots: RawSlot[]): Subject[] {
    const result = Array<Subject>();
    const dic = new Dictionary<string, RawSlot[]>();
    slots.forEach((s) => {
        if (!dic.containsKey(s.SubjectCode)) {
            dic.add(s.SubjectCode, new Array<RawSlot>());
        }
        dic[s.SubjectCode].push(s);
    });
    dic.forEach((item) => {
        const v = item.value[0];
        result.push(new Subject(v.SubjectName, v.SubjectCode, item.value));
    } );
    return sortBy(result, [(o) => o.SubjectName ]);
}

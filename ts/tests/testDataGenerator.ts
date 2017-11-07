import {
    Slot
} from "../model/slot";
import ParseHtmlToSlots from "../parser/parseHtmlToRawSlot";
import {
    ParseRawSlotToSlot
} from "../parser/parseRawSlotToSlot";
import {
    ParseSlotToSubject
} from "../parser/parseSlotToSubject";
import {
    ParseSlotToTinySlot
} from "../parser/parseSlotToTinySlot";
import {
    TinySlot
} from "../permutator/tinySlot";
import {
    heng_2017_sept
} from "../tests/testData/heng_2017_sept";
import {
    RawSlot
} from "./../model/rawSlot";
import {
    Subject
} from "./../model/subject";

export const GetTestSubjects1 = (): Subject[] => {
    const subjects = ParseSlotToSubject(ParseHtmlToSlots(heng_2017_sept()));
    return subjects;
};

export const GetTestRawSlot1 = (): RawSlot[] => {
    return ParseHtmlToSlots(heng_2017_sept());
};

export const GetTestSlot1 = (): Slot[] => {
    return ParseRawSlotToSlot(GetTestRawSlot1());
};

export const GetTestTinySlot1 = (): TinySlot[] => {
    return ParseSlotToTinySlot(GetTestSlot1());
};

export const GetTinySlotsOf = (subjectCode: string): TinySlot[] => {
    const subject = GetTestSubjects1().filter((x) => x.Code === subjectCode);
    if (subject.length === 0) {
        throw new Error("No subject have the code of " + subjectCode);
    }
    const rawSlots = RawSlot.GetBunch(subject[0].SlotIds);
    const slots = ParseRawSlotToSlot(rawSlots);
    return ParseSlotToTinySlot(slots);
};

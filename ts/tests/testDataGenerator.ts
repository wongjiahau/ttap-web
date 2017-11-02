import ParseHtmlToSlots from "../parser/parseHtmlToRawSlot";
import {ParseSlotToSubject} from "../parser/parseSlotToSubject";
import {heng_2017_sept} from "../tests/testData/heng_2017_sept";
import { RawSlot } from "./../model/rawSlot";
import {Subject} from "./../model/subject";

export const GetTestSubjects1 = () : Subject[] => {
    const subjects = ParseSlotToSubject(ParseHtmlToSlots(heng_2017_sept()));
    return subjects;
};

export const GetTestRawSlot1 = () : RawSlot[] => {
    return ParseHtmlToSlots(heng_2017_sept());
};


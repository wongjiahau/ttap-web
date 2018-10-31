import {FindClashes} from "../clashFinder/findClashes";
import {ObjectStore} from "../dataStructure/objectStore";
import {Slot} from "../model/slot";
import ParseHtmlToSlots from "../parser/parseHtmlToRawSlot";
import {ParseRawSlotToSlot} from "../parser/parseRawSlotToSlot";
import {ParseRawSlotToSubject} from "../parser/parseRawSlotToSubject";
import {ParseSlotToBigSlot} from "../parser/parseSlotToBigSlot";
import {ParseSlotToTinySlot} from "../parser/parseSlotToTinySlot";
import {BigSlot} from "../permutator/bigSlot";
import {FindTimetable} from "../permutator/findTimetable";
import {TinySlot} from "../permutator/tinySlot";
import {NotifyDataLoaded} from "../redux/actions/notifyDataLoaded";
import {MasterStateReducer, NewMasterState} from "../redux/reducers/masterState";
import {heng_2017_sept} from "../tests/testData/heng_2017_sept";
import {RawSlot} from "./../model/rawSlot";
import {Subject} from "./../model/subject";
import {Timetable} from "./../model/timetable";
import {HENG_2017_APR} from "./testData/heng_2017_apr";

export const GetTestSubjects1 = () : Subject[] => {
    const subjects = ParseRawSlotToSubject(heng_2017_sept());
    return subjects;
};

export const GetTestRawSlot1 = () : RawSlot[] => {
    return heng_2017_sept();
};

export const GetTestSlot1 = () : Slot[] => {
    return ParseRawSlotToSlot(GetTestRawSlot1());
};

export const GetTestTinySlot1 = () : TinySlot[] => {
    return ParseSlotToTinySlot(GetTestSlot1());
};

export const MockRawSlotStore = new ObjectStore(GetTestRawSlot1());
export const GetRawSlotsOf = (subjectCode : string) : RawSlot[] => {
    const subject = GetTestSubjects1().filter((x) => x.Code === subjectCode);
    if (subject.length === 0) {
        throw new Error("No subject have the code of " + subjectCode);
    }
    return MockRawSlotStore.GetBunch(subject[0].SlotUids);
};

export const GetTinySlotsOf = (subjectCode : string) : TinySlot[] => {
    const subjects = GetTestSubjects1();
    const uids = subjects.filter((x) => x.Code === subjectCode)[0].SlotUids;
    const slots = GetTestSlot1();
    const matchingSlots : Slot[] = [];
    uids.forEach((uid) => matchingSlots.push(slots.filter((s) => s.Uid === uid)[0]));
    return ParseSlotToTinySlot(matchingSlots);
};

export const GetBigSlotsOf = (subjectCode : string) : BigSlot[] => {
    const subject = GetTestSubjects1().filter((x) => x.Code === subjectCode);
    if (subject.length === 0) {
        throw new Error("No subject have the code of " + subjectCode);
    }
    const rawSlots = MockRawSlotStore.GetBunch(subject[0].SlotUids);
    const slots = ParseRawSlotToSlot(rawSlots);
    return ParseSlotToBigSlot(slots);
};

export const GetTestTimetables1 = () : Timetable[] => {
    const input1 = GetTinySlotsOf("UEMX3653"); // WWT
    const input2 = GetTinySlotsOf("MPU3123"); // Titas
    const input3 = GetTinySlotsOf("UKMM1011"); // Sun Zi
    const allSlots = input1
        .concat(input2)
        .concat(input3);
    return FindTimetable(allSlots);
};

export const GetMockInitialState = (source : "heng_2017_sept" | "heng_2017_apr" = "heng_2017_sept") => {
    let data;
    switch (source) {
        case "heng_2017_apr": data = HENG_2017_APR(); break;
        case "heng_2017_sept": data = GetTestRawSlot1(); break;
    }
    return MasterStateReducer(NewMasterState(), new NotifyDataLoaded(data));
};

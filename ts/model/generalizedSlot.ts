import { IRawSlot, RawSlot } from "./rawSlot";

export interface IGeneralizedSlot {
    Uid: number; //
    CurrentChoice: number; // zero-based index
    SubjectCode: string;
    SubjectName: string;
    Type: string;
    Group: string[];
    Day: string;
    TimePeriod: string;
    WeekNumber: string[];
    Room: string[];
}

export function CreateGeneralizedSlot(rawSlot: RawSlot): IGeneralizedSlot {
    const group = rawSlot.Group.split("/");
    return {
        Uid:            rawSlot.HashId,
        CurrentChoice: getRandomInt(group.length), // Why random? See below.
        SubjectCode:   rawSlot.SubjectCode,
        SubjectName:   rawSlot.SubjectName,
        Type:          rawSlot.Type,
        Group:         group,
        Day:           rawSlot.Day,
        TimePeriod:    rawSlot.TimePeriod,
        WeekNumber:    rawSlot.WeekNumber.split("/"),
        Room:          rawSlot.Room.split("/")
    };
    function getRandomInt(max) {
        // This function is copied from MDN
        // Note: getRandomInt(3) will return 0, 1 or 2
        return Math.floor(Math.random() * Math.floor(max));
    }
    /*     The CurrentChoice is set as random because it is assumed that most user
    will not changed the CurrentChoice due to the fact that they may not even
    know they can change it, so it is better to display random choices
    so that a particular slot would not be bid by many students while other slots
    did not get the bid. */
}

export function CreateGeneralizedSlots(rawSlots: RawSlot[]): IGeneralizedSlot[] {
    return rawSlots.map(CreateGeneralizedSlot);
}

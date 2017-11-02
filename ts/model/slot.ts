import {ParseDay} from "../att/day";
import {ParseType} from "../att/type";
import {TimePeriod} from "./../att/timePeriod";
import {Week} from "./../att/week";
import {RawSlot} from "./rawSlot";
export class Slot {
    public readonly HashId: number;
    public SubjectCode:     number;
    public TimePeriod:      number;
    public Group:           number;
    public Type:            number;
    public Day:             number;
    public Week:            number;
    public constructor(raw : RawSlot) {
        const stringHash = require("string-hash");
        this.HashId      = raw.HashId;
        this.SubjectCode = stringHash(raw.SubjectCode);
        this.TimePeriod  = TimePeriod.Parse(raw.TimePeriod).BinaryData;
        this.Group       = parseInt(raw.Group, 10);
        this.Type        = ParseType(raw.Type);
        this.Day         = ParseDay(raw.Day);
        this.Week        = Week.Parse(raw.WeekNumber).BinaryData;
    }
}

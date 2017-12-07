import { IRawSlot, RawSlot } from "../model/rawSlot";

export function ParseJsonToRawSlot(json: string) : IRawSlot[] {
    const rawSlots = JSON.parse(json) as IRawSlot[];
    rawSlots.forEach((s) => {
        RawSlot.RegisterSlot(s);
    });
    return rawSlots;
}

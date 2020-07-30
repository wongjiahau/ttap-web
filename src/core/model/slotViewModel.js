"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CreateSlotViewModel(rawSlot) {
    return {
        Uid: rawSlot.Uid,
        SlotNumber: parseInt(rawSlot.Number, 10),
        CurrentChoice: 0,
        SubjectCode: rawSlot.SubjectCode,
        SubjectName: rawSlot.SubjectName,
        Type: rawSlot.Type,
        Group: rawSlot.Group.split("/"),
        Day: rawSlot.Day,
        TimePeriod: rawSlot.TimePeriod,
        CreditHour: rawSlot.CreditHour,
        WeekNumber: rawSlot.WeekNumber.split("/"),
        Room: rawSlot.Room.split("/"),
        AlternativeSlots: [],
        IsAlternativeSlot: false,
        IsLocked: false
    };
}
exports.CreateSlotViewModel = CreateSlotViewModel;
function CreateSlotViewModels(rawSlots) {
    return rawSlots.map(CreateSlotViewModel);
}
exports.CreateSlotViewModels = CreateSlotViewModels;
function FromSlotViewModelToRawSlot(s) {
    return {
        Uid: s.Uid,
        Number: s.SlotNumber.toString(),
        SubjectCode: s.SubjectCode,
        SubjectName: s.SubjectName,
        Type: s.Type,
        Group: s.Group.join("/"),
        Day: s.Day,
        TimePeriod: s.TimePeriod,
        WeekNumber: s.WeekNumber.join("/"),
        Room: s.Room.join("/"),
        CreditHour: s.CreditHour
    };
}
exports.FromSlotViewModelToRawSlot = FromSlotViewModelToRawSlot;
//# sourceMappingURL=slotViewModel.js.map
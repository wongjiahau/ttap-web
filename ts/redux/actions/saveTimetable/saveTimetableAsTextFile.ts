import {
    saveAs
} from "file-saver";
import { ObjectStore } from "../../../dataStructure/objectStore";
import { IRawSlot } from "../../../model/rawSlot";
import { CreateSlotViewModels } from "../../../model/slotViewModel";
import { Timetable } from "../../../model/timetable";
import {
    TimetableSummary
} from "./../../../model/timetableSummary";
import {
    SaveTimetable
} from "./saveTimetable";

export class SaveTimetableAsTextFile extends SaveTimetable {
    protected Save(timetable: Timetable, rawSlotStore: ObjectStore<IRawSlot>) {
        const rawSlots = rawSlotStore.GetBunch(timetable.SlotUids);
        const data = "NOTE:\r\n"
        + "\tThe subjects below are ordered by their slots scarcity (a.k.a rareness).\r\n"
        + "\tSo, you should bid the TOPMOST subject first.\r\n\r\n"
        + new TimetableSummary(CreateSlotViewModels(rawSlots))
            .SortByScarcity(rawSlotStore.GetAll())
            .ToString();

        const file = new File([data], "MyTimetable.txt", {
            type: "text/plain;charset=utf-8"
        });
        saveAs(file);
    }

    protected SaveType(): string {
        return "text file";
    }
}

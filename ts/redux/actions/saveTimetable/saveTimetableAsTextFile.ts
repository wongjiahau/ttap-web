import {
    saveAs
} from "file-saver";
import {
    Timetable
} from "./../../../model/timetable";
import {
    TimetableSummary
} from "./../../../model/timetableSummary";
import {
    SaveTimetable
} from "./saveTimetable";

export class SaveTimetableAsTextFile extends SaveTimetable {
    protected Save(timetable: Timetable) {
        const data = new TimetableSummary(timetable).ToString();
        const file = new File([data], "MyTimetable.txt", {
            type: "text/plain;charset=utf-8"
        });
        saveAs(file);
    }

    protected SaveType(): string {
        return "text file";
    }
}

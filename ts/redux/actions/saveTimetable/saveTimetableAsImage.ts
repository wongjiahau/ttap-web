
import {
    saveAs
} from "file-saver";
import {
    Timetable
} from "../../../model/timetable";
import {
    ITimetableListState,
    TimetableListStateAction
} from "../../reducers/timetableListState";
import {
    SaveTimetable
} from "./saveTimetable";

export class SaveTimetableAsImage extends SaveTimetable {
    protected Save(timetable: Timetable) {
        const html2canvas = require("html2canvas");
        html2canvas(document.getElementById("timetable-view")).then((canvas: any) => {
            canvas.toBlob((blob: any) => {
                saveAs(blob, "MyTimetable.png");
            });
        });
    }
    protected SaveType(): string {
        return "image";
    }
}

import {
    saveAs
} from "file-saver";
import * as html2canvas from "html2canvas";
import {
    Timetable
} from "../../model/timetable";
import {
    ITimetableListState,
    TimetableListStateAction
} from "./../reducers/timetableListState";
import {
    SaveTimetable
} from "./saveTimetable";

export class SaveTimetableAsImage extends SaveTimetable {
    protected Save(timetable: Timetable) {
        const element = document.getElementById("timetable-view");
        html2canvas(element).then((canvas) => {
            canvas.toBlob((blob) => {
                saveAs(blob, "MyTimetable.png");
            });
        });
    }
    protected SaveType(): string {
        return "image";
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_saver_1 = require("file-saver");
const saveTimetable_1 = require("./saveTimetable");
class SaveTimetableAsImage extends saveTimetable_1.SaveTimetable {
    Save(timetable) {
        const html2canvas = require("html2canvas");
        html2canvas(document.getElementById("timetable-view")).then((canvas) => {
            canvas.toBlob((blob) => {
                file_saver_1.saveAs(blob, "MyTimetable.png");
            });
        });
    }
    SaveType() {
        return "image";
    }
}
exports.SaveTimetableAsImage = SaveTimetableAsImage;
//# sourceMappingURL=saveTimetableAsImage.js.map
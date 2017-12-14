import {
    saveAs
} from "file-saver";
import {
    Timetable
} from "../../../model/timetable";
import {
    ITimetableListState,
    TimetableListStateAction
} from "./../../reducers/timetableListState";
import {
    SaveTimetable
} from "./saveTimetable";

export class SaveTimetableAsImage extends SaveTimetable {
    protected Save(timetable: Timetable) {
        const html = (document.getElementById("timetable-view") as HTMLElement).outerHTML;
        const data =
`
<!-- Roboto font -->
<html>
<body>
    ${html}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
</body>
</html>
`;
        const file = new File([data], "MyTimetable.html", {
            type: "text/plain;charset=utf-8"
        });
        saveAs(file);
    }
    protected SaveType(): string {
        return "image";
    }
}

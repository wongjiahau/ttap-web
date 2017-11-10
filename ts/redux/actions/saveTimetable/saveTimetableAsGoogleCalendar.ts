import { Timetable } from "../../../model/timetable";
import { SaveTimetable } from "./saveTimetable";

export class SaveTimetableAsGoogleCalendar extends SaveTimetable {
    protected Save(timetable: Timetable) {
        alert("not implemented yet");
    }
    protected SaveType(): string {
        return "google calendar";
    }

}

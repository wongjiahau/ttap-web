import {
    saveAs
} from "file-saver";
import * as html2canvas from "html2canvas";
import {
    ITimetableListState,
    TimetableListStateAction
} from "./../reducers/timetableListState";
export class SaveTimetableAsImage extends TimetableListStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "save timetable as image";
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        if (state.CurrentTimetable) {
            const element = document.getElementById("timetable-view");
            html2canvas(element).then((canvas) => {
                canvas.toBlob((blob) => {
                    saveAs(blob, "MyTimetable.png");
                });
            });
        }
        return {
            ...state,
            IsSaveDialogOpen: false
        };

    }
}

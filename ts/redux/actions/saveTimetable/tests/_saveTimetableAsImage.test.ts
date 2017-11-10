import {expect} from "chai";
import { OpenSaveDialog } from "../../../actions/openSaveDialog";
import { SaveTimetableAsImage } from "../saveTimetableAsImage";

describe("SaveTimetableAsImage action", () => {
    it("'s typename should be 'save timetable as - image'", () => {
        const action = new SaveTimetableAsImage();
        expect(action.TypeName()).to.eq("save timetable as - image");
    });
});

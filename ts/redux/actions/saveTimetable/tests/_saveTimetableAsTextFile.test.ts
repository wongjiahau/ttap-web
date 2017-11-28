import {expect} from "chai";
import { SaveTimetableAsTextFile } from "../saveTimetableAsTextFile";

describe("SaveTimetableAsTextFile action", () => {
    it("'s typename should be 'save timetable as - text file'", () => {
        const action = new SaveTimetableAsTextFile();
        expect(action.TypeName()).to.eq("save timetable as - text file");
    });
});

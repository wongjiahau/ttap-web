import {expect} from "chai";
import {isEqual} from "lodash";
import { ToggleIsOpenOfSaveDialog } from "../actions/toggleIsOpenOfSaveDialog";
import {UpdateSaveTimetableDialogState} from "./../actions/updateSaveTimetableDialogState";
import {ITimetableCreatorState, TimetableCreatorState, TimetableCreatorStateReducer} from "./../reducers/timetableCreatorState";
describe("UpdateSaveTimetableDialogState action", () => {
    it("'s typename should be 'update save timetable dialog state ...'", () => {
        const action = new UpdateSaveTimetableDialogState(new ToggleIsOpenOfSaveDialog(true));
        expect(action.TypeName()).to.eq("update save timetable dialog state : open save dialog");
    });
});

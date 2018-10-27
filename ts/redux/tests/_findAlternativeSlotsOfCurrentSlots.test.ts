import { expect } from "chai";
import { IndexOf } from "../../tests/testData/heng_2017_apr";
import { GetMockInitialState } from "../../tests/testDataGenerator";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { ShowAlternateSlot } from "../actions/showAlternateSlot";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import {MasterStateReducer} from "../reducers/masterState";

describe("find alternative slots of current slot", () => {
    it("should not show alternative slots if not all sibling slots are shown", () => {
        // For more info, refer https://github.com/wongjiahau/ttap-web/issues/101
        const intialState = GetMockInitialState("heng_2017_apr");
        let state = MasterStateReducer(intialState, new ToggleSubjectSelection(IndexOf.FM1));
        state = MasterStateReducer(state, new ToggleSubjectSelection(IndexOf.FM2));
        state = MasterStateReducer(state, new FindAlternativeSlotsOfCurrentSlots());

        const slotsToBeClicked = state.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) =>
                x.Type === "L" &&
                x.SubjectCode === "UEME2123" &&
                x.Group[0] === "1"
            )[0]; // Fluid Mechanic I, Lecture 1

        state = MasterStateReducer(state, new ShowAlternateSlot(slotsToBeClicked));
        expect(state.TimetableListState.AlternateSlots.some((x) => x.Group[0] === "2")).to.eq(false);

    });

});

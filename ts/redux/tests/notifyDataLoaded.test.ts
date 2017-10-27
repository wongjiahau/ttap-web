import {expect} from "chai";
import {NotifyDataLoaded} from "./../actions/notifyDataLoaded";
import {MainFrameReducer, MainFrameState} from "./../reducers/mainFrameState";

describe("notifyDataLoaded action", () => {

    it("'s name should be notify data loaded", () => {
        const action = new NotifyDataLoaded(null);
        expect(action.TypeName())
            .to
            .eq("notify data loaded");
    });

    it("should change IsDataLoaded to true", () => {
        const newState = MainFrameReducer(new MainFrameState(), new NotifyDataLoaded(null).Action());
        expect(newState.IsSlotLoaded)
            .to
            .eq(true);
    });

    it("should set RawSlots based on the constructor parameter", () => {
        const newState = MainFrameReducer(new MainFrameState(), new NotifyDataLoaded([null, null]).Action());
        expect(newState.RawSlots.length)
            .to
            .eq(2);
    });
});

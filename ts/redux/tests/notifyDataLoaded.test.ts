import {
    expect
} from "chai";
import {
    NotifyDataLoaded
} from "./../actions/notifyDataLoaded";
import {
    MainFrameState,
    MainFrameStateReducer
} from "./../reducers/mainFrameState";

describe("notifyDataLoaded action", () => {

    it("'s name should be notify data loaded", () => {
        const action = new NotifyDataLoaded(null);
        expect(action.TypeName()).to.eq("notify data loaded");
    });

    it("should change IsDataLoaded to true", () => {
        const newState = MainFrameStateReducer(new MainFrameState(), new NotifyDataLoaded(null).Action());
        expect(newState.IsDataLoaded).to.eq(true);

    });

});

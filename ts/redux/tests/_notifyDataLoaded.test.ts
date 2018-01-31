import {
    expect
} from "chai";
import { GeneralizeSlot } from "../../permutator/generalizeSlot";
import {
    GetTestRawSlot1
} from "../../tests/testDataGenerator";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "../reducers/masterState";
import {
    NotifyDataLoaded
} from "./../actions/notifyDataLoaded";

describe("notifyDataLoaded action", () => {
    it("'s name should be notify data loaded", () => {
        const action = new NotifyDataLoaded(null);
        expect(action.TypeName())
            .to
            .eq("notify data loaded");
    });

    it("should change IsDataLoaded to true", () => {
        const newState = MasterStateReducer(NewMasterState(),
            new NotifyDataLoaded(GetTestRawSlot1()));
        expect(newState.TimetableCreatorState.IsSlotLoaded).to.eq(true);
    });

    it("should set Subject property of SubjectListState", () => {
        const newState = MasterStateReducer(NewMasterState(),
            new NotifyDataLoaded(GetTestRawSlot1()));
        expect(newState.SubjectListState.Subjects.length).to.eq(18);
    });

    it("should set IsOpen of SubjectListView to true", () => {
        const newState = MasterStateReducer(NewMasterState(),
            new NotifyDataLoaded(GetTestRawSlot1()));
        expect(newState.SubjectListState.IsOpen).to.eq(true);
    });

    it("should initialize DataState", () => {
        const testSlots = GetTestRawSlot1();
        const newState = MasterStateReducer(NewMasterState(),
            new NotifyDataLoaded(testSlots));
        const numberOfProperty = (dict) => Object.keys(dict).length;
        const router = newState.DataState.RawSlotDataRouter;
        router.SetRouteTo("ungeneralized");
        expect(numberOfProperty(router.GetCurrentData().GetDict())).to.eq(testSlots.length);
        router.SetRouteTo("generalized");
        router.GetCurrentData();
        expect(numberOfProperty(router.GetCurrentData().GetDict())).to.eq(GeneralizeSlot(testSlots).length);
    });

});

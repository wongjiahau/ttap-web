"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const generalizeSlot_1 = require("../../permutator/generalizeSlot");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const masterState_1 = require("../reducers/masterState");
const notifyDataLoaded_1 = require("./../actions/notifyDataLoaded");
describe("notifyDataLoaded action", () => {
    it("'s name should be notify data loaded", () => {
        const action = new notifyDataLoaded_1.NotifyDataLoaded([]);
        chai_1.expect(action.TypeName())
            .to
            .eq("notify data loaded");
    });
    it("should change IsDataLoaded to true", () => {
        const newState = masterState_1.MasterStateReducer(masterState_1.NewMasterState(), new notifyDataLoaded_1.NotifyDataLoaded(testDataGenerator_1.GetTestRawSlot1()));
        chai_1.expect(newState.TimetableCreatorState.IsSlotLoaded).to.eq(true);
    });
    it("should set Subject property of SubjectListState", () => {
        const newState = masterState_1.MasterStateReducer(masterState_1.NewMasterState(), new notifyDataLoaded_1.NotifyDataLoaded(testDataGenerator_1.GetTestRawSlot1()));
        chai_1.expect(newState.SubjectListState.Subjects.length).to.eq(17);
    });
    it("should set IsOpen of SubjectListView to true", () => {
        const newState = masterState_1.MasterStateReducer(masterState_1.NewMasterState(), new notifyDataLoaded_1.NotifyDataLoaded(testDataGenerator_1.GetTestRawSlot1()));
        chai_1.expect(newState.SubjectListState.IsOpen).to.eq(true);
    });
    it("should initialize DataState", () => {
        const testSlots = testDataGenerator_1.GetTestRawSlot1();
        const newState = masterState_1.MasterStateReducer(masterState_1.NewMasterState(), new notifyDataLoaded_1.NotifyDataLoaded(testSlots));
        const numberOfProperty = (dict) => Object.keys(dict).length;
        const router = newState.DataState.RawSlotDataRouter;
        router.SetRouteTo("ungeneralized");
        chai_1.expect(numberOfProperty(router.GetCurrentData().GetDict())).to.eq(testSlots.length);
        router.SetRouteTo("generalized");
        router.GetCurrentData();
        chai_1.expect(numberOfProperty(router.GetCurrentData().GetDict())).to.eq(generalizeSlot_1.GeneralizeSlot(testSlots).length);
    });
});
//# sourceMappingURL=_notifyDataLoaded.test.js.map
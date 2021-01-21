"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const findAlternativeSlotsOfCurrentSlots_1 = require("../actions/findAlternativeSlotsOfCurrentSlots");
const goToThisAlternativeSlot_1 = require("../actions/goToThisAlternativeSlot");
const toggleSubjectSelection_1 = require("../actions/toggleSubjectSelection");
const masterState_1 = require("../reducers/masterState");
describe([
    "find alternative slots of current slot",
    "   generated destination time tables should only differs from current timetable by target slot"
].join("\n"), () => {
    it("property test", () => {
        const intialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let state = masterState_1.MasterStateReducer(intialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM1));
        state = masterState_1.MasterStateReducer(state, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM2));
        state = masterState_1.MasterStateReducer(state, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.H));
        state = masterState_1.MasterStateReducer(state, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ITBS));
        chai_1.expect(state.TimetableListState.SlotViewModelStore.GetAll()).to.have.lengthOf(95);
        const justNow = Date.now();
        state = masterState_1.MasterStateReducer(state, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        console.log("Time taken to find alternative slots (seconds): " + ((Date.now() - justNow) / 1000).toFixed(2));
        const slotStore = state.TimetableListState.SlotViewModelStore;
        const currentSlots = slotStore.GetAll();
        let count = 0;
        // const stringify = (slot: ISlotViewModel) => {
        //     return `[${slot.Uid}] ${slot.SubjectCode} ${slot.Type} (${slot.Group.join(",")})`
        // }
        currentSlots.forEach(currentSlot => {
            currentSlot.AlternativeSlots.forEach(alternativeSlot => {
                // console.log("From", stringify(currentSlot), "To", stringify(alternativeSlot.slot))
                // console.log(`Expected Destination = ${alternativeSlot.destinationTimetableIndex},${alternativeSlot.destinationTimetableSubIndex}`)
                expectOnlyDiffersBySourceSlot({
                    sourceSlot: currentSlot,
                    destinationSlotUid: alternativeSlot.slot.Uid,
                    previousState: state,
                });
                count++;
            });
        });
        chai_1.expect(count).to.eq(55);
    });
    it("specific scenario 1", () => {
        const intialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        // 1. Select subject FM2 and ITBS
        const state0 = masterState_1.MasterStateReducer(intialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM2));
        let state1 = masterState_1.MasterStateReducer(state0, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ITBS));
        state1 = masterState_1.MasterStateReducer(state1, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        const findSlot = (state, targetSlot) => {
            const slot = state.TimetableListState.SlotViewModelStore.GetAll()
                .find(slot => slot.SubjectCode === targetSlot.SubjectCode
                && slot.Type === targetSlot.Type
                && slot.Group.indexOf(targetSlot.Group) > -1);
            if (!slot) {
                throw new Error("Cannot find this slot:\n" + JSON.stringify(targetSlot, null, 2));
            }
            return slot;
        };
        // 2. Switch slot from FM2-P1 to FM2-P14
        const FM2_P1 = findSlot(state1, { SubjectCode: heng_2017_apr_1.CodeOf.FM2, Type: "P", Group: "1" });
        const FM2_P14a = findSlot(state1, { SubjectCode: heng_2017_apr_1.CodeOf.FM2, Type: "P", Group: "14" });
        // 2a. Expect only differs by source slot
        const state2 = expectOnlyDiffersBySourceSlot({
            sourceSlot: FM2_P1,
            destinationSlotUid: FM2_P14a.Uid,
            previousState: state1,
        });
        // 3. Swtich slot from ITBS-T1 to ITBS-T5
        const ITBS_T1 = findSlot(state2, { SubjectCode: heng_2017_apr_1.CodeOf.ITBS, Type: "T", Group: "1" });
        const ITBS_T5 = findSlot(state2, { SubjectCode: heng_2017_apr_1.CodeOf.ITBS, Type: "T", Group: "5" });
        // 3a. Expect only differs by source slot
        const state3 = expectOnlyDiffersBySourceSlot({
            sourceSlot: ITBS_T1,
            destinationSlotUid: ITBS_T5.Uid,
            previousState: state2,
        });
        // 3b. Expect ITBS-5 is in the timetable
        const slots1 = getCurrentTimetableSlots(state3);
        chai_1.expect(slots1.some(slot => slot.SubjectCode === heng_2017_apr_1.CodeOf.ITBS
            && slot.Type === "T"
            && slot.Group.indexOf("5") > -1)).to.eq(true);
        // 4. Switch slot from FM2-P14 to FM2-P8
        const FM2_P14b = findSlot(state3, { SubjectCode: heng_2017_apr_1.CodeOf.FM2, Type: "P", Group: "14" });
        const FM2_P8 = findSlot(state3, { SubjectCode: heng_2017_apr_1.CodeOf.FM2, Type: "P", Group: "8" });
        // 4a. Expect only differs by source slot
        const state4 = expectOnlyDiffersBySourceSlot({
            sourceSlot: FM2_P14b,
            destinationSlotUid: FM2_P8.Uid,
            previousState: state3,
        });
        // 4b. Expect ITBS-T5 is still in the current timetable
        const slots2 = getCurrentTimetableSlots(state4);
        chai_1.expect(slots2.some(slot => slot.SubjectCode === heng_2017_apr_1.CodeOf.ITBS
            && slot.Type === "T"
            && slot.Group.indexOf("5") > -1)).to.eq(true);
    });
});
const getCurrentTimetableSlots = (state) => {
    const slotUids = state.TimetableListState.FiltrateTimetables[state.TimetableListState.CurrentIndex]
        .ListOfSlotUids[state.TimetableListState.CurrentSubIndex];
    const result = state.TimetableListState.SlotViewModelStore.GetBunch(slotUids);
    chai_1.expect(slotUids.length).to.eq(result.length);
    return result;
};
const expectOnlyDiffersBySourceSlot = ({ sourceSlot, destinationSlotUid, previousState, }) => {
    const sourceTimetableSlots = getCurrentTimetableSlots(previousState);
    const nextState = masterState_1.MasterStateReducer(previousState, new goToThisAlternativeSlot_1.GoToThisAlternativeSlot(sourceSlot.Uid, destinationSlotUid));
    // console.log(`Actual Destination = ${nextState.TimetableListState.CurrentIndex},${nextState.TimetableListState.CurrentSubIndex}`)
    const destinationTimetableSlots = getCurrentTimetableSlots(nextState);
    const removeCurrentSlotKind = (slots) => {
        const result = slots
            .filter(slot => !sameKind(sourceSlot, slot))
            .map(slot => slot.Uid)
            .sort();
        chai_1.expect(slots.length - result.length).to.eq(1);
        return result;
    };
    // Expect destination timetable is different from source timetable
    chai_1.expect(destinationTimetableSlots.sort((a, b) => a.Uid - b.Uid))
        .not.to.eq(sourceTimetableSlots.sort((a, b) => a.Uid - b.Uid));
    // Expect there's no difference between destination timetable and current timetable
    // after removing slots of the same kind with currentSlot from both timetables
    chai_1.expect(removeCurrentSlotKind(destinationTimetableSlots))
        .to.deep.eq(removeCurrentSlotKind(sourceTimetableSlots));
    // Expect the destination timetable should NOT contain the source slot
    // console.log({sourceSlotUid: sourceSlot.Uid, destinationSlotUid})
    chai_1.expect(destinationTimetableSlots.some(slot => slot.Uid === sourceSlot.Uid)).to.eq(false);
    // Expect the destination timetable should contain the destination slot
    chai_1.expect(destinationTimetableSlots.some(slot => slot.Uid === destinationSlotUid)).to.eq(true);
    return masterState_1.MasterStateReducer(nextState, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
};
const sameKind = (a, b) => {
    return a.Type === b.Type && a.SubjectCode === b.SubjectCode;
};
//# sourceMappingURL=_findAlternativeSlotsOfCurrentSlots2.test.js.map
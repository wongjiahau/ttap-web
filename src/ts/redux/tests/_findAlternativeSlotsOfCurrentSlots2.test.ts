import { expect } from "chai";
import { ISlotViewModel } from "../../model/slotViewModel";
import { CodeOf, IndexOf } from "../../tests/testData/heng_2017_apr";
import { GetMockInitialState } from "../../tests/testDataGenerator";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { GoToThisAlternativeSlot } from "../actions/goToThisAlternativeSlot";
import { ShowAlternateSlot } from "../actions/showAlternateSlot";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import { IMasterState, MasterStateReducer } from "../reducers/masterState";

describe(
  [
    "find alternative slots of current slot",
    "   generated destination time tables should only differs from current timetable by target slot",
  ].join("\n"),
  () => {
    it("property test", () => {
      const intialState = GetMockInitialState("heng_2017_apr");
      let state = MasterStateReducer(
        intialState,
        new ToggleSubjectSelection(IndexOf.FM1)
      );
      state = MasterStateReducer(
        state,
        new ToggleSubjectSelection(IndexOf.FM2)
      );
      state = MasterStateReducer(state, new ToggleSubjectSelection(IndexOf.H));
      state = MasterStateReducer(
        state,
        new ToggleSubjectSelection(IndexOf.ITBS)
      );
      expect(
        state.TimetableListState.SlotViewModelStore.GetAll()
      ).to.have.lengthOf(95);

      const justNow = Date.now();
      state = MasterStateReducer(
        state,
        new FindAlternativeSlotsOfCurrentSlots()
      );
      console.log(
        "Time taken to find alternative slots (seconds): " +
          ((Date.now() - justNow) / 1000).toFixed(2)
      );

      const slotStore = state.TimetableListState.SlotViewModelStore;
      const currentSlots = slotStore.GetAll();

      let count = 0;
      // const stringify = (slot: ISlotViewModel) => {
      //     return `[${slot.Uid}] ${slot.SubjectCode} ${slot.Type} (${slot.Group.join(",")})`
      // }
      currentSlots.forEach((currentSlot) => {
        currentSlot.AlternativeSlots.forEach((alternativeSlot) => {
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

      expect(count).to.eq(55);
    });

    it("specific scenario 1", () => {
      const intialState = GetMockInitialState("heng_2017_apr");
      // 1. Select subject FM2 and ITBS
      const state0 = MasterStateReducer(
        intialState,
        new ToggleSubjectSelection(IndexOf.FM2)
      );
      let state1 = MasterStateReducer(
        state0,
        new ToggleSubjectSelection(IndexOf.ITBS)
      );
      state1 = MasterStateReducer(
        state1,
        new FindAlternativeSlotsOfCurrentSlots()
      );

      const findSlot = (
        state: IMasterState,
        targetSlot: {
          SubjectCode: string;
          Type: string;
          Group: string;
        }
      ): ISlotViewModel => {
        const slot = state.TimetableListState.SlotViewModelStore.GetAll().find(
          (slot) =>
            slot.SubjectCode === targetSlot.SubjectCode &&
            slot.Type === targetSlot.Type &&
            slot.Group.indexOf(targetSlot.Group) > -1
        );
        if (!slot) {
          throw new Error(
            "Cannot find this slot:\n" + JSON.stringify(targetSlot, null, 2)
          );
        }
        return slot;
      };

      // 2. Switch slot from FM2-P1 to FM2-P14
      const FM2_P1 = findSlot(state1, {
        SubjectCode: CodeOf.FM2,
        Type: "P",
        Group: "1",
      });
      const FM2_P14a = findSlot(state1, {
        SubjectCode: CodeOf.FM2,
        Type: "P",
        Group: "14",
      });

      // 2a. Expect only differs by source slot
      const state2 = expectOnlyDiffersBySourceSlot({
        sourceSlot: FM2_P1,
        destinationSlotUid: FM2_P14a.Uid,
        previousState: state1,
      });

      // 3. Swtich slot from ITBS-T1 to ITBS-T5
      const ITBS_T1 = findSlot(state2, {
        SubjectCode: CodeOf.ITBS,
        Type: "T",
        Group: "1",
      });
      const ITBS_T5 = findSlot(state2, {
        SubjectCode: CodeOf.ITBS,
        Type: "T",
        Group: "5",
      });

      // 3a. Expect only differs by source slot
      const state3 = expectOnlyDiffersBySourceSlot({
        sourceSlot: ITBS_T1,
        destinationSlotUid: ITBS_T5.Uid,
        previousState: state2,
      });

      // 3b. Expect ITBS-5 is in the timetable
      const slots1 = getCurrentTimetableSlots(state3);
      expect(
        slots1.some(
          (slot) =>
            slot.SubjectCode === CodeOf.ITBS &&
            slot.Type === "T" &&
            slot.Group.indexOf("5") > -1
        )
      ).to.eq(true);

      // 4. Switch slot from FM2-P14 to FM2-P8
      const FM2_P14b = findSlot(state3, {
        SubjectCode: CodeOf.FM2,
        Type: "P",
        Group: "14",
      });
      const FM2_P8 = findSlot(state3, {
        SubjectCode: CodeOf.FM2,
        Type: "P",
        Group: "8",
      });

      // 4a. Expect only differs by source slot
      const state4 = expectOnlyDiffersBySourceSlot({
        sourceSlot: FM2_P14b,
        destinationSlotUid: FM2_P8.Uid,
        previousState: state3,
      });

      // 4b. Expect ITBS-T5 is still in the current timetable
      const slots2 = getCurrentTimetableSlots(state4);
      expect(
        slots2.some(
          (slot) =>
            slot.SubjectCode === CodeOf.ITBS &&
            slot.Type === "T" &&
            slot.Group.indexOf("5") > -1
        )
      ).to.eq(true);
    });
  }
);

const getCurrentTimetableSlots = (state: IMasterState) => {
  const slotUids =
    state.TimetableListState.FiltrateTimetables[
      state.TimetableListState.CurrentIndex
    ].ListOfSlotUids[state.TimetableListState.CurrentSubIndex];

  const result = state.TimetableListState.SlotViewModelStore.GetBunch(slotUids);
  expect(slotUids.length).to.eq(result.length);
  return result;
};

const expectOnlyDiffersBySourceSlot = ({
  sourceSlot,
  destinationSlotUid,
  previousState,
}: {
  /**
   * The slot where we wanted to changed when going to alternative slots
   */
  sourceSlot: ISlotViewModel;
  destinationSlotUid: number;
  previousState: IMasterState;
}) => {
  const sourceTimetableSlots = getCurrentTimetableSlots(previousState);

  const nextState = MasterStateReducer(
    previousState,
    new GoToThisAlternativeSlot(sourceSlot.Uid, destinationSlotUid)
  );

  // console.log(`Actual Destination = ${nextState.TimetableListState.CurrentIndex},${nextState.TimetableListState.CurrentSubIndex}`)

  const destinationTimetableSlots = getCurrentTimetableSlots(nextState);

  const removeCurrentSlotKind = (slots: ISlotViewModel[]): number[] => {
    const result = slots
      .filter((slot) => !sameKind(sourceSlot, slot))
      .map((slot) => slot.Uid)
      .sort();

    expect(slots.length - result.length).to.eq(1);
    return result;
  };

  // Expect destination timetable is different from source timetable
  expect(destinationTimetableSlots.sort((a, b) => a.Uid - b.Uid)).not.to.eq(
    sourceTimetableSlots.sort((a, b) => a.Uid - b.Uid)
  );

  // Expect there's no difference between destination timetable and current timetable
  // after removing slots of the same kind with currentSlot from both timetables
  expect(removeCurrentSlotKind(destinationTimetableSlots)).to.deep.eq(
    removeCurrentSlotKind(sourceTimetableSlots)
  );

  // Expect the destination timetable should NOT contain the source slot
  // console.log({sourceSlotUid: sourceSlot.Uid, destinationSlotUid})
  expect(
    destinationTimetableSlots.some((slot) => slot.Uid === sourceSlot.Uid)
  ).to.eq(false);

  // Expect the destination timetable should contain the destination slot
  expect(
    destinationTimetableSlots.some((slot) => slot.Uid === destinationSlotUid)
  ).to.eq(true);

  return MasterStateReducer(
    nextState,
    new FindAlternativeSlotsOfCurrentSlots()
  );
};

const sameKind = (a: ISlotViewModel, b: ISlotViewModel): boolean => {
  return a.Type === b.Type && a.SubjectCode === b.SubjectCode;
};

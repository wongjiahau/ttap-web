import { expect } from "chai";
import { TimePeriod } from "../att/timePeriod";
import { BoxKind, STCBox } from "../model/matrix/stcBox";
import { DefilterTimetable } from "../redux/actions/defilterTimetable";
import { FilterTimetable } from "../redux/actions/filterTimetable";
import { ToggleSubjectSelection } from "../redux/actions/toggleSubjectSelection";
import { UpdateTotalMatrix } from "../redux/actions/updateTotalMatrix";
import { MasterStateReducer } from "../redux/reducers/masterState";
import { IndexOf } from "../tests/testData/heng_2017_apr";
import { GetMockInitialState } from "../tests/testDataGenerator";

describe("Integration test", () => {
  beforeEach(() => {
    TimePeriod.SetMinTo8am();
  });

  it("case 1", () => {
    const behaviour = `
        Step 0. Given Ali just loaded slots data (by logging in)
        Step 1. When user selected a subject A
        Step 2. And he set some time constraint
        Step 3. And he selected another subject B
        Step 4. And he set some time constraint
        Step 5. And he deset some time constraint that he clicked previously
        Step 6. Then he should see that the [X] he clicked should become a green box instead of a grey box
        `;
    // Step 0
    const initialState = GetMockInitialState("heng_2017_apr");

    // Step 1
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.CSD2)
    );
    expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
    expect(
      newState.TimetableListState.FiltrateTimetables.every(
        (partition) => partition.ListOfSlotUids.length === 2
      )
    ).to.eq(true);
    newState = MasterStateReducer(newState, new UpdateTotalMatrix());
    expect(
      newState.SetTimeConstraintState.TotalMatrix.filter(
        (x) => x.Kind === BoxKind.MaybeOccupied
      )
    ).to.have.lengthOf(6);

    // Step 2
    const stcBox1 = newState.SetTimeConstraintState.TotalMatrix.filter(
      (x) => x.Uid === "32"
    )[0]; // 3 means Thursday, 2 means 3rd box (3nd box means 9.00am->9.30am, since we set the min to be 8am)
    expect(stcBox1.Kind).to.eq(BoxKind.MaybeOccupied);
    newState = MasterStateReducer(newState, new FilterTimetable(stcBox1));
    const stcBox2 = newState.SetTimeConstraintState.TotalMatrix.filter(
      (x) => x.Uid === "34"
    )[0]; // 3 means Thursday, 4 means 5th box (5th box means 10.30am->10.30am, since we set the min to be 8am)
    expect(stcBox2.Kind).to.eq(BoxKind.MaybeOccupied);
    newState = MasterStateReducer(newState, new FilterTimetable(stcBox2));
    expect(
      newState.SetTimeConstraintState.TotalMatrix.filter(
        (x) => x.Kind === BoxKind.MaybeOccupied
      )
    ).to.have.lengthOf(0);

    // Step 3
    newState = MasterStateReducer(
      newState,
      new ToggleSubjectSelection(IndexOf.CT)
    );
    expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(4);
    expect(
      newState.TimetableListState.FiltrateTimetables.map(
        (x) => x.ListOfSlotUids.length
      )
    ).to.deep.eq([8, 8, 4, 4]);
    newState = MasterStateReducer(newState, new UpdateTotalMatrix());
    expect(
      newState.SetTimeConstraintState.TotalMatrix.filter(
        (x) => x.Kind === BoxKind.MaybeOccupied
      )
    ).to.have.lengthOf(12);
    expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([
      0, 0, 0, 0, 0, 0, 0,
    ]);

    // Step 4
    const stcBox3 = newState.SetTimeConstraintState.TotalMatrix.filter(
      (x) => x.Uid === "32"
    )[0];
    newState = MasterStateReducer(newState, new FilterTimetable(stcBox3));
    expect(
      newState.SetTimeConstraintState.TotalMatrix.filter(
        (x) => x.Kind === BoxKind.MaybeOccupied
      )
    ).to.have.lengthOf(8);
    const stcBox4 = newState.SetTimeConstraintState.TotalMatrix.filter(
      (x) => x.Uid === "32"
    )[0];
    expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([
      0, 0, 0, 4, 0, 0, 0,
    ]);
    expect(stcBox4.Kind).to.eq(BoxKind.Clicked);

    // Step 5
    newState = MasterStateReducer(newState, new DefilterTimetable(stcBox4));
    const stcBox5 = newState.SetTimeConstraintState.TotalMatrix.filter(
      (x) => x.Uid === "32"
    )[0];

    // Step 6
    expect(stcBox5.Kind).to.eq(BoxKind.MaybeOccupied);
  });
});

import { expect } from "chai";
import { TimePeriod } from "../att/timePeriod";
import { StateKind } from "../model/states/stcBox";
import { DefilterTimetable } from "../redux/actions/defilterTimetable";
import { FilterTimetable } from "../redux/actions/filterTimetable";
import { ToggleSubjectSelection } from "../redux/actions/toggleSubjectSelection";
import { UpdateTotalState } from "../redux/actions/updateTotalState";
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
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.CSD2));
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
        newState = MasterStateReducer(newState, new UpdateTotalState());
        expect(newState.SetTimeConstraintState.TotalState.filter((x) => x.Kind === StateKind.MaybeOccupied)).to.have.lengthOf(6);

        // Step 2
        const stcBox1 = newState.SetTimeConstraintState.TotalState.filter((x) => x.Uid === "32")[0]; // 32 means Wednesday, 2nd box (2nd box means 8.30am->9.00am, since we set the min to be 8am)
        newState = MasterStateReducer(newState, new FilterTimetable(stcBox1));
        const stcBox2 = newState.SetTimeConstraintState.TotalState.filter((x) => x.Uid === "34")[0]; // 34 means Wednesday, 4th box (4th box means 9.30am->10.00am, since we set the min to be 8am)
        newState = MasterStateReducer(newState, new FilterTimetable(stcBox2));
        expect(newState.SetTimeConstraintState.TotalState.filter((x) => x.Kind === StateKind.MaybeOccupied)).to.have.lengthOf(0);

        // Step 3
        newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.CT));
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(4);
        newState = MasterStateReducer(newState, new UpdateTotalState());
        expect(newState.SetTimeConstraintState.TotalState.filter((x) => x.Kind === StateKind.MaybeOccupied)).to.have.lengthOf(12);
        expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);

        // Step 4
        const stcBox3 = newState.SetTimeConstraintState.TotalState.filter((x) => x.Uid === "32")[0];
        newState = MasterStateReducer(newState, new FilterTimetable(stcBox3));
        expect(newState.SetTimeConstraintState.TotalState.filter((x) => x.Kind === StateKind.MaybeOccupied)).to.have.lengthOf(8);
        const stcBox4 = newState.SetTimeConstraintState.TotalState.filter((x) => x.Uid === "32")[0];
        expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 4, 0, 0, 0]);
        expect(stcBox4.Kind).to.eq(StateKind.Clicked);

        // Step 5
        newState = MasterStateReducer(newState, new DefilterTimetable(stcBox4));
        const stcBox5 = newState.SetTimeConstraintState.TotalState.filter((x) => x.Uid === "32")[0];

        // Step 6
        expect(stcBox5.Kind).to.eq(StateKind.MaybeOccupied);

    });

});

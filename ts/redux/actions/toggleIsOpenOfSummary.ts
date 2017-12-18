import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";
export class ToggleIsOpenOfSummary extends MasterStateAction {
    public constructor(private open: boolean = null) {
        super();
    }
    public TypeName(): string {
        return "toggle is open of summary";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        if (this.open !== null) {
            return {
                ...state,
                TimetableListState: {
                    ...state.TimetableListState,
                    IsSummaryOpen: this.open
                }
            };
        }
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                IsSummaryOpen: !state.TimetableListState.IsSummaryOpen
            }
        };
    }
}

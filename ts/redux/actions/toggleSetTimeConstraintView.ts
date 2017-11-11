import {
    ITimetableListState,
    TimetableListStateAction
} from "./../reducers/timetableListState";

export class ToggleSetTimeConstraintView extends TimetableListStateAction {
    public constructor(private open: boolean) {
        super();
    }
    public TypeName(): string {
        return this.open ? "open set time constraint view" : "close set time constraint view";
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        return {
            ...state,
            IsSetTimeConstraintViewOpen: this.open
        };
    }
}

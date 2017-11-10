import {
    ITimetableCreatorState,
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";

export class ToggleSetTimeConstraintView extends TimetableCreatorStateAction {
    public constructor(private open: boolean) {
        super();
    }
    public TypeName(): string {
        return this.open ? "open set time constraint view" : "close set time constraint view";
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        return {
            ...state,
            SetTimeConstraintState: {
                ...state.SetTimeConstraintState,
                IsOpen: this.open
            }
        };
    }
}

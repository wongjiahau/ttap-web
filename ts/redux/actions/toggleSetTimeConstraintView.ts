import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class ToggleSetTimeConstraintView extends MasterStateAction {
    public constructor(private open: boolean) {
        super();
    }
    public TypeName(): string {
        return this.open ? "open set time constraint view" : "close set time constraint view";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            SetTimeConstraintState: {
                ...state.SetTimeConstraintState,
                IsOpen: this.open
            }
        };
    }
}

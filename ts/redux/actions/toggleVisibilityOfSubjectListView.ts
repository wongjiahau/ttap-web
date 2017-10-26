import { ITimetableCreatorState } from "./../reducers/timetableCreatorState";
import { ActionGenerator } from "./actionGenerator";

export class ToggleVisibilityOfSubjectListView extends ActionGenerator<ITimetableCreatorState> {
    public TypeName(): string {
        return "toggle visibility of subject list view";
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        return {
            ...state,
            IsSubjectListViewVisible : !state.IsSubjectListViewVisible
        };
    }

}

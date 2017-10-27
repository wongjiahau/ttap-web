import {
    ITimetableCreatorState,
    TimetableCreatorStateActionGenerator
} from "./../reducers/timetableCreatorState";

export class ToggleVisibilityOfSubjectListView extends TimetableCreatorStateActionGenerator {
    public TypeName(): string {
        return "toggle visibility of subject list view";
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        return {
            ...state,
            IsSubjectListViewVisible: !state.IsSubjectListViewVisible
        };
    }

}

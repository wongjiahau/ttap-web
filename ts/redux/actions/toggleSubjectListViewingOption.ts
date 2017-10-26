import {ISubjectListViewState} from "./../reducers/subjectListViewState";
import {ActionGenerator} from "./actionGenerator";
export class ToggleSubjectListViewingOptions extends ActionGenerator < ISubjectListViewState > {
    public TypeName() : string {return "toggle subject list viewing option"; }
    protected GenerateNewState(state : ISubjectListViewState) : ISubjectListViewState {
        const result: ISubjectListViewState = {
            ...state,
            IsShowingSelectedSubjectOnly: !state.IsShowingSelectedSubjectOnly
        };
        return result;
    }

}

import {ISubjectListViewState} from "./../reducers/subjectListViewState";
import {ActionGenerator} from "./actionGenerator";
export class ToggleSubjectListViewingOptions extends ActionGenerator < ISubjectListViewState > {
    protected GenerateNewState(state : ISubjectListViewState) : ISubjectListViewState {
        const result: ISubjectListViewState = {
            ...state,
            IsShowingSelectedSubjectOnly: !state.IsShowingSelectedSubjectOnly
        };
        return result;
    }
    protected TypeName() : string {return "toggle subject list viewing option"; }

}

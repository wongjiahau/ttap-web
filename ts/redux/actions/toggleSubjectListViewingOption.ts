import {ISubjectListViewState} from "./../reducers/subjectListViewState";
import {ActionGenerator} from "./actionGenerator";
export class ToggleSubjectListViewingOptions extends ActionGenerator < ISubjectListViewState > {
    public constructor() {
        super("toggle subject list viewing option");
        this.CreateAction((state : ISubjectListViewState) => {
            const result : ISubjectListViewState = {
                ...state,
                IsShowingSelectedSubjectOnly: !state.IsShowingSelectedSubjectOnly
            };
            return result;
        });
    }
}

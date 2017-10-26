import {
    ToggleVisibilityOfSubjectListView
} from "./../actions/toggleVisibilityOfSubjectListView";
import {
    GenereteReducer
} from "./GenerateReducer";
export interface ITimetableCreatorState {
    IsSubjectListViewVisible: boolean;
}

export class TimetableCreatorState implements ITimetableCreatorState {
    public IsSubjectListViewVisible: boolean;
    public constructor() {
        this.IsSubjectListViewVisible = true;
    }
}

const typesOfAcceptedActions = [new ToggleVisibilityOfSubjectListView().TypeName()];
export const TimetableCreatorReducer = GenereteReducer(new TimetableCreatorState(), typesOfAcceptedActions);

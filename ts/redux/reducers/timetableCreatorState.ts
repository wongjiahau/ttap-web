import * as typeName from "type-name";
import {ActionGenerator} from "../actions/actionGenerator";
import {ToggleVisibilityOfSubjectListView} from "./../actions/toggleVisibilityOfSubjectListView";
import {GenereteReducer} from "./generateReducer";
export interface ITimetableCreatorState {
    IsSubjectListViewVisible : boolean;
}

export class TimetableCreatorState implements ITimetableCreatorState {
    public IsSubjectListViewVisible : boolean;
    public constructor() {
        this.IsSubjectListViewVisible = true;
    }
}

export const TimetableCreatorReducer = GenereteReducer(new TimetableCreatorState());

export abstract class TimetableCreatorStateActionGenerator extends ActionGenerator < ITimetableCreatorState > {
    public StateName() {
        return typeName(new TimetableCreatorState());
    }
}

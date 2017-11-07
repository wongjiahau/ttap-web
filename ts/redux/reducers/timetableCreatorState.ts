import * as typeName from "type-name";
import {Action} from "../actions/action";
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

export abstract class TimetableCreatorStateAction extends Action < ITimetableCreatorState > {
    public StateName() {
        return typeName(new TimetableCreatorState());
    }
}

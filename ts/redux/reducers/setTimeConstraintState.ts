
import * as typeName from "type-name";
import {Action} from "../actions/action";
import {GenereteReducer} from "./generateReducer";

export interface ISetTimeConstraintState {
    // properties...
}

export class SetTimeConstraintState implements ISetTimeConstraintState {
    public constructor() {
        // initialization
    }
}

export abstract class SetTimeConstraintStateAction extends Action < ISetTimeConstraintState > {
    public StateName() {
        return typeName(new SetTimeConstraintState());
    }
}

export const SetTimeConstraintStateReducer = GenereteReducer(new SetTimeConstraintState());

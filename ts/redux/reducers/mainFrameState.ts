import * as typeName from "type-name";
import {ActionGenerator} from "../actions/actionGenerator";
import {GenereteReducer} from "./generateReducer";
export interface IMainFrameState {
    IsDataLoaded : boolean;
}

export class MainFrameState implements IMainFrameState {
    public IsDataLoaded : boolean;
    public constructor() {
        this.IsDataLoaded = false;
    }
}

export const MainFrameStateReducer = GenereteReducer(new MainFrameState());

export abstract class MainFrameStateActionGenerator extends ActionGenerator < IMainFrameState > {
    public StateName() {
        return typeName(new MainFrameState());
    }
}

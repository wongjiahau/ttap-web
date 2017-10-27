import * as typeName from "type-name";
import {ActionGenerator} from "../actions/actionGenerator";
import { RawSlot } from "./../../model/rawSlot";
import {GenereteReducer} from "./generateReducer";
export interface IMainFrameState {
    IsDataLoaded : boolean;
    RawSlots: RawSlot[];
}

export class MainFrameState implements IMainFrameState {
    public IsDataLoaded : boolean;
    public RawSlots: RawSlot[];
    public constructor() {
        this.IsDataLoaded = false;
        this.RawSlots = undefined;
    }
}

export const MainFrameStateReducer = GenereteReducer(new MainFrameState());

export abstract class MainFrameStateActionGenerator extends ActionGenerator < IMainFrameState > {
    public StateName() {
        return typeName(new MainFrameState());
    }
}

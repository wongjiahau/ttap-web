import * as typeName from "type-name";
import {Action} from "../actions/action";
import { RawSlot } from "./../../model/rawSlot";
import {GenereteReducer} from "./generateReducer";
export interface IMainFrameState {
    IsSlotLoaded : boolean;
    RawSlots: RawSlot[];
}

export class MainFrameState implements IMainFrameState {
    public IsSlotLoaded : boolean;
    public RawSlots: RawSlot[];
    public constructor() {
        this.IsSlotLoaded = false;
        this.RawSlots = undefined;
    }
}

export const MainFrameReducer = GenereteReducer(new MainFrameState());

export abstract class MainFrameStateAction extends Action < IMainFrameState > {
    public StateName() {
        return typeName(new MainFrameState());
    }
}

import { isEqual } from "lodash";
import { RawSlot } from "../../model/rawSlot";
import { MainFrameStateAction } from "../reducers/mainFrameState";
import { IMainFrameState } from "./../reducers/mainFrameState";

export class NotifyDataLoaded extends MainFrameStateAction {
    public constructor(private rawSlots: RawSlot[]) {
        super();
    }
    public TypeName(): string {
        return "notify data loaded";
    }
    protected GenerateNewState(state: IMainFrameState): IMainFrameState {
        return {
            ...state,
            IsSlotLoaded: true,
            RawSlots: this.rawSlots
        };
    }
}
